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
      pt: "Atuação consultiva com SQL para extração e manipulação de bases de dados complexas. Construção de relatórios e painéis visuais para monitoramento de KPIs da operação, apoiando a liderança na identificação de gargalos. Interface direta entre o time técnico e as áreas de negócio, traduzindo métricas operacionais em planos de ação de curto prazo.",
      en: "Consultative work with SQL for extracting and manipulating complex databases. Built visual reports and dashboards to monitor operational KPIs, supporting leadership in identifying bottlenecks. Direct interface between the technical team and business areas, translating operational metrics into short-term action plans.",
      es: "Actuación consultiva con SQL para la extracción y manipulación de bases de datos complejas. Construcción de informes y paneles visuales para el monitoreo de KPIs de la operación, apoyando al liderazgo en la identificación de cuellos de botella. Interfaz directa entre el equipo técnico y las áreas de negocio, traduciendo métricas operativas en planes de acción a corto plazo.",
    },
    stack: ["Python", "R", "Excel", "Power BI", "SQL"],
    achievements: [
      {
        pt: "Destaque de Performance, Top Metas e Entrega (Out 2021): reconhecimento recebido no primeiro mês de atuação por atingir o topo das metas de produtividade.",
        en: "Performance Highlight, Top Goals & Delivery (Oct 2021): recognition received in the first month on the job for reaching the top of productivity targets.",
        es: "Destaque de Desempeño, Top Metas y Entrega (Oct 2021): reconocimiento recibido en el primer mes de actuación por alcanzar el tope de las metas de productividad.",
      },
      {
        pt: "Melhor Solução e Resolução de Problemas (2022): premiado pelo desenvolvimento e implementação da melhor solução técnica para um problema complexo de negócio.",
        en: "Best Solution & Problem Solving (2022): awarded for developing and implementing the best technical solution to a complex business problem.",
        es: "Mejor Solución y Resolución de Problemas (2022): premiado por el desarrollo e implementación de la mejor solución técnica para un problema complejo de negocio.",
      },
    ],
    accentColor: "#0d9488",
  },
];
