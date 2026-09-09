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
      "Plataforma que resolve o problema de acompanhar centenas de vagas em múltiplas fontes manualmente. Agrega, normaliza e pontua vagas de 7 plataformas (Gupy, Adzuna, JSearch, Lever BR e outras), com análise de fit currículo-vaga por IA e gestão de candidaturas em kanban.",
    impact:
      "A decisão central foi construir adaptadores independentes por fonte, com normalização antes do scoring. Isso permite adicionar novas plataformas sem reescrever a lógica de análise. Em uso próprio, triagem de relevância que antes levava horas passou a segundos.",
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
      "Sistema que digitaliza a triagem de pronto-atendimento do SUS com o Protocolo de Manchester. Dois públicos: cidadãos veem filas em tempo real via painel público e enfermeiros classificam pacientes com suporte de IA.",
    impact:
      "A decisão arquitetural principal foi separar a classificação em dois estágios: rule engine determinístico síncrono como base, e IA (Gemini) acionada só quando a confiança do engine é baixa. Velocidade sem abrir mão de precisão em casos ambíguos. Toda sugestão da IA é consultiva e o enfermeiro sempre confirma antes de salvar.",
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
      "Plataforma de analytics de saúde pública que transforma os dados brutos do DataSUS (SIM, SIH, SINAN) em painéis interpretáveis para vigilância epidemiológica. O DataSUS tem um dos maiores volumes de dados de saúde da América Latina, com poucas interfaces que permitam explorá-los de forma acessível.",
    impact:
      "Arquitetura de ingestão incremental por fonte, forecasting com AutoARIMA e Prophet para tendências temporais, e dashboards coropléticos de risco por município. Em desenvolvimento ativo. A complexidade está na normalização de dados de origens heterogêneas antes de qualquer visualização.",
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
