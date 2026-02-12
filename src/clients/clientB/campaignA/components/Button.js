export const Button = ({ href, text, backgroundColor = "#007BFF" }) => `
    <mj-button href="${href}" background-color="${backgroundColor}" padding="10px 25px">
        ${text}
    </mj-button>
`;
