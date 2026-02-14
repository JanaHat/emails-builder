let currentClient = null;

const externalScriptCache = new Map();

function loadExternalScript(url, globalName) {
    if (globalName && window[globalName]) return Promise.resolve(window[globalName]);
    if (externalScriptCache.has(url)) return externalScriptCache.get(url);

    const promise = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.async = true;
        script.onload = () => resolve(globalName ? window[globalName] : true);
        script.onerror = () => reject(new Error(`Failed to load ${url}`));
        document.head.appendChild(script);
    });

    externalScriptCache.set(url, promise);
    return promise;
}

async function ensureExportDeps() {
    await loadExternalScript('/vendor/html2canvas/html2canvas.min.js', 'html2canvas');
    await loadExternalScript('/vendor/jspdf/jspdf.umd.min.js', 'jspdf');
    await loadExternalScript('/vendor/jszip/jszip.min.js', 'JSZip');

    const jsPDF = window.jspdf?.jsPDF;
    const html2canvas = window.html2canvas;
    const JSZip = window.JSZip;

    if (!jsPDF || !html2canvas || !JSZip) {
        throw new Error('Export libraries failed to load');
    }

    return { jsPDF, html2canvas, JSZip };
}

function updateIframeHeight(iframe) {
    if (!iframe) return;

    const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
    if (!iframeDocument) return;

    const emailHeight = Math.max(
        iframeDocument.body?.scrollHeight || 0,
        iframeDocument.documentElement?.scrollHeight || 0
    );
    if (emailHeight > 0) {
        iframe.style.height = emailHeight + 'px';
    }
}

function syncIframeHeight(iframe) {
    if (!iframe) return;

    const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
    if (!iframeDocument) return;

    updateIframeHeight(iframe);

    const images = Array.from(iframeDocument.images || []);
    images.forEach((img) => {
        if (!img.complete) {
            img.addEventListener('load', () => updateIframeHeight(iframe), { once: true });
            img.addEventListener('error', () => updateIframeHeight(iframe), { once: true });
        }
    });

    const start = performance.now();
    const tick = () => {
        updateIframeHeight(iframe);
        if (performance.now() - start < 1000) {
            requestAnimationFrame(tick);
        }
    };
    requestAnimationFrame(tick);
}

function setPreviewLoading(isLoading) {
    const preview = document.getElementById('email-preview');
    if (!preview) return;
    preview.classList.toggle('loading', isLoading);
}

function getSelectedExportWidth() {
    const activeButton = document.querySelector('.screen-view-btn.active-screen');
    if (activeButton) {
        const text = activeButton.textContent || '';
        const match = text.match(/\d+/);
        if (match) {
            return parseInt(match[0], 10);
        }
    }

    const emailWrapper = document.querySelector('.email-wrapper');
    if (emailWrapper) {
        const width = parseInt(emailWrapper.style.width, 10);
        if (!Number.isNaN(width) && width > 0) {
            return width;
        }
    }

    return 600;
}

function applyClientTheme(client) {
    if (!client) return;
    document.body.dataset.client = client;
}

document.addEventListener('DOMContentLoaded', async () => {
    const campaignsList = document.getElementById('campaign-list');
    const clientSelect = document.getElementById('client-select');
    const clientTitle = document.getElementById('client-title');

    async function loadClients() {
        try {
            const res = await fetch('/clients');
            if (!res.ok) throw new Error('Failed to fetch clients');

            const clients = await res.json();
            clientSelect.innerHTML = clients.map(client => `
                <option value="${client.key}">${client.name || client.key}</option>
            `).join('');

            const singleClient = clients.length <= 1;
            const clientLabel = document.querySelector('label[for="client-select"]');
            clientSelect.disabled = singleClient;
            clientSelect.setAttribute('aria-disabled', singleClient ? 'true' : 'false');
            clientSelect.style.display = singleClient ? 'none' : '';
            if (clientLabel) {
                clientLabel.style.display = singleClient ? 'none' : '';
            }

            currentClient = clientSelect.value || clients[0]?.key || null;
            if (currentClient) {
                const selectedClient = clients.find((client) => client.key === currentClient);
                clientTitle.textContent = selectedClient?.name || currentClient;
                applyClientTheme(currentClient);
                await loadcampaigns();
            } else {
                campaignsList.innerHTML = '';
            }
        } catch (error) {
            console.error('Error loading clients:', error);
        }
    }

    async function loadcampaigns() {
        if (!currentClient) return;
        try {
            const res = await fetch(`/output/${currentClient}`);
            if (!res.ok) throw new Error('Failed to fetch campaigns');

            const campaigns = await res.json();
            console.log('campaigns:', campaigns);

            if (!Array.isArray(campaigns) || campaigns.length === 0) {
                campaignsList.innerHTML = '<li>No campaigns found</li>';
                return;
            }

            campaignsList.innerHTML = campaigns.map((campaign) => `
                <li>
                    <button class="side-panel-campaigns-btns" data-campaign="${campaign.key}"><img src="/assets/folder.png" alt="Campaign folder"/> ${campaign.name || campaign.key} </button>
                    <ul id="campaign-list-${campaign.key}"></ul>
                </li>
            `).join('');
        } catch (error) {
            console.error('Error loading campaigns:', error);
        }
    }

    clientSelect.addEventListener('change', async () => {
        currentClient = clientSelect.value;
        const selectedOption = clientSelect.options[clientSelect.selectedIndex];
        clientTitle.textContent = selectedOption?.textContent || currentClient;
        applyClientTheme(currentClient);
        campaignsList.innerHTML = '';
        await loadcampaigns();
    });

    campaignsList.addEventListener('click', async (event) => {
        const campaignButton = event.target.closest('.side-panel-campaigns-btns');
        if (campaignButton) {
            const campaign = campaignButton.dataset.campaign;
            if (campaign) {
                await loadVariations(campaign);
            }
            return;
        }

        const languageButton = event.target.closest('.side-panel-variations-btns');
        if (languageButton) {
            const { campaign, language } = languageButton.dataset;
            if (campaign && language) {
                await loadEmails(campaign, language);
            }
            return;
        }

        const emailButton = event.target.closest('.side-panel-emails-btns');
        if (emailButton) {
            const { campaign, language, email } = emailButton.dataset;
            if (campaign && language && email) {
                viewSpecificEmail(campaign, language, email, emailButton);
            }
        }
    });

    loadClients();
});

async function loadVariations(campaign) {
    const variationsList = document.getElementById(`campaign-list-${campaign}`);
    try {
        const res = await fetch(`/output/${currentClient}/${campaign}`);
        if (!res.ok) throw new Error('Failed to fetch languages');

        const languages = await res.json();
        console.log(`Languages for ${campaign}:`, languages);

        variationsList.innerHTML = languages.map(language => `
            <li>
                <button class="side-panel-variations-btns" data-campaign="${campaign}" data-language="${language}"><img src="/assets/folder-small.png" alt="Language folder"/> ${language} </button>
                <ul id="email-list-${campaign}-${language}"></ul>
            </li>
        `).join('');
    } catch (error) {
        console.error('Error loading languages:', error);
    }
}

async function loadEmails(campaign, language) {
    const emailsList = document.getElementById(`email-list-${campaign}-${language}`);

    try {
        const res = await fetch(`/output/${currentClient}/${campaign}/${language}`);
        if (!res.ok) throw new Error('Failed to fetch emails');

        const emails = await res.json();

        emailsList.innerHTML = emails.map(email => `
            <li class="email-list-item">
                <button class="side-panel-emails-btns" data-campaign="${campaign}" data-language="${language}" data-email="${email}">
                    <img src="/assets/html.png" alt="Email HTML"/> ${email}
                </button>
                <input type="checkbox" class="email-checkbox" value="${email}" title="Select for export" aria-label="Select for export">
            </li>
        `).join('');

    } catch (error) {
        console.error('Error loading emails:', error);
    }
}

function viewSpecificEmail(campaign, language, email, emailButton) {
    const emailTitle = document.querySelector('.email-title');
    if (emailTitle) {
        emailTitle.innerHTML = `<h2>${language} - ${email}</h2>`;
    }

    const allEmailButtons = document.querySelectorAll('.side-panel-emails-btns');
    allEmailButtons.forEach(button => button.classList.remove('active-email'));

    if (emailButton) {
        emailButton.classList.add('active-email');
    }
    const emailPreview = document.getElementById('email-preview');
    setPreviewLoading(true);
    emailPreview.innerHTML = `
        <iframe id="email-iframe" src="/output/${currentClient}/${campaign}/${language}/${email}"
            scrolling="no"
            style="width: 100%; display: block;"></iframe>
    `;

    const iframe = document.getElementById('email-iframe');
    iframe.onload = () => {
        setTimeout(() => {
            syncIframeHeight(iframe);
            setPreviewLoading(false);
        }, 50);
    };
}


document.addEventListener('DOMContentLoaded', () => {
    const emailWrapper = document.querySelector('.email-wrapper');
    const mobileButtonXs = document.getElementById('screen-mobile-xs');
    const mobileButtonS = document.getElementById('screen-mobile-s');
    const mobileButtonM = document.getElementById('screen-mobile-m');
    const desktopButton = document.getElementById('screen-desktop');

    mobileButtonXs.addEventListener('click', () => {
        emailWrapper.style.width = '275px';
        emailWrapper.style.height = 'auto';
        emailWrapper.style.overflow = 'hidden';
        setTimeout(() => syncIframeHeight(document.getElementById('email-iframe')), 50);
    });

    mobileButtonS.addEventListener('click', () => {
        emailWrapper.style.width = '325px';
        emailWrapper.style.height = 'auto';
        emailWrapper.style.overflow = 'hidden';
        setTimeout(() => syncIframeHeight(document.getElementById('email-iframe')), 50);
    });

    mobileButtonM.addEventListener('click', () => {
        emailWrapper.style.width = '375px';
        emailWrapper.style.height = 'auto';
        emailWrapper.style.overflow = 'hidden';
        setTimeout(() => syncIframeHeight(document.getElementById('email-iframe')), 50);
    });

    desktopButton.addEventListener('click', () => {
        emailWrapper.style.width = '600px';
        emailWrapper.style.height = 'auto';
        setTimeout(() => syncIframeHeight(document.getElementById('email-iframe')), 50);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const screenButtons = document.querySelectorAll('.screen-view-btn');

    screenButtons.forEach(button => {
        button.addEventListener('click', () => {
            screenButtons.forEach(btn => btn.classList.remove('active-screen'));
            button.classList.add('active-screen');
        });
    });
});

const exportPdfButton = document.getElementById('export-pdf');
if (exportPdfButton) exportPdfButton.addEventListener('click', async () => {
    const selectedEmails = document.querySelectorAll('.email-checkbox:checked');
    if (selectedEmails.length === 0) {
        alert('Please select at least one email to export.');
        return;
    }

    const { jsPDF, html2canvas } = await ensureExportDeps();
    const pdf = new jsPDF();

    for (const checkbox of selectedEmails) {
        const emailName = checkbox.value;
        const emailButton = checkbox.closest('.email-list-item')?.querySelector('.side-panel-emails-btns');

        if (!emailButton) {
            console.error(`No button found for email: ${emailName}`);
            continue;
        }
        const campaign = emailButton.dataset.campaign;
        const language = emailButton.dataset.language;
        if (!campaign || !language) continue;

        const response = await fetch(`/output/${currentClient}/${campaign}/${language}/${emailName}`);
        if (!response.ok) {
            console.error(`Failed to load email: ${emailName}`);
            continue;
        }
        const emailHTML = await response.text();

        const hiddenContainer = document.createElement('div');
        hiddenContainer.style.position = 'absolute';
        hiddenContainer.style.left = '-9999px';
        const selectedWidth = getSelectedExportWidth();
        hiddenContainer.style.width = `${selectedWidth}px`;
        hiddenContainer.innerHTML = emailHTML;
        document.body.appendChild(hiddenContainer);

        const canvas = await html2canvas(hiddenContainer, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');

        document.body.removeChild(hiddenContainer);

        const baseWidth = 600;
        const maxPdfWidth = 190;
        const imgWidth = Math.min(maxPdfWidth, (selectedWidth / baseWidth) * maxPdfWidth);
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const margin = 10;
        const pageHeight = pdf.internal.pageSize.getHeight() - margin * 2;

        let remainingHeight = imgHeight;
        let position = margin;

        while (remainingHeight > 0) {
            pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
            remainingHeight -= pageHeight;
            if (remainingHeight > 0) {
                pdf.addPage();
                position = margin - (imgHeight - remainingHeight);
            }
        }
        pdf.addPage();
    }

    pdf.deletePage(pdf.internal.pages.length);
    pdf.save('selected-emails.pdf');
});

const exportPngButton = document.getElementById('export-png');
if (exportPngButton) exportPngButton.addEventListener('click', async () => {
    const selectedEmails = document.querySelectorAll('.email-checkbox:checked');
    if (selectedEmails.length === 0) {
        alert('Please select at least one email to export.');
        return;
    }

    const { html2canvas, JSZip } = await ensureExportDeps();
    const zip = new JSZip();

    for (const checkbox of selectedEmails) {
        const emailName = checkbox.value;

        const emailButton = checkbox.closest('.email-list-item')?.querySelector('.side-panel-emails-btns');
        if (!emailButton) {
            console.error(`No button found for email: ${emailName}`);
            continue;  
        }

        const campaign = emailButton.dataset.campaign;
        const language = emailButton.dataset.language;
        if (!campaign || !language) continue;

        const response = await fetch(`/output/${currentClient}/${campaign}/${language}/${emailName}`);
        if (!response.ok) {
            console.error(`Failed to load email: ${emailName}`);
            continue;
        }
        const emailHTML = await response.text();

        const hiddenContainer = document.createElement('div');
        hiddenContainer.style.position = 'absolute';
        hiddenContainer.style.left = '-9999px';
        hiddenContainer.style.width = `${getSelectedExportWidth()}px`;
        hiddenContainer.innerHTML = emailHTML;
        document.body.appendChild(hiddenContainer);

        const canvas = await html2canvas(hiddenContainer, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');

        document.body.removeChild(hiddenContainer);

        const base64Data = imgData.split(',')[1] || '';
        const safeEmail = emailName.replace('.html', '');
        const fileName = `${campaign}-${language}-${safeEmail}.png`;
        zip.file(fileName, base64Data, { base64: true });
    }

    const zipBlob = await zip.generateAsync({ type: 'blob' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(zipBlob);
    link.download = 'selected-emails.zip';
    link.click();
    URL.revokeObjectURL(link.href);

    alert('Selected emails exported as PNG!');
});
