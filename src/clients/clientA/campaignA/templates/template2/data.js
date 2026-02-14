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
        variation: "email3",
        localizations: {
            "en-US": withTheme({
                previewText: "Exclusive offer just for you",
                heroTitle: "Exclusive offer just for you",
                heroSubtitle: "Personalized perks are waiting inside.",
                greeting: "Hello",
                introLine: "We have a special offer picked just for you.",
                offerLine: "Claim your code below and enjoy your savings.",
                discountLabel: "Your discount code:",
                hasDiscount: true,
                discountCode: "SAVE20",
                noDiscountLine: "No special discounts right now, but stay tuned!",
                highlightsLeftTitle: "What you get",
                highlightsLeftItems: [
                    "Instant savings",
                    "Flexible plans",
                    "Quick setup"
                ],
                highlightsRightTitle: "Why now",
                highlightsRightItems: [
                    "Limited time",
                    "Popular pick",
                    "Easy to redeem"
                ],
                ctaPrimaryText: "Claim offer",
                ctaPrimaryHref: "https://yourwebsite.com",
                ctaSecondaryText: "See all benefits",
                ctaSecondaryHref: "https://yourwebsite.com/benefits"
            }),
            "es-US": withTheme({
                previewText: "Oferta exclusiva para ti",
                heroTitle: "Oferta exclusiva para ti",
                heroSubtitle: "Beneficios personalizados te esperan.",
                greeting: "Hola",
                introLine: "Tenemos una oferta especial hecha para ti.",
                offerLine: "Usa el código de abajo y aprovecha el ahorro.",
                discountLabel: "Tu código de descuento:",
                hasDiscount: true,
                discountCode: "SAVE20",
                noDiscountLine: "Ahora no hay descuentos especiales, pero mantente atento.",
                highlightsLeftTitle: "Lo que obtienes",
                highlightsLeftItems: [
                    "Ahorro inmediato",
                    "Planes flexibles",
                    "Configuración rápida"
                ],
                highlightsRightTitle: "Por qué ahora",
                highlightsRightItems: [
                    "Tiempo limitado",
                    "Muy popular",
                    "Fácil de canjear"
                ],
                ctaPrimaryText: "Reclamar oferta",
                ctaPrimaryHref: "https://yourwebsite.com",
                ctaSecondaryText: "Ver beneficios",
                ctaSecondaryHref: "https://yourwebsite.com/benefits"
            })
        }
    },
    {
        variation: "email4",
        localizations: {
            "en-US": withTheme({
                previewText: "We saved a spot for you",
                heroTitle: "We saved a spot for you",
                heroSubtitle: "Come back and see what’s new.",
                greeting: "Hello",
                userName: "Jak",
                introLine: "We noticed you haven’t used your perks yet.",
                offerLine: "Jump back in and explore the latest updates.",
                discountLabel: "Your discount code:",
                hasDiscount: false,
                discountCode: "",
                noDiscountLine: "No discounts at the moment, but new offers drop often.",
                highlightsLeftTitle: "What’s new",
                highlightsLeftItems: [
                    "Faster templates",
                    "Refined layouts",
                    "Cleaner typography"
                ],
                highlightsRightTitle: "Next steps",
                highlightsRightItems: [
                    "Review updates",
                    "Pick a template",
                    "Publish fast"
                ],
                ctaPrimaryText: "See updates",
                ctaPrimaryHref: "https://yourwebsite.com/updates",
                ctaSecondaryText: "Browse templates",
                ctaSecondaryHref: "https://yourwebsite.com/templates"
            }),
            "es-US": withTheme({
                previewText: "Guardamos un lugar para ti",
                heroTitle: "Guardamos un lugar para ti",
                heroSubtitle: "Vuelve y descubre lo nuevo.",
                greeting: "Hola",
                userName: "Jak",
                introLine: "Notamos que aún no usaste tus beneficios.",
                offerLine: "Regresa y explora las últimas novedades.",
                discountLabel: "Tu código de descuento:",
                hasDiscount: false,
                discountCode: "",
                noDiscountLine: "No hay descuentos por ahora, pero pronto habrá más ofertas.",
                highlightsLeftTitle: "Qué hay de nuevo",
                highlightsLeftItems: [
                    "Plantillas más rápidas",
                    "Layouts refinados",
                    "Tipografía más limpia"
                ],
                highlightsRightTitle: "Próximos pasos",
                highlightsRightItems: [
                    "Revisar novedades",
                    "Elegir plantilla",
                    "Publicar rápido"
                ],
                ctaPrimaryText: "Ver novedades",
                ctaPrimaryHref: "https://yourwebsite.com/updates",
                ctaSecondaryText: "Ver plantillas",
                ctaSecondaryHref: "https://yourwebsite.com/templates"
            })
        }
    }
];
