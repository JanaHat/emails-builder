/**
 * Shared Header Component
 * A reusable email header with logo and navigation
 */

export const Header = ({ 
  logoUrl, 
  logoAlt = "Logo",
  logoWidth = "150px",
  backgroundColor = "#FFFFFF",
  padding = "20px 0",
  align = "center"
}) => `
  <mj-section background-color="${backgroundColor}" padding="${padding}">
    <mj-column>
      <mj-image 
        src="${logoUrl}" 
        alt="${logoAlt}" 
        width="${logoWidth}"
        align="${align}"
      />
    </mj-column>
  </mj-section>
`;

/**
 * Navigation Component
 */
export const Navigation = ({ 
  links = [],
  backgroundColor = "#F8F9FA",
  padding = "10px 0",
  fontSize = "14px",
  fontWeight = "normal",
  color = "#333333"
}) => `
  <mj-section background-color="${backgroundColor}" padding="${padding}">
    <mj-column>
      <mj-text 
        align="center" 
        font-size="${fontSize}" 
        font-weight="${fontWeight}"
        color="${color}"
      >
        ${links.map(link => `<a href="${link.url}" style="color: ${color}; text-decoration: none; margin: 0 15px;">${link.text}</a>`).join('')}
      </mj-text>
    </mj-column>
  </mj-section>
`;