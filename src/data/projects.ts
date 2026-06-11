import type { LocalizedString } from "@/i18n/types";

export type Project = {
  title: string;
  role: string;
  description: LocalizedString;
  focus: LocalizedString;
  stack: string[];
  images?: string[];
  links: {
    live?: string;
    github?: string;
  };
};

export const PROJECTS: Project[] = [
  {
    title: "SUS-Flow",
    role: "Full-Stack & Data",
    description: {
      pt: "Sistema híbrido de gestão de filas em saúde com IA Generativa para triagem automatizada de pacientes com base em protocolos clínicos.",
      en: "A hybrid healthcare queue management system utilizing Generative AI for automated patient triage based on clinical protocols.",
      es: "Sistema híbrido de gestión de colas en salud con IA Generativa para triaje automatizado de pacientes basado en protocolos clínicos.",
    },
    focus: {
      pt: "Construído com arquitetura resiliente para fluxos operacionais. Demonstra modelagem de dados complexa para o setor de saúde e visualização de dashboards em tempo real.",
      en: "Built with a resilient architecture to handle operational workflows. Demonstrates complex data modeling for the healthcare sector and real-time dashboard visualization.",
      es: "Construido con arquitectura resiliente para flujos operacionales. Demuestra modelado de datos complejo para el sector salud y visualización de dashboards en tiempo real.",
    },
    stack: ["Next.js", "React", "Tailwind CSS", "PostgreSQL", "Gemini AI"],
    images: [],
    links: {
      live: "https://sus-flow.vercel.app",
      github: undefined,
    },
  },
  {
    title: "Job Analyzer Platform",
    role: "Data Engineer & Back-End",
    description: {
      pt: "Plataforma automatizada que agrega, normaliza e analisa dados do mercado de trabalho consumindo múltiplas APIs externas.",
      en: "An automated platform that aggregates, normalizes, and analyzes job market data by consuming multiple external APIs.",
      es: "Plataforma automatizada que agrega, normaliza y analiza datos del mercado laboral consumiendo múltiples APIs externas.",
    },
    focus: {
      pt: "Demonstra extração robusta de dados, integração de APIs e capacidade de estruturar dados dispersos em insights acionáveis para o usuário final.",
      en: "Demonstrates robust data extraction, API integration, and the ability to structure messy, disparate data into actionable insights for the end user.",
      es: "Demuestra extracción robusta de datos, integración de APIs y capacidad de estructurar datos dispersos en insights accionables para el usuario final.",
    },
    stack: ["Python", "FastAPI", "Next.js", "React", "SQL"],
    images: [],
    links: {
      live: undefined,
      github: undefined,
    },
  },
];
