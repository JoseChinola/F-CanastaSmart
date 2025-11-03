export const USER_LEVELS = [
    {
        id: 1,
        name: "Explorador",
        emoji: "🧭",
        minPoints: 0,
        maxPoints: 49,
        color: "#4B9CD3",
        description:
            "Recién empiezas tu camino aportando información valiosa a la comunidad.",
        rewards: [
            "Acceso básico a las funciones de reporte.",
            "Visibilidad en el ranking inicial.",
        ],
    },
    {
        id: 2,
        name: "Colaborador",
        emoji: "🤝",
        minPoints: 50,
        maxPoints: 99,
        color: "#2ECC71",
        description: "Has demostrado compromiso con tus aportes constantes.",
        rewards: [
            "Desbloqueas estadísticas personales.",
            "Obtienes insignia de Colaborador 🤝.",
        ],
    },
    {
        id: 3,
        name: "Experto",
        emoji: "🦉",
        minPoints: 100,
        maxPoints: 199,
        color: "#F1C40F",
        description:
            "Eres una fuente confiable para otros usuarios y tus reportes son altamente valorados.",
        rewards: [
            "Prioridad en la verificación de reportes.",
            "Acceso a funciones de revisión avanzada.",
            "Insignia de Experto 🦉.",
        ],
    },
    {
        id: 4,
        name: "Maestro",
        emoji: "🏆",
        minPoints: 200,
        maxPoints: 499,
        color: "#E67E22",
        description:
            "Tu dedicación te ha convertido en un referente dentro de la comunidad.",
        rewards: [
            "Reconocimiento público en el top de usuarios.",
            "Acceso anticipado a nuevas funciones.",
            "Insignia de Maestro 🏆.",
        ],
    },
    {
        id: 5,
        name: "Leyenda",
        emoji: "👑",
        minPoints: 500,
        maxPoints: Infinity,
        color: "#9B59B6",
        description:
            "Has alcanzado el máximo nivel de prestigio en la comunidad.",
        rewards: [
            "Invitaciones exclusivas a eventos o betas.",
            "Título permanente de Leyenda 👑.",
            "Bonos de puntos adicionales cada mes.",
        ],
    },
];
