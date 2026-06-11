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
  focus: LocalizedString;
  stack: string[];
};

export const EXPERIENCES: Experience[] = [
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
    focus: {
      pt: "Análise de mercado, KPIs e estruturação de dados. Construção de relatórios e dashboards para apoio à decisão estratégica.",
      en: "Market analysis, KPIs, and data structuring. Built reports and dashboards to support strategic decision-making.",
      es: "Análisis de mercado, KPIs y estructuración de datos. Construcción de informes y dashboards para apoyo a la decisión estratégica.",
    },
    stack: ["Python", "R", "Excel", "Power BI"],
  },
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
    focus: {
      pt: "Sustentação de bancos PostgreSQL e Oracle, análise de causa raiz (RCA), automação de processos e construção de dashboards estratégicos.",
      en: "PostgreSQL and Oracle database maintenance, root cause analysis (RCA), process automation, and strategic dashboard development.",
      es: "Mantenimiento de bases de datos PostgreSQL y Oracle, análisis de causa raíz (RCA), automatización de procesos y construcción de dashboards estratégicos.",
    },
    stack: ["PostgreSQL", "Oracle", "Power BI", "Python"],
  },
];
