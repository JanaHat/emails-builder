# MJML Email Builder

A powerful, scalable email template building system using MJML with support for multiple clients, campaigns, and localizations.

## 🚀 Features

- **Multi-client & Multi-campaign Support**: Organize templates by client and campaign
- **Localization Support**: Build emails in multiple languages
- **Shared Component Library**: Reusable MJML components across all projects
- **Hot Reload Development**: Automatic rebuilding when files change
- **Configuration-driven**: Central configuration for easy management
- **Build Validation**: Comprehensive error handling and validation
- **CLI Interface**: Command-line tools for building specific clients/campaigns

## 📋 Requirements

- Node.js v20.11.0 or higher
- npm or yarn

## 🛠 Installation

```bash
# Clone the repository
git clone <repository-url>
cd mjml-emails

# Install dependencies
npm install
```

## 📁 Project Structure

```
mjml-emails/
├── src/
│   ├── buildEmails.js          # Main build script
│   ├── devServer.js            # Development server with file watching
│   ├── config.js               # Central configuration
│   ├── utils.js                # Shared utilities
│   ├── shared/
│   │   └── components/         # Shared MJML components
│   │       ├── Button.js       # Button components
│   │       ├── Header.js       # Header and navigation
│   │       ├── Footer.js       # Footer components
│   │       ├── Layout.js       # Layout components
│   │       └── index.js        # Component exports
│   └── clients/
│       ├── clientA/
│       │   ├── buildEmails.js  # (Legacy - replaced by new system)
│       │   ├── server.js       # Preview server
│       │   ├── campaignA/
│       │   │   ├── components/ # Campaign-specific components
│       │   │   └── templates/  # Email templates
│       │   └── ui/             # Preview UI
│       └── clientB/
│           └── ...
├── output/                     # Generated HTML files
│   ├── clientA/
│   └── clientB/
└── package.json
```

## 🎯 Quick Start

### Building Emails

```bash
# Build all emails for all clients
npm run build:all

# Build emails for a specific client
npm run build:clientA
npm run build:clientB

# Build specific campaign
npm run build:clientA:campaignA
npm run build:clientA:campaignB

# Build using the CLI directly
node src/buildEmails.js clientA
node src/buildEmails.js clientA campaignA
```

### Development Mode

```bash
# Watch all clients for changes and auto-rebuild
npm run dev

# Watch specific client
npm run dev:clientA
npm run dev:clientB

# Alternative watch commands
npm run watch
npm run watch:clientA
```

### Preview Server

```bash
# Start preview server for clientA
npm run start-clientA

# Start preview server for clientB  
npm run start-clientB
```

Visit `http://localhost:3000` to preview emails in the browser.

## 📧 Creating Email Templates

### 1. Template Structure

Each template consists of two files:
- `data.js` - Contains email data and localizations
- `template.js` - Contains the MJML template function

### 2. Data File (`data.js`)

```javascript
export const emailData = [
    {
        variation: "welcome-email",
        localizations: {
            "en-US": {
                userName: "John Doe",
                hasDiscount: true,
                discountCode: "WELCOME20",
                companyName: "Your Company"
            },
            "es-MX": {
                userName: "Juan Pérez", 
                hasDiscount: true,
                discountCode: "BIENVENIDO20",
                companyName: "Su Empresa"
            }
        }
    }
];
```

### 3. Template File (`template.js`)

Using shared components:

```javascript
import { 
  EmailLayout, 
  HeroSection, 
  ContentSection, 
  PrimaryButton, 
  Footer 
} from "../../../../shared/components/index.js";

export const generateEmail = ({ userName, hasDiscount, discountCode, companyName }) => 
  EmailLayout({
    children: `
      ${HeroSection({
        title: `Welcome ${userName}!`,
        subtitle: "Thank you for joining us"
      })}
      
      ${ContentSection({
        children: `
          <mj-text>Your personalized content here...</mj-text>
          
          ${hasDiscount ? `
            ${PrimaryButton({
              href: "https://example.com/shop",
              text: "Use Code: " + discountCode
            })}
          ` : ''}
        `
      })}
      
      ${Footer({
        companyName,
        unsubscribeUrl: "https://example.com/unsubscribe"
      })}
    `
  });
```

## 🧩 Shared Components

The shared component library provides reusable MJML components:

### Buttons
```javascript
import { PrimaryButton, SecondaryButton, DangerButton } from "../shared/components/index.js";

PrimaryButton({ href: "https://example.com", text: "Click Me" })
SecondaryButton({ href: "https://example.com", text: "Secondary Action" })
```

### Layout Components
```javascript
import { EmailLayout, HeroSection, ContentSection } from "../shared/components/index.js";

EmailLayout({ children: "..." })
HeroSection({ title: "Hero Title", subtitle: "Subtitle" })
ContentSection({ children: "..." })
```

### Headers and Footers
```javascript
import { Header, Footer } from "../shared/components/index.js";

Header({ logoUrl: "https://example.com/logo.png" })
Footer({ 
  companyName: "Your Company",
  socialLinks: [
    { name: "facebook", url: "https://facebook.com/company" }
  ]
})
```

## ⚙️ Configuration

Edit `src/config.js` to add new clients, campaigns, or modify settings:

```javascript
export const config = {
  clients: {
    newClient: {
      name: 'New Client',
      outputPath: 'newClient',
      campaigns: {
        campaign1: {
          name: 'Campaign 1',
          templatesPath: 'campaign1/templates',
          outputPath: 'campaign1'
        }
      }
    }
  }
};
```

## 🔧 Development Workflow

**Recommended development setup:**

1. **Terminal 1 - Build Watcher**: `npm run dev:clientA`
   - Watches for file changes and rebuilds emails automatically

2. **Terminal 2 - Preview Server**: `npm run start-clientA` 
   - Serves the email preview UI at http://localhost:3000

3. **Edit Templates**: Modify files in `src/clients/clientA/`
   - Files are automatically rebuilt and served

4. **Preview**: Open `http://localhost:3000` to see results

**Alternative single-terminal workflow:**
- Use `npm run serve:clientA` to start just the preview server
- Run `npm run build:clientA` manually when you make changes

## 📝 Best Practices

### Template Organization
- Keep templates focused and single-purpose
- Use descriptive names for variations
- Group related templates in campaigns

### Component Development
- Create reusable components in `src/shared/components/`
- Use clear prop interfaces
- Document component usage

### Data Management
- Structure localization data consistently
- Include all required fields for each locale
- Use meaningful variation names

### Performance
- The build system includes HTML minification
- MJML validation catches errors early
- File watching only rebuilds changed clients

## 🐛 Troubleshooting

### Build Errors
- Check file paths in import statements
- Verify data.js exports `emailData`
- Ensure template.js exports `generateEmail`

### Missing Output
- Check configuration in `src/config.js`
- Verify template and data files exist
- Review console output for errors

### Preview Issues
- Ensure preview server is running
- Check output directory structure
- Verify HTML files were generated

## 📚 MJML Resources

- [MJML Documentation](https://mjml.io/documentation/)
- [MJML Components](https://mjml.io/components/)
- [MJML Online Editor](https://mjml.io/try-it-live)

## 🤝 Contributing

1. Follow the existing code structure
2. Add new shared components when applicable
3. Update configuration for new clients
4. Test builds before committing
5. Document new features in README

## 📄 License

ISC License