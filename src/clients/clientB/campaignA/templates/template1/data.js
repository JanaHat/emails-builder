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
        variation: "email1",
        localizations: {
            "en-US": withTheme({
                previewText: "New product drop",
                heroTitle: "New product drop",
                heroSubtitle: "Built for speed and clarity.",
                greeting: "Hi there,",
                paragraph1: "We’ve launched a refreshed set of templates designed to move faster from idea to send.",
                paragraph2: "Every block is reusable, and every layout keeps the message tight and easy to scan.",
                extraParagraph: "Start with the essentials and customise as you go.",
                highlightsLeftTitle: "What’s inside",
                highlightsLeftItems: [
                    "Modular sections",
                    "Clear hierarchy",
                    "Mobile-ready"
                ],
                highlightsRightTitle: "Best for",
                highlightsRightItems: [
                    "Product launches",
                    "Updates",
                    "Offers"
                ],
                ctaPrimaryText: "Explore templates",
                ctaPrimaryHref: "#",
                ctaSecondaryText: "View documentation",
                ctaSecondaryHref: "#"
            }),
            "es-US": withTheme({
                previewText: "Nuevo lanzamiento",
                heroTitle: "Nuevo lanzamiento",
                heroSubtitle: "Diseñado para claridad y velocidad.",
                greeting: "Hola,",
                paragraph1: "Lanzamos un nuevo set de plantillas para pasar de idea a envío más rápido.",
                paragraph2: "Cada bloque es reutilizable y el layout mantiene el mensaje claro y escaneable.",
                extraParagraph: "Empieza con lo esencial y personaliza después.",
                highlightsLeftTitle: "Qué incluye",
                highlightsLeftItems: [
                    "Secciones modulares",
                    "Jerarquía clara",
                    "Listo para móvil"
                ],
                highlightsRightTitle: "Ideal para",
                highlightsRightItems: [
                    "Lanzamientos",
                    "Actualizaciones",
                    "Ofertas"
                ],
                ctaPrimaryText: "Explorar plantillas",
                ctaPrimaryHref: "#",
                ctaSecondaryText: "Ver documentación",
                ctaSecondaryHref: "#"
            })
        }
    },
    {
        variation: "email2",
        localizations: {
            "en-US": withTheme({
                previewText: "Your weekly update",
                heroTitle: "Your weekly update",
                heroSubtitle: "The highlights you actually need.",
                greeting: "Hi,",
                paragraph1: "This week’s updates focus on readability and sharper CTAs.",
                paragraph2: "Reuse the core layout and swap the sections to match your story.",
                extraParagraph: "Short, clear, and ready to send.",
                highlightsLeftTitle: "Improvements",
                highlightsLeftItems: [
                    "Cleaner spacing",
                    "Stronger contrast",
                    "Faster production"
                ],
                highlightsRightTitle: "Next up",
                highlightsRightItems: [
                    "Test variations",
                    "Measure clicks",
                    "Iterate quickly"
                ],
                ctaPrimaryText: "See the update",
                ctaPrimaryHref: "#",
                ctaSecondaryText: "Open roadmap",
                ctaSecondaryHref: "#"
            }),
            "es-US": withTheme({
                previewText: "Tu resumen semanal",
                heroTitle: "Tu resumen semanal",
                heroSubtitle: "Lo esencial en pocos minutos.",
                greeting: "Hola,",
                paragraph1: "Las novedades de esta semana mejoran la legibilidad y los CTAs.",
                paragraph2: "Reutiliza el layout y cambia secciones según el mensaje.",
                extraParagraph: "Corto, claro y listo para enviar.",
                highlightsLeftTitle: "Mejoras",
                highlightsLeftItems: [
                    "Espaciado limpio",
                    "Más contraste",
                    "Producción rápida"
                ],
                highlightsRightTitle: "Siguiente",
                highlightsRightItems: [
                    "Probar variantes",
                    "Medir clics",
                    "Iterar rápido"
                ],
                ctaPrimaryText: "Ver actualización",
                ctaPrimaryHref: "#",
                ctaSecondaryText: "Abrir roadmap",
                ctaSecondaryHref: "#"
            })
        }
    }
];
