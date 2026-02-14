const campaignTheme = {
    layoutBackgroundColor: "#F3F6FB",
    layoutWidth: "600px",
    fontFamily: "Inter, Arial, sans-serif",
    heroBackgroundColor: "#2D1B69",
    heroTextColor: "#FFFFFF",
    heroPadding: "56px 28px",
    heroBackgroundImage: "",
    sectionBackgroundColor: "#FFFFFF",
    sectionPadding: "20px 26px",
    highlightBackgroundColor: "#EEF2FF",
    highlightPadding: "20px 26px",
    headingColor: "#1F2430",
    textColor: "#4B5563",
    minorHeadingColor: "#2C3445",
    listColor: "#4B5563",
    calloutBackgroundColor: "#F5F3FF",
    calloutTextColor: "#4C1D95",
    buttonPrimaryBackground: "#6D28D9",
    buttonSecondaryBackground: "#2563EB",
    buttonTextColor: "#FFFFFF",
    buttonRadius: "6px",
    buttonPadding: "12px 26px",
    buttonFontSize: "16px",
    buttonFontWeight: "bold",
    buttonAlign: "left",
    footerBackgroundColor: "#F8F9FA",
    footerTextColor: "#6C757D",
    footerPadding: "40px 25px",
    footerFontSize: "12px",
    companyName: "Jana Studio",
    companyAddress: "Prague, CZ",
    unsubscribeUrl: "#",
    socialLinks: [
        { name: "facebook", url: "#" },
        { name: "instagram", url: "#" }
    ]
};

const withTheme = (data) => ({
    ...campaignTheme,
    ...data
});

export const emailData = [
    {
        variation: "email3",
        localizations: {
            "en-US": withTheme({
                previewText: "Performance snapshot",
                heroTitle: "Performance snapshot",
                heroSubtitle: "A quick look at what’s moving.",
                greeting: "Hello,",
                introLine: "Here’s a concise update on campaign performance and next actions.",
                metricsTitle: "Metrics",
                metricsItems: [
                    "Open rate: 32%",
                    "CTR: 5.8%",
                    "Top segment: Returning"
                ],
                nextTitle: "Next actions",
                nextItems: [
                    "A/B subject lines",
                    "Test CTA placement",
                    "Refine audience"
                ],
                updateTitle: "What changed",
                updateBody: "We simplified the mid‑section and highlighted one primary action.",
                spotlightTitle: "Spotlight",
                spotlightItems: [
                    "Best day: Thursday",
                    "Mobile CTR up",
                    "Segment B leads"
                ],
                ctaPrimaryText: "Open dashboard",
                ctaPrimaryHref: "#",
                ctaSecondaryText: "See benchmarks",
                ctaSecondaryHref: "#"
            }),
            "es-US": withTheme({
                previewText: "Resumen de rendimiento",
                heroTitle: "Resumen de rendimiento",
                heroSubtitle: "Un vistazo rápido a lo que avanza.",
                greeting: "Hola,",
                introLine: "Aquí tienes un resumen del rendimiento y los siguientes pasos.",
                metricsTitle: "Métricas",
                metricsItems: [
                    "Apertura: 32%",
                    "CTR: 5.8%",
                    "Segmento top: Recurrentes"
                ],
                nextTitle: "Siguientes acciones",
                nextItems: [
                    "Probar asuntos",
                    "Test de CTA",
                    "Refinar audiencia"
                ],
                updateTitle: "Qué cambió",
                updateBody: "Simplificamos la sección media y destacamos una acción principal.",
                spotlightTitle: "Destacado",
                spotlightItems: [
                    "Mejor día: Jueves",
                    "CTR móvil arriba",
                    "Segmento B leads"
                ],
                ctaPrimaryText: "Abrir panel",
                ctaPrimaryHref: "#",
                ctaSecondaryText: "Ver benchmarks",
                ctaSecondaryHref: "#"
            })
        }
    },
    {
        variation: "email4",
        localizations: {
            "en-US": withTheme({
                previewText: "Next sprint guidance",
                heroTitle: "Next sprint guidance",
                heroSubtitle: "Keep the rollout sharp and measurable.",
                greeting: "Hello,",
                introLine: "This update focuses on the next sprint actions and what to monitor.",
                metricsTitle: "Watch for",
                metricsItems: [
                    "Subject line lift",
                    "CTA clicks",
                    "Mobile scroll depth"
                ],
                nextTitle: "Do next",
                nextItems: [
                    "Trim secondary copy",
                    "Move CTA higher",
                    "Test send time"
                ],
                updateTitle: "Recommendation",
                updateBody: "Keep the layout stable and refresh one section at a time.",
                spotlightTitle: "Quick wins",
                spotlightItems: [
                    "Shorten preview",
                    "Highlight one benefit",
                    "Simplify mid‑section"
                ],
                ctaPrimaryText: "Review guidance",
                ctaPrimaryHref: "#",
                ctaSecondaryText: "Open checklist",
                ctaSecondaryHref: "#"
            }),
            "es-US": withTheme({
                previewText: "Guía del siguiente sprint",
                heroTitle: "Guía del siguiente sprint",
                heroSubtitle: "Mantén el despliegue claro y medible.",
                greeting: "Hola,",
                introLine: "Este mensaje se enfoca en las acciones del próximo sprint.",
                metricsTitle: "Qué observar",
                metricsItems: [
                    "Mejora en asuntos",
                    "Clics en CTA",
                    "Scroll móvil"
                ],
                nextTitle: "Siguiente",
                nextItems: [
                    "Reducir copy",
                    "Subir el CTA",
                    "Probar hora"
                ],
                updateTitle: "Recomendación",
                updateBody: "Mantén el layout estable y actualiza una sección a la vez.",
                spotlightTitle: "Victorias rápidas",
                spotlightItems: [
                    "Acortar preview",
                    "Resaltar beneficio",
                    "Simplificar sección"
                ],
                ctaPrimaryText: "Revisar guía",
                ctaPrimaryHref: "#",
                ctaSecondaryText: "Abrir checklist",
                ctaSecondaryHref: "#"
            })
        }
    }
];
