/**
 * Shared Button Component
 * A reusable MJML button component with customizable styling
 */

export const Button = ({ 
  href, 
  text, 
  backgroundColor = "#007BFF",
  textColor = "#FFFFFF",
  borderRadius = "4px",
  padding = "10px 25px",
  fontSize = "16px",
  fontWeight = "bold",
  width = "auto",
  align = "center",
  target = "_blank",
  rel = "noopener noreferrer"
}) => `
  <mj-button 
    href="${href}" 
    background-color="${backgroundColor}"
    color="${textColor}"
    border-radius="${borderRadius}"
    padding="${padding}"
    font-size="${fontSize}"
    font-weight="${fontWeight}"
    width="${width}"
    align="${align}"
    target="${target}"
    rel="${rel}"
  >
    ${text}
  </mj-button>
`;

/**
 * Primary Button - Blue theme
 */
export const PrimaryButton = (props) => Button({
  backgroundColor: "#007BFF",
  textColor: "#FFFFFF",
  ...props
});

/**
 * Secondary Button - Gray theme
 */
export const SecondaryButton = (props) => Button({
  backgroundColor: "#6C757D",
  textColor: "#FFFFFF",
  ...props
});

/**
 * Success Button - Green theme
 */
export const SuccessButton = (props) => Button({
  backgroundColor: "#28A745",
  textColor: "#FFFFFF",
  ...props
});

/**
 * Warning Button - Orange theme
 */
export const WarningButton = (props) => Button({
  backgroundColor: "#FFC107",
  textColor: "#212529",
  ...props
});

/**
 * Danger Button - Red theme
 */
export const DangerButton = (props) => Button({
  backgroundColor: "#DC3545",
  textColor: "#FFFFFF",
  ...props
});