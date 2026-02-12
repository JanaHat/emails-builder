import { Button } from "../../components/Button.js";

export const generateEmail = ({ userName, hasDiscount, discountCode }) => `
<mjml>
    <mj-head>
        <mj-preview>Exclusive Offer Just for You!</mj-preview>
        <mj-style inline="inline">
        .dark-mode { background-color: #333 !important; color: white !important; }
        </mj-style>
    </mj-head>
    <mj-body>
        <mj-section ${hasDiscount ? 'css-class="dark-mode"' : ""}>
            <mj-column>
                <mj-text>Hello ${userName},</mj-text>
                <mj-text>We have a special offer for you!</mj-text>

                ${
                hasDiscount
                    ? `<mj-text>Your discount code: <strong>${discountCode}</strong></mj-text>`
                    : `<mj-text>No special discounts right now, but stay tuned!</mj-text>`
                }

                ${Button({ href: "https://yourwebsite.com", text: "Claim Offer" })}
            </mj-column>
        </mj-section>
    </mj-body>
</mjml>
`;
