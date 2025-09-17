
// document.addEventListener('DOMContentLoaded', async () => {
//     const clientList = document.getElementById('client-list');

//     async function loadClients() {
//         const res = await fetch('/clients');
//         const clients = await res.json();
//         clientList.innerHTML = clients.map(client => 
//             `
//                 <li>
//                     <button class="side-panel-client-btns" onclick="loadEmails()"> ${client} </button>
//                     <ul id="variation-list"></ul>
//                 </li>
//             `
//         ).join('');
//     }

//     loadClients();
// });


document.addEventListener('DOMContentLoaded', async () => {
    const variationsList = document.getElementById('variation-list');
    async function loadEmails() {

        try {
            const res = await fetch('/output/clientB/study');
            if (!res.ok) throw new Error('Failed to fetch variations');
    
            console.log('response variations', res)
            const variations = await res.json();
            console.log('variations:', variations);
    
            variationsList.innerHTML = variations.map(email => `
                <li>
                    <button class="side-panel-variations-btns" onclick="viewEmails('${email}')"> ${email} </button>
                    <ul id="email-list"></ul>
                </li>
                `
            ).join('');
        } catch (error) {
            console.error('Error loading emails:', error);
        }
    }

    loadEmails()
})



async function viewEmails() {
    const emailsList = document.getElementById('email-list');

    try {
        const res = await fetch('/output/clientB/study/email1');
        if (!res.ok) throw new Error('Failed to fetch emails');

        const emails = await res.json(); // List of .html files
        console.log('emails:', emails);

        emailsList.innerHTML = emails.map(email =>
            `<li><button class="side-panel-emails-btns" onclick="viewSpecificEmail('${email}')">${email}</button></li>`
        ).join('');

    } catch (error) {
        console.error('Error loading emails:', error);
    }
}

function viewSpecificEmail(emailFile) {
    const emailPreview = document.getElementById('email-preview');

    emailPreview.innerHTML = `
        <iframe src="/output/clientB/study/email1/${emailFile}" 
            style="width: 100%; height: 600px; border: none;"></iframe>
    `;
}




