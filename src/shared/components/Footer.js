/**
 * Shared Footer Component
 * A reusable email footer with social links and unsubscribe
 */

export const Footer = ({ 
  companyName = "Your Company",
  companyAddress = "123 Street, City, State 12345",
  unsubscribeUrl = "#",
  socialLinks = [],
  backgroundColor = "#F8F9FA",
  textColor = "#6C757D",
  padding = "40px 25px",
  fontSize = "12px"
}) => `
  <mj-section background-color="${backgroundColor}" padding="${padding}">
    <mj-column>
      ${socialLinks.length > 0 ? `
      <mj-social font-size="15px" icon-size="30px" mode="horizontal">
        ${socialLinks.map(social => `
          <mj-social-element name="${social.name}" href="${social.url}">
          </mj-social-element>
        `).join('')}
      </mj-social>
      ` : ''}
      
      <mj-text align="center" color="${textColor}" font-size="${fontSize}">
        <strong>${companyName}</strong><br>
        ${companyAddress}
      </mj-text>
      
      <mj-text align="center" color="${textColor}" font-size="${fontSize}">
        <a href="${unsubscribeUrl}" style="color: ${textColor};">Unsubscribe</a> | 
        <a href="#" style="color: ${textColor};">Privacy Policy</a>
      </mj-text>
    </mj-column>
  </mj-section>
`;

/**
 * Simple Footer - minimal version
 */
export const SimpleFooter = ({ 
  companyName = "Your Company",
  unsubscribeUrl = "#"
}) => Footer({
  companyName,
  unsubscribeUrl,
  socialLinks: [],
  companyAddress: ""
});