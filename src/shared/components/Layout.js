/**
 * Shared Layout Components
 * Reusable layout structures for email templates
 */

/**
 * Basic Email Layout Wrapper
 */
export const EmailLayout = ({ 
  children, 
  backgroundColor = "#F5F5F5",
  width = "600px",
  fontFamily = "Arial, sans-serif"
}) => `
<mjml>
  <mj-head>
    <mj-font name="Inter" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" />
    <mj-attributes>
      <mj-all font-family="${fontFamily}" />
      <mj-body background-color="${backgroundColor}" width="${width}" />
      <mj-container background-color="#FFFFFF" />
    </mj-attributes>
  </mj-head>
  <mj-body>
    ${children}
  </mj-body>
</mjml>
`;

/**
 * Content Section with padding
 */
export const ContentSection = ({ 
  children,
  backgroundColor = "#FFFFFF",
  padding = "20px 25px"
}) => `
  <mj-section background-color="${backgroundColor}" padding="${padding}">
    <mj-column>
      ${children}
    </mj-column>
  </mj-section>
`;

/**
 * Two Column Layout
 */
export const TwoColumnLayout = ({ 
  leftContent,
  rightContent,
  backgroundColor = "#FFFFFF",
  padding = "20px 25px"
}) => `
  <mj-section background-color="${backgroundColor}" padding="${padding}">
    <mj-column width="50%">
      ${leftContent}
    </mj-column>
    <mj-column width="50%">
      ${rightContent}
    </mj-column>
  </mj-section>
`;

/**
 * Hero Section
 */
export const HeroSection = ({ 
  title,
  subtitle = "",
  backgroundImage = "",
  backgroundColor = "#007BFF",
  textColor = "#FFFFFF",
  padding = "60px 25px"
}) => `
  <mj-section 
    background-color="${backgroundColor}" 
    ${backgroundImage ? `background-url="${backgroundImage}"` : ''}
    background-size="cover"
    background-position="center"
    padding="${padding}"
  >
    <mj-column>
      <mj-text align="center" color="${textColor}" font-size="32px" font-weight="bold">
        ${title}
      </mj-text>
      ${subtitle ? `
      <mj-text align="center" color="${textColor}" font-size="18px">
        ${subtitle}
      </mj-text>
      ` : ''}
    </mj-column>
  </mj-section>
`;