export const generateEmail = ({
    subject,
    greeting,
    paragraph1,
    paragraph2,
    paragraph3,
    cta,
    backgroundColor 
}) => {
    // Helper function to escape HTML content
    const escapeHtml = (text) => {
        if (!text) return '';
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/"/g, '&quot;')
            .replace(/"/g, '&quot;');
    };

    return `
<mjml>
    <mj-head>
        <mj-preview>${escapeHtml(subject)}</mj-preview>
    </mj-head>
    <mj-body>
        <mj-section background-color="${backgroundColor}">
            <mj-column>
                <mj-image src="/assets/plant.webp" alt="Header Image" width="600px" />
            </mj-column>
        </mj-section>
        <mj-section background-color="${backgroundColor}" padding="20px 25px">
            <mj-column>
                ${greeting ? `<mj-text font-size="20px" color="#333333">${escapeHtml(greeting)}</mj-text>` : ''}
                ${paragraph1 ? `<mj-text font-size="16px" color="#666666">${escapeHtml(paragraph1)}</mj-text>` : ''}
                ${paragraph2 ? `<mj-text font-size="16px" color="#666666">${escapeHtml(paragraph2)}</mj-text>` : ''}
                ${paragraph3 ? `<mj-text font-size="16px" color="#666666">${escapeHtml(paragraph3)}</mj-text>` : ''}
                ${cta ? `
                <mj-button href="#" background-color="#28A745" align="left">
                    ${escapeHtml(cta)}
                </mj-button>
                ` : ''}
            </mj-column>
        </mj-section>
    </mj-body>
</mjml>
`;
};
