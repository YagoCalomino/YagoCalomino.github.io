import type { LocalizedString } from "@/i18n/types";

export type ExperienceRole = {
  title: LocalizedString;
  period: LocalizedString;
  current?: boolean;
};

export type Experience = {
  id: string;
  company: string;
  period: LocalizedString;
  roles: ExperienceRole[];
  summary: LocalizedString;
  focus?: LocalizedString;
  stack: string[];
  accentColor: string;
  achievements?: LocalizedString[];
  internNote?: LocalizedString;
};

export const EXPERIENCES: Experience[] = [
  {
    id: "medilab",
    company: "MediLab Sistemas",
    period: {
      pt: "Jul 2024 – Presente",
      en: "Jul 2024 – Present",
      es: "Jul 2024 – Presente",
    },
    roles: [
      {
        title: {
          pt: "Estagiário de Treinamento e Dados",
          en: "Training and Data Intern",
          es: "Pasante de Capacitación y Datos",
        },
        period: {
          pt: "Jul 2024 – Nov 2025",
          en: "Jul 2024 – Nov 2025",
          es: "Jul 2024 – Nov 2025",
        },
      },
      {
        title: {
          pt: "Process & Business Technical",
          en: "Process & Business Technical",
          es: "Process & Business Technical",
        },
        period: {
          pt: "Nov 2025 – Presente",
          en: "Nov 2025 – Present",
          es: "Nov 2025 – Presente",
        },
        current: true,
      },
    ],
    summary: {
      pt: "Engenharia de dados e BI em ambiente HealthTech regulado (PACS/RIS), com pipelines ETL em Python, otimização de SQL em PostgreSQL/Oracle e dashboards Power BI para indicadores clínicos e financeiros em tempo real.",
      en: "Data engineering and BI in a regulated HealthTech environment (PACS/RIS), with ETL pipelines in Python, SQL optimization in PostgreSQL/Oracle, and Power BI dashboards for real-time clinical and financial indicators.",
      es: "Ingeniería de datos y BI en un entorno HealthTech regulado (PACS/RIS), con pipelines ETL en Python, optimización de SQL en PostgreSQL/Oracle y dashboards Power BI para indicadores clínicos y financieros en tiempo real.",
    },
    achievements: [
      {
        pt: "Pipelines ETL: automação em Python (Pandas) para ingestão e modelagem dimensional de exames de imagem, eliminando gargalos manuais do fluxo operacional.",
        en: "ETL Pipelines: Python (Pandas) automation for ingesting and dimensionally modeling imaging exam data, eliminating manual bottlenecks in the operational flow.",
        es: "Pipelines ETL: automatización en Python (Pandas) para la ingesta y el modelado dimensional de exámenes de imagen, eliminando cuellos de botella manuales del flujo operativo.",
      },
      {
        pt: "SQL Avançado: tuning e otimização de queries e procedures complexas em PostgreSQL e Oracle, com redução de 50% no tempo de resposta de relatórios críticos.",
        en: "Advanced SQL: tuning and optimization of complex queries and procedures in PostgreSQL and Oracle, with a 50% reduction in response time for critical reports.",
        es: "SQL Avanzado: tuning y optimización de queries y procedimientos complejos en PostgreSQL y Oracle, con una reducción del 50% en el tiempo de respuesta de informes críticos.",
      },
      {
        pt: "BI: dashboards em Power BI com DAX avançado e Power Query centralizando indicadores clínicos e financeiros, eliminando 100% das planilhas manuais semanais.",
        en: "BI: Power BI dashboards with advanced DAX and Power Query centralizing clinical and financial indicators, eliminating 100% of weekly manual spreadsheets.",
        es: "BI: dashboards en Power BI con DAX avanzado y Power Query centralizando indicadores clínicos y financieros, eliminando el 100% de las planillas manuales semanales.",
      },
    ],
    internNote: {
      pt: "Como Estagiário (Jul 2024 – Nov 2025): administração PostgreSQL, extração e análise de dados de faturamento, e desenvolvimento de materiais de treinamento baseados em análise de uso do sistema.",
      en: "As an Intern (Jul 2024 – Nov 2025): PostgreSQL administration, billing data extraction and analysis, and development of training materials based on system usage analysis.",
      es: "Como Pasante (Jul 2024 – Nov 2025): administración de PostgreSQL, extracción y análisis de datos de facturación, y desarrollo de materiales de capacitación basados en el análisis de uso del sistema.",
    },
    stack: ["PostgreSQL", "Oracle", "Power BI", "Python", "Power Automate", "DAX"],
    accentColor: "#2563eb",
  },
  {
    id: "stone",
    company: "Stone Co.",
    period: {
      pt: "Out 2021 – Dez 2022",
      en: "Oct 2021 – Dec 2022",
      es: "Oct 2021 – Dic 2022",
    },
    roles: [
      {
        title: {
          pt: "Analista de Negócios 1",
          en: "Business Analyst 1",
          es: "Analista de Negocios 1",
        },
        period: { pt: "Out 2021", en: "Oct 2021", es: "Oct 2021" },
      },
      {
        title: {
          pt: "Analista de Negócios 2",
          en: "Business Analyst 2",
          es: "Analista de Negocios 2",
        },
        period: { pt: "", en: "", es: "" },
      },
      {
        title: {
          pt: "Analista de Negócios 3",
          en: "Business Analyst 3",
          es: "Analista de Negocios 3",
        },
        period: { pt: "Dez 2022", en: "Dec 2022", es: "Dic 2022" },
      },
    ],
    summary: {
      pt: "Análise de dados operacionais e financeiros da carteira de clientes via SQL, com construção de relatórios e painéis para monitoramento de KPIs e identificação de gargalos de atendimento e eficiência logística.",
      en: "Operational and financial data analysis of the client portfolio via SQL, building reports and dashboards to monitor KPIs and identify service and logistics-efficiency bottlenecks.",
      es: "Análisis de datos operativos y financieros de la cartera de clientes vía SQL, con construcción de informes y paneles para monitoreo de KPIs e identificación de cuellos de botella de atención y eficiencia logística.",
    },
    focus: {
      pt: "Atuação consultiva com SQL para extração e análise de dados operacionais e financeiros da carteira de clientes. Construção de painéis de KPIs para monitoramento da operação. No segundo mês, foi designado para função interna específica antes do prazo padrão de quatro meses, por desempenho consistente acima das metas. Identificou um problema sistêmico de integração entre plataformas via análise de volume e padrão de chamados de suporte, construiu gráficos de acompanhamento, validou com outros times e liderou a correção junto ao time de desenvolvimento.",
      en: "Consultative work with SQL for extracting and analyzing operational and financial data from the client portfolio. Built KPI dashboards to monitor the operation. In the second month, was assigned to a specific internal role ahead of the standard four-month timeline, due to consistent performance above targets. Identified a systemic integration issue between platforms through analysis of support ticket volume and patterns, built tracking charts, validated findings with other teams, and led the fix alongside the development team.",
      es: "Actuación consultiva con SQL para la extracción y análisis de datos operativos y financieros de la cartera de clientes. Construcción de paneles de KPIs para el monitoreo de la operación. En el segundo mes, fue designado a una función interna específica antes del plazo estándar de cuatro meses, por desempeño consistente por encima de las metas. Identificó un problema sistémico de integración entre plataformas mediante el análisis de volumen y patrón de tickets de soporte, construyó gráficos de seguimiento, validó con otros equipos y lideró la corrección junto al equipo de desarrollo.",
    },
    stack: ["Python", "R", "Excel", "Power BI", "SQL"],
    achievements: [
      {
        pt: "Destaque de Performance no primeiro mês, melhor entrega do distrito.",
        en: "Performance Highlight in the first month, best delivery in the district.",
        es: "Destaque de Desempeño en el primer mes, mejor entrega del distrito.",
      },
      {
        pt: "Promovido para função interna específica em 2 meses, com prazo padrão de 4 meses.",
        en: "Promoted to a specific internal role in 2 months, against a standard 4-month timeline.",
        es: "Promovido a una función interna específica en 2 meses, con un plazo estándar de 4 meses.",
      },
      {
        pt: "Reconhecimento em reunião geral por identificar e liderar correção de problema sistêmico via análise de dados de suporte.",
        en: "Recognized in an all-hands meeting for identifying and leading the fix of a systemic issue through support data analysis.",
        es: "Reconocimiento en reunión general por identificar y liderar la corrección de un problema sistémico mediante análisis de datos de soporte.",
      },
    ],
    accentColor: "#0d9488",
  },
];
