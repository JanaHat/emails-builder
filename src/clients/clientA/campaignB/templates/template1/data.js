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
        variation: "email1",
        localizations: {
            "en-GB": withTheme({
                previewText: "Campaign B is underway",
                heroTitle: "Campaign B is underway",
                heroSubtitle: "A new palette, a tighter layout, and focused sections.",
                greeting: "Hello",
                introLine: "We’ve refreshed Campaign B with a sharper structure and clearer story flow.",
                summaryLine: "Expect consistent branding with sections that flex to each message.",
                focusTitle: "Focus areas",
                focusItems: [
                    "Stronger hierarchy",
                    "More breathing room",
                    "Reusable blocks"
                ],
                planTitle: "Delivery plan",
                planItems: [
                    "Kick-off email",
                    "Follow-up nudges",
                    "Performance recap"
                ],
                timelineTitle: "Key dates",
                timelineItems: [
                    "Week 1: Launch",
                    "Week 2: Optimise",
                    "Week 3: Scale"
                ],
                calloutTitle: "Why it works",
                calloutBody: "A shared layout reduces production time and improves recognition across the campaign.",
                ctaPrimaryText: "View the rollout",
                ctaPrimaryHref: "#",
                ctaSecondaryText: "See all emails",
                ctaSecondaryHref: "#"
            }),
            "es-MX": withTheme({
                previewText: "La campaña B ya está en marcha",
                heroTitle: "La campaña B ya está en marcha",
                heroSubtitle: "Nueva paleta, layout más claro y secciones enfocadas.",
                greeting: "Hola",
                introLine: "Renovamos la campaña B con una estructura más limpia y mejor flujo de historia.",
                summaryLine: "Verás branding consistente con secciones que se adaptan a cada mensaje.",
                focusTitle: "Áreas de enfoque",
                focusItems: [
                    "Jerarquía más fuerte",
                    "Más aire visual",
                    "Bloques reutilizables"
                ],
                planTitle: "Plan de entrega",
                planItems: [
                    "Email de lanzamiento",
                    "Seguimientos",
                    "Resumen de resultados"
                ],
                timelineTitle: "Fechas clave",
                timelineItems: [
                    "Semana 1: Lanzamiento",
                    "Semana 2: Optimización",
                    "Semana 3: Escalamiento"
                ],
                calloutTitle: "Por qué funciona",
                calloutBody: "Un layout compartido reduce tiempo de producción y mejora el reconocimiento.",
                ctaPrimaryText: "Ver lanzamiento",
                ctaPrimaryHref: "#",
                ctaSecondaryText: "Ver todos los emails",
                ctaSecondaryHref: "#"
            })
        }
    },
    {
        variation: "email2",
        localizations: {
            "en-GB": withTheme({
                previewText: "Week two priorities",
                heroTitle: "Week two priorities",
                heroSubtitle: "Keep momentum with a clean follow‑up.",
                greeting: "Hello",
                introLine: "This message highlights the next actions while keeping the same visual system.",
                summaryLine: "Swap sections in and out without breaking the layout.",
                focusTitle: "This week",
                focusItems: [
                    "Refine copy",
                    "Test CTAs",
                    "Review engagement"
                ],
                planTitle: "In progress",
                planItems: [
                    "Audience split",
                    "Variant checks",
                    "Send window"
                ],
                timelineTitle: "Next milestones",
                timelineItems: [
                    "Thursday: Report",
                    "Friday: Adjust",
                    "Monday: Relaunch"
                ],
                calloutTitle: "Keep it consistent",
                calloutBody: "A stable layout helps readers scan quickly and find the action you want.",
                ctaPrimaryText: "Review the plan",
                ctaPrimaryHref: "#",
                ctaSecondaryText: "See performance",
                ctaSecondaryHref: "#"
            }),
            "es-MX": withTheme({
                previewText: "Prioridades de la semana dos",
                heroTitle: "Prioridades de la semana dos",
                heroSubtitle: "Mantén el impulso con un seguimiento claro.",
                greeting: "Hola",
                introLine: "Este mensaje destaca las siguientes acciones con el mismo sistema visual.",
                summaryLine: "Puedes cambiar secciones sin romper el layout.",
                focusTitle: "Esta semana",
                focusItems: [
                    "Mejorar copy",
                    "Probar CTAs",
                    "Revisar engagement"
                ],
                planTitle: "En progreso",
                planItems: [
                    "Segmentación",
                    "Revisión de variantes",
                    "Ventana de envío"
                ],
                timelineTitle: "Próximos hitos",
                timelineItems: [
                    "Jueves: Reporte",
                    "Viernes: Ajustes",
                    "Lunes: Relanzamiento"
                ],
                calloutTitle: "Mantén consistencia",
                calloutBody: "Un layout estable ayuda a leer rápido y encontrar la acción clave.",
                ctaPrimaryText: "Revisar el plan",
                ctaPrimaryHref: "#",
                ctaSecondaryText: "Ver rendimiento",
                ctaSecondaryHref: "#"
            })
        }
    }
];
