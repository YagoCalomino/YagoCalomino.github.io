import type { LocalizedString } from "@/i18n/types";

export type CourseCategory = "data" | "dev" | "methodology" | "cloud";

export type Course = {
  title: LocalizedString;
  issuer: string;
  issued: string;
  category: CourseCategory;
  credentialUrl?: string;
  description: LocalizedString;
  hours?: number;
};

export const COURSES: Course[] = [
  {
    title: {
      pt: "Power BI, do Básico ao Avançado",
      en: "Power BI, from Basics to Advanced",
      es: "Power BI, de lo Básico a lo Avanzado",
    },
    issuer: "Udemy",
    issued: "2023",
    category: "data",
    description: {
      pt: "Modelagem de dados, linguagem DAX, dashboards interativos, boas práticas de visualização e publicação de relatórios.",
      en: "Data modeling, DAX language, interactive dashboards, visualization best practices, and report publishing.",
      es: "Modelado de datos, lenguaje DAX, dashboards interactivos, buenas prácticas de visualización y publicación de informes.",
    },
  },
  {
    title: {
      pt: "SQL, Banco de Dados Relacionais",
      en: "SQL, Relational Databases",
      es: "SQL, Bases de Datos Relacionales",
    },
    issuer: "Alura",
    issued: "2022",
    category: "data",
    description: {
      pt: "DDL e DML avançado, consultas otimizadas, modelagem relacional, procedures e triggers.",
      en: "Advanced DDL and DML, optimized queries, relational modeling, procedures and triggers.",
      es: "DDL y DML avanzado, consultas optimizadas, modelado relacional, procedimientos y triggers.",
    },
  },
  {
    title: {
      pt: "Python para Análise de Dados",
      en: "Python for Data Analysis",
      es: "Python para Análisis de Datos",
    },
    issuer: "Data Science Academy",
    issued: "2023",
    category: "data",
    description: {
      pt: "NumPy, Pandas, Matplotlib, análise exploratória de dados, estatística aplicada e visualização avançada.",
      en: "NumPy, Pandas, Matplotlib, exploratory data analysis, applied statistics, and advanced visualization.",
      es: "NumPy, Pandas, Matplotlib, análisis exploratorio de datos, estadística aplicada y visualización avanzada.",
    },
  },
  {
    title: {
      pt: "FastAPI, APIs Modernas com Python",
      en: "FastAPI, Modern APIs with Python",
      es: "FastAPI, APIs Modernas con Python",
    },
    issuer: "Udemy",
    issued: "2024",
    category: "dev",
    description: {
      pt: "Criação de APIs RESTful, autenticação JWT, documentação automática com OpenAPI, integração com bancos de dados e deploy.",
      en: "Building RESTful APIs, JWT authentication, automatic OpenAPI documentation, database integration, and deployment.",
      es: "Creación de APIs RESTful, autenticación JWT, documentación automática con OpenAPI, integración con bases de datos y despliegue.",
    },
  },
  {
    title: {
      pt: "Lean Six Sigma, Yellow Belt",
      en: "Lean Six Sigma, Yellow Belt",
      es: "Lean Six Sigma, Yellow Belt",
    },
    issuer: "FM2S",
    issued: "2023",
    category: "methodology",
    description: {
      pt: "Metodologia DMAIC, análise de causa raiz, controle de qualidade, ferramentas de redução de desperdícios e mapeamento de processos.",
      en: "DMAIC methodology, root cause analysis, quality control, waste reduction tools, and process mapping.",
      es: "Metodología DMAIC, análisis de causa raíz, control de calidad, herramientas de reducción de desperdicios y mapeo de procesos.",
    },
  },
  {
    title: {
      pt: "Desenvolvimento Web Full Stack",
      en: "Full-Stack Web Development",
      es: "Desarrollo Web Full Stack",
    },
    issuer: "Trybe",
    issued: "2023",
    category: "dev",
    hours: 1500,
    description: {
      pt: "Fundamentos web, React, Node.js, bancos de dados relacionais e não-relacionais, ciência da computação e metodologias ágeis.",
      en: "Web fundamentals, React, Node.js, relational and non-relational databases, computer science, and agile methodologies.",
      es: "Fundamentos web, React, Node.js, bases de datos relacionales y no relacionales, ciencias de la computación y metodologías ágiles.",
    },
  },
];
