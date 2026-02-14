import {
    Button,
    ContentSection,
    TwoColumnLayout,
    HeroSection,
    Footer,
    EmailLayout
} from '../../../../../shared/components/index.js';

export const generateEmail = ({
    previewText,
    heroTitle,
    heroSubtitle,
    greeting,
    paragraph1,
    paragraph2,
    extraParagraph,
    highlightsLeftTitle,
    highlightsLeftItems,
    highlightsRightTitle,
    highlightsRightItems,
    ctaPrimaryText,
    ctaPrimaryHref,
    ctaSecondaryText,
    ctaSecondaryHref,
    layoutBackgroundColor,
    layoutWidth,
    fontFamily,
    heroBackgroundColor,
    heroTextColor,
    heroPadding,
    heroBackgroundImage,
    sectionBackgroundColor,
    sectionPadding,
    highlightBackgroundColor,
    highlightPadding,
    headingColor,
    textColor,
    minorHeadingColor,
    listColor,
    buttonPrimaryBackground,
    buttonSecondaryBackground,
    buttonTextColor,
    buttonRadius,
    buttonPadding,
    buttonFontSize,
    buttonFontWeight,
    buttonAlign,
    footerBackgroundColor,
    footerTextColor,
    footerPadding,
    footerFontSize,
    companyName,
    companyAddress,
    unsubscribeUrl,
    socialLinks
}) => {
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

    const hero = HeroSection({
        title: escapeHtml(heroTitle || ''),
        subtitle: escapeHtml(heroSubtitle || ''),
        backgroundColor: heroBackgroundColor,
        backgroundImage: heroBackgroundImage || '',
        textColor: heroTextColor,
        padding: heroPadding
    });

    const intro = ContentSection({
        backgroundColor: sectionBackgroundColor,
        padding: sectionPadding,
        children: `
            ${greeting ? `<mj-text font-size="20px" color="${headingColor}" font-weight="600">${escapeHtml(greeting)}</mj-text>` : ''}
            ${paragraph1 ? `<mj-text font-size="16px" color="${textColor}">${escapeHtml(paragraph1)}</mj-text>` : ''}
            ${paragraph2 ? `<mj-text font-size="16px" color="${textColor}">${escapeHtml(paragraph2)}</mj-text>` : ''}
            ${extraParagraph ? `<mj-text font-size="16px" color="${textColor}">${escapeHtml(extraParagraph)}</mj-text>` : ''}
        `
    });

    const highlights = TwoColumnLayout({
        backgroundColor: highlightBackgroundColor,
        padding: highlightPadding,
        leftContent: `
            ${highlightsLeftTitle ? `<mj-text font-size="14px" color="${minorHeadingColor}" font-weight="600">${escapeHtml(highlightsLeftTitle)}</mj-text>` : ''}
            ${Array.isArray(highlightsLeftItems) && highlightsLeftItems.length > 0 ? `
            <mj-text font-size="14px" color="${listColor}">
                ${highlightsLeftItems.map(item => `• ${escapeHtml(item)}`).join('<br/>')}
            </mj-text>
            ` : ''}
        `,
        rightContent: `
            ${highlightsRightTitle ? `<mj-text font-size="14px" color="${minorHeadingColor}" font-weight="600">${escapeHtml(highlightsRightTitle)}</mj-text>` : ''}
            ${Array.isArray(highlightsRightItems) && highlightsRightItems.length > 0 ? `
            <mj-text font-size="14px" color="${listColor}">
                ${highlightsRightItems.map(item => `• ${escapeHtml(item)}`).join('<br/>')}
            </mj-text>
            ` : ''}
        `
    });

    const callToAction = ContentSection({
        backgroundColor: sectionBackgroundColor,
        padding: sectionPadding,
        children: `
            ${ctaPrimaryText ? Button({
                href: ctaPrimaryHref || '#',
                text: escapeHtml(ctaPrimaryText),
                backgroundColor: buttonPrimaryBackground,
                textColor: buttonTextColor,
                borderRadius: buttonRadius,
                padding: buttonPadding,
                fontSize: buttonFontSize,
                fontWeight: buttonFontWeight,
                align: buttonAlign
            }) : ''}
            ${ctaSecondaryText ? Button({
                href: ctaSecondaryHref || '#',
                text: escapeHtml(ctaSecondaryText),
                backgroundColor: buttonSecondaryBackground,
                textColor: buttonTextColor,
                borderRadius: buttonRadius,
                padding: buttonPadding,
                fontSize: buttonFontSize,
                fontWeight: buttonFontWeight,
                align: buttonAlign
            }) : ''}
        `
    });

    const footer = Footer({
        companyName: companyName || '',
        companyAddress: companyAddress || '',
        unsubscribeUrl: unsubscribeUrl || '#',
        socialLinks: Array.isArray(socialLinks) ? socialLinks : [],
        backgroundColor: footerBackgroundColor,
        textColor: footerTextColor,
        padding: footerPadding,
        fontSize: footerFontSize
    });

    return EmailLayout({
        preview: escapeHtml(previewText || ''),
        backgroundColor: layoutBackgroundColor,
        width: layoutWidth,
        fontFamily,
        children: `
            ${hero}
            ${intro}
            ${highlights}
            ${callToAction}
            ${footer}
        `
    });
};
