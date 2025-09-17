document.addEventListener('DOMContentLoaded', async () => {
    const studiesList = document.getElementById('study-list');

    async function loadStudies() {
        try {
            const res = await fetch('/output/clientA'); // ✅ Fixed missing `/`
            if (!res.ok) throw new Error('Failed to fetch studies');

            const studies = await res.json();
            console.log('Studies:', studies);

            studiesList.innerHTML = studies.map((study) => `
                <li>
                    <button class="side-panel-studies-btns" onclick="loadVariations('${study}')"><img src="./assets/folder.png"/> ${study} </button>
                    <ul id="study-list-${study}"></ul> <!-- ✅ Variations go inside this -->
                </li>
            `).join('');
        } catch (error) {
            console.error('Error loading studies:', error);
        }
    }

    loadStudies();
});

async function loadVariations(study) {
    const variationsList = document.getElementById(`study-list-${study}`); // ✅ Target correct UL
    try {
        const res = await fetch(`/output/clientA/${study}`);
        if (!res.ok) throw new Error('Failed to fetch variations');

        const variations = await res.json();
        console.log(`Variations for ${study}:`, variations);

        variationsList.innerHTML = variations.map(variation => `
            <li>
                <button class="side-panel-variations-btns" onclick="loadEmails('${study}', '${variation}')"><img src="./assets/folder-small.png"/> ${variation} </button>
                <ul id="email-list-${study}-${variation}"></ul> <!-- ✅ Unique ID -->
            </li>
        `).join('');
    } catch (error) {
        console.error('Error loading variations:', error);
    }
}

async function loadEmails(study, variation) {
    const emailsList = document.getElementById(`email-list-${study}-${variation}`);

    try {
        const res = await fetch(`/output/clientA/${study}/${variation}`);
        if (!res.ok) throw new Error('Failed to fetch emails');

        const emails = await res.json();

        emailsList.innerHTML = emails.map(email => `
            <li class="email-list-item">
                <button class="side-panel-emails-btns" onclick="viewSpecificEmail('${study}', '${variation}', '${email}')">
                    <img src="./assets/html.png"/> ${email}
                </button>
                <input type="checkbox" class="email-checkbox" value="${email}">
            </li>
        `).join('');

    } catch (error) {
        console.error('Error loading emails:', error);
    }
}

function viewSpecificEmail(study, variation, email) {
    // ✅ Update the email title
    const emailTitle = document.querySelector('.email-title');
    if (emailTitle) {
        emailTitle.innerHTML = `<h2>${variation} - ${email}</h2>`;
    }

    const allEmailButtons = document.querySelectorAll('.side-panel-emails-btns');

    // Remove active class from all buttons
    allEmailButtons.forEach(button => button.classList.remove('active-email'));

    // Add active class to the clicked button
    event.target.classList.add('active-email');
    // ✅ Set the iframe source
    const emailPreview = document.getElementById('email-preview');
    emailPreview.innerHTML = `
        <iframe id="email-iframe" src="/output/clientA/${study}/${variation}/${email}" 
            style="width: 100%; border: 1px solid #D6E1EB; overflow: hidden;"></iframe>
    `;

    // ✅ Wait for the iframe to load and adjust its height
    const iframe = document.getElementById('email-iframe');
    iframe.onload = () => {
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        
        if (iframeDocument) {
            setTimeout(() => {
                // ✅ Get the email content height
                const emailHeight = iframeDocument.documentElement.scrollHeight;
                console.log('emailheight', emailHeight)
                
                // ✅ Apply height to iframe
                iframe.style.height = emailHeight + 'px';
            }, 100); // Delay to ensure rendering
        }
    };
}


document.addEventListener('DOMContentLoaded', () => {
    const emailWrapper = document.querySelector('.email-wrapper');
    const mobileButtonXs = document.getElementById('screen-mobile-xs');
    const mobileButtonS = document.getElementById('screen-mobile-s');
    const mobileButtonM = document.getElementById('screen-mobile-m');
    const desktopButton = document.getElementById('screen-desktop');

    mobileButtonXs.addEventListener('click', () => {
        emailWrapper.style.width = '275px'; // Common mobile width
        emailWrapper.style.height = 'auto'; // Approximate mobile height
        emailWrapper.style.overflow = 'hidden'; // Prevent scrollbars if needed
    });

    mobileButtonS.addEventListener('click', () => {
        emailWrapper.style.width = '325px'; // Common mobile width
        emailWrapper.style.height = 'auto'; // Approximate mobile height
        emailWrapper.style.overflow = 'hidden'; // Prevent scrollbars if needed
    });

    mobileButtonM.addEventListener('click', () => {
        emailWrapper.style.width = '375px'; // Common mobile width
        emailWrapper.style.height = 'auto'; // Approximate mobile height
        emailWrapper.style.overflow = 'hidden'; // Prevent scrollbars if needed
    });

    desktopButton.addEventListener('click', () => {
        emailWrapper.style.width = '600px'; // Reset to full width
        emailWrapper.style.height = 'auto'; // Reset height
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const screenButtons = document.querySelectorAll('.screen-view-btn');

    screenButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all screen buttons
            screenButtons.forEach(btn => btn.classList.remove('active-screen'));

            // Add active class to the clicked button
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
            continue;  // Skip to the next email if no button is found
        }
        const onClickAttr = emailButton.getAttribute('onclick');
        const match = onClickAttr.match(/'([^']+)',\s*'([^']+)',\s*'([^']+)'/);

        if (!match) continue;

        const study = match[1];
        const variation = match[2];

        // ✅ 1. Fetch the email HTML content
        const response = await fetch(`/output/clientA/${study}/${variation}/${emailName}`);
        if (!response.ok) {
            console.error(`Failed to load email: ${emailName}`);
            continue;
        }
        const emailHTML = await response.text();

        // ✅ 2. Create a hidden div to render the email
        const hiddenContainer = document.createElement('div');
        hiddenContainer.style.position = 'absolute';
        hiddenContainer.style.left = '-9999px';
        hiddenContainer.style.width = '600px'; // Same as email preview width
        hiddenContainer.innerHTML = emailHTML;
        document.body.appendChild(hiddenContainer);

        // ✅ 3. Capture the email as an image
        const canvas = await html2canvas(hiddenContainer, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');

        document.body.removeChild(hiddenContainer); // ✅ Clean up

        // ✅ 4. Add image to the PDF
        const imgWidth = 190;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
        pdf.addPage();
    }

    pdf.deletePage(pdf.internal.pages.length); // Remove last empty page
    pdf.save('selected-emails.pdf'); // ✅ Save PDF
});

document.getElementById('export-png').addEventListener('click', async () => {
    const selectedEmails = document.querySelectorAll('.email-checkbox:checked');
    if (selectedEmails.length === 0) {
        alert('Please select at least one email to export.');
        return;
    }

    for (const checkbox of selectedEmails) {
        const emailName = checkbox.value;

        // ✅ Find the closest <li> and get the associated button
        const emailButton = checkbox.closest('.email-list-item')?.querySelector('.side-panel-emails-btns');
        if (!emailButton) {
            console.error(`No button found for email: ${emailName}`);
            continue;  
        }

        // ✅ Extract study & variation from the button's onclick attribute
        const onClickAttr = emailButton.getAttribute('onclick');
        const match = onClickAttr.match(/'([^']+)',\s*'([^']+)',\s*'([^']+)'/);
        if (!match) continue;

        const study = match[1];
        const variation = match[2];

        // ✅ Fetch the email HTML content
        const response = await fetch(`/output/clientA/${study}/${variation}/${emailName}`);
        if (!response.ok) {
            console.error(`Failed to load email: ${emailName}`);
            continue;
        }
        const emailHTML = await response.text();

        // ✅ Create a hidden div to render the email
        const hiddenContainer = document.createElement('div');
        hiddenContainer.style.position = 'absolute';
        hiddenContainer.style.left = '-9999px';
        hiddenContainer.style.width = '600px'; // Same width as preview
        hiddenContainer.innerHTML = emailHTML;
        document.body.appendChild(hiddenContainer);

        // ✅ Convert the email to a PNG using html2canvas
        const canvas = await html2canvas(hiddenContainer, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');

        document.body.removeChild(hiddenContainer); // ✅ Clean up

        // ✅ Trigger PNG download
        const link = document.createElement('a');
        link.href = imgData;
        link.download = `${emailName.replace('.html', '')}.png`;
        link.click();
    }

    alert('Selected emails exported as PNG!');
});






