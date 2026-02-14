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
    summaryLine,
    focusTitle,
    focusItems,
    planTitle,
    planItems,
    timelineTitle,
    timelineItems,
    calloutTitle,
    calloutBody,
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
            ${summaryLine ? `<mj-text font-size="16px" color="${textColor}">${escapeHtml(summaryLine)}</mj-text>` : ''}
        `
    });

    const focusPlan = TwoColumnLayout({
        backgroundColor: highlightBackgroundColor,
        padding: highlightPadding,
        leftContent: `
            ${focusTitle ? `<mj-text font-size="14px" color="${minorHeadingColor}" font-weight="600">${escapeHtml(focusTitle)}</mj-text>` : ''}
            ${Array.isArray(focusItems) && focusItems.length > 0 ? `
            <mj-text font-size="14px" color="${listColor}">
                ${focusItems.map(item => `• ${escapeHtml(item)}`).join('<br/>')}
            </mj-text>
            ` : ''}
        `,
        rightContent: `
            ${planTitle ? `<mj-text font-size="14px" color="${minorHeadingColor}" font-weight="600">${escapeHtml(planTitle)}</mj-text>` : ''}
            ${Array.isArray(planItems) && planItems.length > 0 ? `
            <mj-text font-size="14px" color="${listColor}">
                ${planItems.map(item => `• ${escapeHtml(item)}`).join('<br/>')}
            </mj-text>
            ` : ''}
        `
    });

    const timeline = ContentSection({
        backgroundColor: sectionBackgroundColor,
        padding: sectionPadding,
        children: `
            ${timelineTitle ? `<mj-text font-size="16px" color="${minorHeadingColor}" font-weight="600">${escapeHtml(timelineTitle)}</mj-text>` : ''}
            ${Array.isArray(timelineItems) && timelineItems.length > 0 ? `
            <mj-text font-size="14px" color="${listColor}">
                ${timelineItems.map(item => `• ${escapeHtml(item)}`).join('<br/>')}
            </mj-text>
            ` : ''}
        `
    });

    const callout = ContentSection({
        backgroundColor: calloutBackgroundColor,
        padding: sectionPadding,
        children: `
            ${calloutTitle ? `<mj-text font-size="16px" color="${calloutTextColor}" font-weight="600">${escapeHtml(calloutTitle)}</mj-text>` : ''}
            ${calloutBody ? `<mj-text font-size="14px" color="${calloutTextColor}">${escapeHtml(calloutBody)}</mj-text>` : ''}
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
            ${focusPlan}
            ${timeline}
            ${callout}
            ${callToAction}
            ${footer}
        `
    });
};
