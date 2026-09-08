import type { FolderColors, FolderProject } from "@/components/ui/3d-folder";

export type ProjectStatus = "closed-beta" | "open-source" | "coming-soon";

export interface ProjectFolder {
  id: string;
  title: string;
  categoryLabel: string;
  description: string;
  impact: string;
  tags: string[];
  status: ProjectStatus;
  githubUrl?: string;
  liveUrl?: string;
  folderColors: FolderColors;
  screenshots: FolderProject[];
  screenshotBackground?: string;
}

// ─── Folder data (screenshots reais em /public/screenshots/) ───

export const projectFolders: ProjectFolder[] = [
  {
    id: "job-analyzer",
    title: "Job Analyzer Platform",
    categoryLabel: "Data Engineer & Back-End",
    description:
      "Plataforma automatizada que agrega, normaliza e analisa dados do mercado de trabalho consumindo múltiplas APIs externas, em um ciclo completo de extração a insight, com análise de fit por IA.",
    impact:
      "Extração via múltiplos adaptadores (Gupy, Adzuna, JSearch, Lever BR), análise de compatibilidade currículo-vaga com IA, kanban de candidaturas e busca automática configurável.",
    tags: ["Python", "FastAPI", "Next.js", "React", "PostgreSQL", "SQL"],
    status: "closed-beta",
    folderColors: {
      back: "#0f766e",
      front: "#0d9488",
      tab: "#115e59",
    },
    screenshots: [
      {
        id: "ja-1",
        image: "/screenshots/ja-dashboard.png",
        title: "Dashboard analítico",
      },
      {
        id: "ja-2",
        image: "/screenshots/ja-candidaturas.png",
        title: "Board de candidaturas",
      },
      {
        id: "ja-3",
        image: "/screenshots/ja-fit-ia.png",
        title: "Análise de Fit com IA",
      },
    ],
  },
  {
    id: "sus-flow",
    title: "SUS-Flow",
    categoryLabel: "Full-Stack & Dados de Saúde",
    description:
      "Aplicação web para gestão de filas de pronto-atendimento do SUS, implementando o Protocolo de Manchester de Classificação de Risco. Painel público em tempo real via SSE e portal de triagem assistido por IA (Gemini).",
    impact:
      "Motor de classificação em dois estágios. Rule engine determinístico síncrono + IA como segundo estágio consultivo. Dados sintéticos por cron, sem dados reais de pacientes (LGPD).",
    tags: ["Next.js 14", "Neon PostgreSQL", "Prisma", "Gemini AI", "Tailwind CSS", "Vitest"],
    status: "open-source",
    githubUrl: "https://github.com/YagoCalomino/sus-flow",
    liveUrl: "https://sus-flow.vercel.app/",
    screenshotBackground: "#f8fafc",
    folderColors: {
      back: "#1d4ed8",
      front: "#2563eb",
      tab: "#1e40af",
    },
    screenshots: [
      {
        id: "sf-1",
        image: "/screenshots/sf-painel.png",
        title: "Painel de Filas SUS",
      },
      {
        id: "sf-2",
        image: "/screenshots/sf-triagem.png",
        title: "Portal de Triagem",
      },
      {
        id: "sf-3",
        image: "/screenshots/sf-ia.png",
        title: "Sugestão da IA",
      },
    ],
  },
  {
    id: "healthlens",
    title: "HealthLens",
    categoryLabel: "Analytics & Saúde Pública",
    description:
      "Plataforma de analytics de saúde pública com dados do DataSUS (SIM, SIH, SINAN). Inclui ingestão de dados, forecasting com ML (AutoARIMA e Prophet) e painéis epidemiológicos com mapas coropléticos.",
    impact:
      "Dashboards de Vigilância Epidemiológica com análise de risco por região e predição de tendências de saúde com dados reais do SUS.",
    tags: ["Python", "FastAPI", "React", "PostgreSQL", "AutoARIMA", "Prophet"],
    status: "coming-soon",
    folderColors: {
      back: "#6d28d9",
      front: "#7c3aed",
      tab: "#5b21b6",
    },
    screenshots: [], // sem screenshots ainda
  },
];
