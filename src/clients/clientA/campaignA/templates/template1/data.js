const campaignTheme = {
    layoutBackgroundColor: "#F5F7FA",
    layoutWidth: "600px",
    fontFamily: "Inter, Arial, sans-serif",
    heroBackgroundColor: "#a5e6a8",
    heroTextColor: "#0b2d16",
    heroPadding: "50px 25px",
    heroBackgroundImage: "",
    sectionBackgroundColor: "#FFFFFF",
    sectionPadding: "20px 25px",
    highlightBackgroundColor: "#F6F9FC",
    highlightPadding: "20px 25px",
    headingColor: "#333333",
    textColor: "#555555",
    minorHeadingColor: "#2d3b45",
    listColor: "#4f5b66",
    buttonPrimaryBackground: "#28A745",
    buttonSecondaryBackground: "#0B5FFF",
    buttonTextColor: "#FFFFFF",
    buttonRadius: "4px",
    buttonPadding: "10px 25px",
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
                previewText: "Our office plant resigned",
                heroTitle: "Our office plant resigned",
                heroSubtitle: "New layouts, clearer content, and better performance.",
                greeting: "Hey",
                paragraph1: "It's been a rough week. Our office plant resigned. Said something about \"too much screen time\" and \"not enough sunlight.\" We took it personally - so we decided to make some changes.",
                paragraph2: "Now we're taking better care of our environment (and our projects). Fresh designs, flexible layouts, and emails that actually look alive - no wilted templates here. Turns out, a little love and attention go a long way.",
                paragraph3: "So, in honor of our brave plant's sacrifice, we invite you to see what healthy growth really looks like.",
                extraParagraph: "Here’s what you can expect next: clearer hierarchy, stronger calls-to-action, and responsive layouts that adapt to every screen.",
                highlightsLeftTitle: "What’s improved",
                highlightsLeftItems: [
                    "Cleaner typography",
                    "Consistent spacing",
                    "Lightweight markup"
                ],
                highlightsRightTitle: "Why it matters",
                highlightsRightItems: [
                    "Faster load times",
                    "Higher engagement",
                    "Easier production"
                ],
                ctaPrimaryText: "Watch it bloom",
                ctaPrimaryHref: "#",
                ctaSecondaryText: "View more examples",
                ctaSecondaryHref: "#"
            }),
            "es-US": withTheme({
                previewText: "Nuestra planta de oficina renunció",
                heroTitle: "Nuestra planta de oficina renunció",
                heroSubtitle: "Nuevos diseños, contenido más claro y mejor rendimiento.",
                greeting: "Hola",
                paragraph1: "Ha sido una semana difícil. Nuestra planta de oficina renunció. Dijo algo sobre \"demasiado tiempo frente a la pantalla\" y \"no suficiente luz solar\". Nos lo tomamos personalmente, así que decidimos hacer algunos cambios.",
                paragraph2: "Ahora estamos cuidando mejor nuestro entorno (y nuestros proyectos). Diseños frescos, diseños flexibles y correos electrónicos que realmente parecen vivos: no más plantillas marchitas. Resulta que un poco de amor y atención pueden hacer una gran diferencia.",
                paragraph3: "Así que, en honor al sacrificio de nuestra valiente planta, te invitamos a ver cómo se ve un crecimiento saludable.",
                extraParagraph: "Esto es lo que puedes esperar a continuación: jerarquía más clara, llamadas a la acción más fuertes y diseños responsivos que se adaptan a cada pantalla.",
                highlightsLeftTitle: "Qué mejoró",
                highlightsLeftItems: [
                    "Tipografía más limpia",
                    "Espaciado consistente",
                    "Marcado liviano"
                ],
                highlightsRightTitle: "Por qué importa",
                highlightsRightItems: [
                    "Carga más rápida",
                    "Mayor interacción",
                    "Producción más simple"
                ],
                ctaPrimaryText: "Míralo florecer",
                ctaPrimaryHref: "#",
                ctaSecondaryText: "Ver más ejemplos",
                ctaSecondaryHref: "#"
            })
        }
    },
    {
        variation: "email2",
        localizations: {
            "en-US": withTheme({
                previewText: "Revitalize your inbox with fresh designs",
                heroTitle: "Revitalize your inbox with fresh designs",
                heroSubtitle: "Design updates that look great everywhere.",
                greeting: "Hey",
                paragraph1: "It's been a rough week. Our office plant resigned. Said something about \"too much screen time\" and \"not enough sunlight.\" We took it personally - so we decided to make some changes.",
                paragraph2: "Now we're taking better care of our environment (and our projects). Fresh designs, flexible layouts, and emails that actually look alive - no wilted templates here. Turns out, a little love and attention go a long way.",
                paragraph3: "So, in honor of our brave plant's sacrifice, we invite you to see what healthy growth really looks like.",
                extraParagraph: "Expect clearer hierarchy, stronger calls-to-action, and responsive layouts that adapt to every screen.",
                highlightsLeftTitle: "What’s improved",
                highlightsLeftItems: [
                    "Cleaner typography",
                    "Consistent spacing",
                    "Lightweight markup"
                ],
                highlightsRightTitle: "Why it matters",
                highlightsRightItems: [
                    "Faster load times",
                    "Higher engagement",
                    "Easier production"
                ],
                ctaPrimaryText: "Explore the updates",
                ctaPrimaryHref: "#",
                ctaSecondaryText: "View more examples",
                ctaSecondaryHref: "#"
            }),
            "es-US": withTheme({
                previewText: "Renueva tu bandeja con diseños frescos",
                heroTitle: "Renueva tu bandeja con diseños frescos",
                heroSubtitle: "Actualizaciones de diseño que se ven bien en cualquier pantalla.",
                greeting: "Hola",
                paragraph1: "Ha sido una semana difícil. Nuestra planta de oficina renunció. Dijo algo sobre \"demasiado tiempo frente a la pantalla\" y \"no suficiente luz solar\". Nos lo tomamos personalmente, así que decidimos hacer algunos cambios.",
                paragraph2: "Ahora estamos cuidando mejor nuestro entorno (y nuestros proyectos). Diseños frescos, diseños flexibles y correos electrónicos que realmente parecen vivos: no más plantillas marchitas. Resulta que un poco de amor y atención pueden hacer una gran diferencia.",
                paragraph3: "Así que, en honor al sacrificio de nuestra valiente planta, te invitamos a ver cómo se ve un crecimiento saludable.",
                extraParagraph: "Espera una jerarquía más clara, llamadas a la acción más fuertes y diseños responsivos que se adaptan a cada pantalla.",
                highlightsLeftTitle: "Qué mejoró",
                highlightsLeftItems: [
                    "Tipografía más limpia",
                    "Espaciado consistente",
                    "Marcado liviano"
                ],
                highlightsRightTitle: "Por qué importa",
                highlightsRightItems: [
                    "Carga más rápida",
                    "Mayor interacción",
                    "Producción más simple"
                ],
                ctaPrimaryText: "Explorar actualizaciones",
                ctaPrimaryHref: "#",
                ctaSecondaryText: "Ver más ejemplos",
                ctaSecondaryHref: "#"
            })
        }
    }
];