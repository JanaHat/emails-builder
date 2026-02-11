let currentClient = null;

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

function applyClientTheme(client) {
    const isClientB = client === 'clientB';
    document.body.classList.toggle('theme-clientB', isClientB);
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
                <option value="${client}">${client}</option>
            `).join('');

            currentClient = clientSelect.value || clients[0] || null;
            if (currentClient) {
                clientTitle.textContent = currentClient;
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
                    <button class="side-panel-campaigns-btns" data-campaign="${campaign}"><img src="/assets/folder.png"/> ${campaign} </button>
                    <ul id="campaign-list-${campaign}"></ul>
                </li>
            `).join('');
        } catch (error) {
            console.error('Error loading campaigns:', error);
        }
    }

    clientSelect.addEventListener('change', async () => {
        currentClient = clientSelect.value;
        clientTitle.textContent = currentClient;
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

        const variationButton = event.target.closest('.side-panel-variations-btns');
        if (variationButton) {
            const { campaign, variation } = variationButton.dataset;
            if (campaign && variation) {
                await loadEmails(campaign, variation);
            }
            return;
        }

        const emailButton = event.target.closest('.side-panel-emails-btns');
        if (emailButton) {
            const { campaign, variation, email } = emailButton.dataset;
            if (campaign && variation && email) {
                viewSpecificEmail(campaign, variation, email, emailButton);
            }
        }
    });

    loadClients();
});

async function loadVariations(campaign) {
    const variationsList = document.getElementById(`campaign-list-${campaign}`);
    try {
        const res = await fetch(`/output/${currentClient}/${campaign}`);
        if (!res.ok) throw new Error('Failed to fetch variations');

        const variations = await res.json();
        console.log(`Variations for ${campaign}:`, variations);

        variationsList.innerHTML = variations.map(variation => `
            <li>
                <button class="side-panel-variations-btns" data-campaign="${campaign}" data-variation="${variation}"><img src="/assets/folder-small.png"/> ${variation} </button>
                <ul id="email-list-${campaign}-${variation}"></ul>
            </li>
        `).join('');
    } catch (error) {
        console.error('Error loading variations:', error);
    }
}

async function loadEmails(campaign, variation) {
    const emailsList = document.getElementById(`email-list-${campaign}-${variation}`);

    try {
        const res = await fetch(`/output/${currentClient}/${campaign}/${variation}`);
        if (!res.ok) throw new Error('Failed to fetch emails');

        const emails = await res.json();

        emailsList.innerHTML = emails.map(email => `
            <li class="email-list-item">
                <button class="side-panel-emails-btns" data-campaign="${campaign}" data-variation="${variation}" data-email="${email}">
                    <img src="/assets/html.png"/> ${email}
                </button>
                <input type="checkbox" class="email-checkbox" value="${email}">
            </li>
        `).join('');

    } catch (error) {
        console.error('Error loading emails:', error);
    }
}

function viewSpecificEmail(campaign, variation, email, emailButton) {
    const emailTitle = document.querySelector('.email-title');
    if (emailTitle) {
        emailTitle.innerHTML = `<h2>${variation} - ${email}</h2>`;
    }

    const allEmailButtons = document.querySelectorAll('.side-panel-emails-btns');
    allEmailButtons.forEach(button => button.classList.remove('active-email'));

    if (emailButton) {
        emailButton.classList.add('active-email');
    }
    const emailPreview = document.getElementById('email-preview');
    setPreviewLoading(true);
    emailPreview.innerHTML = `
        <iframe id="email-iframe" src="/output/${currentClient}/${campaign}/${variation}/${email}"
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

document.getElementById('export-pdf').addEventListener('click', async () => {
    const selectedEmails = document.querySelectorAll('.email-checkbox:checked');
    if (selectedEmails.length === 0) {
        alert('Please select at least one email to export.');
        return;
    }

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    for (const checkbox of selectedEmails) {
        const emailName = checkbox.value;
        const emailButton = checkbox.closest('.email-list-item')?.querySelector('.side-panel-emails-btns');

        if (!emailButton) {
            console.error(`No button found for email: ${emailName}`);
            continue;
        }
        const campaign = emailButton.dataset.campaign;
        const variation = emailButton.dataset.variation;
        if (!campaign || !variation) continue;

        const response = await fetch(`/output/${currentClient}/${campaign}/${variation}/${emailName}`);
        if (!response.ok) {
            console.error(`Failed to load email: ${emailName}`);
            continue;
        }
        const emailHTML = await response.text();

        const hiddenContainer = document.createElement('div');
        hiddenContainer.style.position = 'absolute';
        hiddenContainer.style.left = '-9999px';
        hiddenContainer.style.width = '600px';
        hiddenContainer.innerHTML = emailHTML;
        document.body.appendChild(hiddenContainer);

        const canvas = await html2canvas(hiddenContainer, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');

        document.body.removeChild(hiddenContainer);

        const imgWidth = 190;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
        pdf.addPage();
    }

    pdf.deletePage(pdf.internal.pages.length);
    pdf.save('selected-emails.pdf');
});

document.getElementById('export-png').addEventListener('click', async () => {
    const selectedEmails = document.querySelectorAll('.email-checkbox:checked');
    if (selectedEmails.length === 0) {
        alert('Please select at least one email to export.');
        return;
    }

    for (const checkbox of selectedEmails) {
        const emailName = checkbox.value;

        const emailButton = checkbox.closest('.email-list-item')?.querySelector('.side-panel-emails-btns');
        if (!emailButton) {
            console.error(`No button found for email: ${emailName}`);
            continue;  
        }

        const campaign = emailButton.dataset.campaign;
        const variation = emailButton.dataset.variation;
        if (!campaign || !variation) continue;

        const response = await fetch(`/output/${currentClient}/${campaign}/${variation}/${emailName}`);
        if (!response.ok) {
            console.error(`Failed to load email: ${emailName}`);
            continue;
        }
        const emailHTML = await response.text();

        const hiddenContainer = document.createElement('div');
        hiddenContainer.style.position = 'absolute';
        hiddenContainer.style.left = '-9999px';
        hiddenContainer.style.width = '600px';
        hiddenContainer.innerHTML = emailHTML;
        document.body.appendChild(hiddenContainer);

        const canvas = await html2canvas(hiddenContainer, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');

        document.body.removeChild(hiddenContainer);

        const link = document.createElement('a');
        link.href = imgData;
        link.download = `${emailName.replace('.html', '')}.png`;
        link.click();
    }

    alert('Selected emails exported as PNG!');
});
