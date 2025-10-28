import { Button } from "../../components/Button.js";

export const generateEmail = ({ userName, hasDiscount, discountCode }) => `
<mjml>
    <mj-head>
        <mj-preview>Exclusive Offer Just for You!</mj-preview>
        <mj-style inline="inline">
        .dark-mode { background-color: #333 !important; color: white !important; }
        </mj-style>
        <mj-attributes>
            <mj-body background-color="#AFD2E9"></mj-body>
        </mj-attributes>
    </mj-head>
    <mj-body>
        <mj-section ${hasDiscount ? 'class="dark-mode"' : ""} background-color="#AFD2E9" style="min-height: 400px;">
            <mj-column>
                <mj-text font-size="20px" color="white">Hello ${userName},</mj-text>
                <mj-text font-size="16px" color="white">We have a special offer for you!</mj-text>

                ${
                hasDiscount
                    ? `<mj-text font-size="16px" color="white">Your discount code: <strong>${discountCode}</strong></mj-text>`
                    : `<mj-text font-size="16px" color="white">No special discounts right now, but stay tuned!</mj-text>`
                }
                ${
                    hasDiscount
                    ? Button({ href: "https://yourwebsite.com", text: "Claim Offer" })
                    : ""
                }

            </mj-column>
        </mj-section>
    </mj-body>
</mjml>
`;
