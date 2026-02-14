const campaignTheme = {
    layoutBackgroundColor: "#F4F1ED",
    layoutWidth: "600px",
    fontFamily: "Inter, Arial, sans-serif",
    heroBackgroundColor: "#1E2A78",
    heroTextColor: "#FFFFFF",
    heroPadding: "56px 30px",
    heroBackgroundImage: "",
    sectionBackgroundColor: "#FFFFFF",
    sectionPadding: "22px 28px",
    highlightBackgroundColor: "#EEF2FF",
    highlightPadding: "20px 28px",
    headingColor: "#1E1E2F",
    textColor: "#4A4A5A",
    minorHeadingColor: "#273043",
    listColor: "#4A5568",
    calloutBackgroundColor: "#FFF4E6",
    calloutTextColor: "#7A3E00",
    buttonPrimaryBackground: "#FF6B35",
    buttonSecondaryBackground: "#1E2A78",
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
            "en-GB": withTheme({
                previewText: "Campaign B pulse check",
                heroTitle: "Campaign B pulse check",
                heroSubtitle: "A quick read on progress so far.",
                greeting: "Hello",
                introLine: "Here’s a concise update on performance and the next moves.",
                metricsTitle: "This week",
                metricsItems: [
                    "Open rate: 34%",
                    "CTR: 6.2%",
                    "Top segment: New leads"
                ],
                nextTitle: "Next up",
                nextItems: [
                    "Refine subject lines",
                    "Test CTA placement",
                    "Expand segment"
                ],
                updateTitle: "What changed",
                updateBody: "We tightened the copy and simplified the mid‑email section to keep the focus on the primary action.",
                spotlightTitle: "Spotlight",
                spotlightItems: [
                    "Highest engagement on Wednesday",
                    "Mobile CTR improved",
                    "Best result: Segment B"
                ],
                ctaPrimaryText: "Open the dashboard",
                ctaPrimaryHref: "#",
                ctaSecondaryText: "View benchmarks",
                ctaSecondaryHref: "#"
            }),
            "es-MX": withTheme({
                previewText: "Pulso de la campaña B",
                heroTitle: "Pulso de la campaña B",
                heroSubtitle: "Un vistazo rápido al avance.",
                greeting: "Hola",
                introLine: "Aquí tienes un resumen del desempeño y los próximos pasos.",
                metricsTitle: "Esta semana",
                metricsItems: [
                    "Apertura: 34%",
                    "CTR: 6.2%",
                    "Segmento top: Nuevos leads"
                ],
                nextTitle: "Siguiente",
                nextItems: [
                    "Afinar asuntos",
                    "Probar CTA",
                    "Ampliar segmento"
                ],
                updateTitle: "Qué cambió",
                updateBody: "Ajustamos el copy y simplificamos la sección media para enfocar la acción principal.",
                spotlightTitle: "Destacado",
                spotlightItems: [
                    "Mayor engagement el miércoles",
                    "Mejor CTR móvil",
                    "Mejor resultado: Segmento B"
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
            "en-GB": withTheme({
                previewText: "Next sprint guidance",
                heroTitle: "Next sprint guidance",
                heroSubtitle: "Keep the rollout smooth and measurable.",
                greeting: "Hello",
                introLine: "This note focuses on optimisation steps for the next sprint.",
                metricsTitle: "What to watch",
                metricsItems: [
                    "Subject line lift",
                    "CTA clicks",
                    "Mobile scroll depth"
                ],
                nextTitle: "Actions",
                nextItems: [
                    "Trim secondary copy",
                    "Simplify mid‑section",
                    "Test send time"
                ],
                updateTitle: "Recommendation",
                updateBody: "Keep the layout stable and refresh only one section at a time so results stay clear.",
                spotlightTitle: "Quick wins",
                spotlightItems: [
                    "Shorten preview text",
                    "Move CTA higher",
                    "Highlight one benefit"
                ],
                ctaPrimaryText: "Review guidance",
                ctaPrimaryHref: "#",
                ctaSecondaryText: "See checklist",
                ctaSecondaryHref: "#"
            }),
            "es-MX": withTheme({
                previewText: "Guía para el siguiente sprint",
                heroTitle: "Guía para el siguiente sprint",
                heroSubtitle: "Mantén el despliegue claro y medible.",
                greeting: "Hola",
                introLine: "Este mensaje se enfoca en optimizaciones para el próximo sprint.",
                metricsTitle: "Qué observar",
                metricsItems: [
                    "Mejora en asuntos",
                    "Clics en CTA",
                    "Scroll móvil"
                ],
                nextTitle: "Acciones",
                nextItems: [
                    "Reducir copy secundario",
                    "Simplificar sección media",
                    "Probar hora de envío"
                ],
                updateTitle: "Recomendación",
                updateBody: "Mantén el layout estable y actualiza solo una sección a la vez.",
                spotlightTitle: "Victorias rápidas",
                spotlightItems: [
                    "Acortar preview text",
                    "Subir el CTA",
                    "Resaltar un beneficio"
                ],
                ctaPrimaryText: "Revisar guía",
                ctaPrimaryHref: "#",
                ctaSecondaryText: "Ver checklist",
                ctaSecondaryHref: "#"
            })
        }
    }
];
