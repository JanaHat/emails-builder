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
    introLine,
    metricsTitle,
    metricsItems,
    nextTitle,
    nextItems,
    updateTitle,
    updateBody,
    spotlightTitle,
    spotlightItems,
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
    calloutBackgroundColor,
    calloutTextColor,
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
            ${introLine ? `<mj-text font-size="16px" color="${textColor}">${escapeHtml(introLine)}</mj-text>` : ''}
        `
    });

    const metrics = TwoColumnLayout({
        backgroundColor: highlightBackgroundColor,
        padding: highlightPadding,
        leftContent: `
            ${metricsTitle ? `<mj-text font-size="14px" color="${minorHeadingColor}" font-weight="600">${escapeHtml(metricsTitle)}</mj-text>` : ''}
            ${Array.isArray(metricsItems) && metricsItems.length > 0 ? `
            <mj-text font-size="14px" color="${listColor}">
                ${metricsItems.map(item => `• ${escapeHtml(item)}`).join('<br/>')}
            </mj-text>
            ` : ''}
        `,
        rightContent: `
            ${nextTitle ? `<mj-text font-size="14px" color="${minorHeadingColor}" font-weight="600">${escapeHtml(nextTitle)}</mj-text>` : ''}
            ${Array.isArray(nextItems) && nextItems.length > 0 ? `
            <mj-text font-size="14px" color="${listColor}">
                ${nextItems.map(item => `• ${escapeHtml(item)}`).join('<br/>')}
            </mj-text>
            ` : ''}
        `
    });

    const update = ContentSection({
        backgroundColor: sectionBackgroundColor,
        padding: sectionPadding,
        children: `
            ${updateTitle ? `<mj-text font-size="16px" color="${minorHeadingColor}" font-weight="600">${escapeHtml(updateTitle)}</mj-text>` : ''}
            ${updateBody ? `<mj-text font-size="16px" color="${textColor}">${escapeHtml(updateBody)}</mj-text>` : ''}
        `
    });

    const spotlight = ContentSection({
        backgroundColor: calloutBackgroundColor,
        padding: sectionPadding,
        children: `
            ${spotlightTitle ? `<mj-text font-size="16px" color="${calloutTextColor}" font-weight="600">${escapeHtml(spotlightTitle)}</mj-text>` : ''}
            ${Array.isArray(spotlightItems) && spotlightItems.length > 0 ? `
            <mj-text font-size="14px" color="${calloutTextColor}">
                ${spotlightItems.map(item => `• ${escapeHtml(item)}`).join('<br/>')}
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
            ${metrics}
            ${update}
            ${spotlight}
            ${callToAction}
            ${footer}
        `
    });
};
