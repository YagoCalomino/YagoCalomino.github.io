export type Locale = "pt" | "en" | "es";

export type LocalizedString = { pt: string; en: string; es: string };

export type Dictionary = {
  nav: {
    about: string;
    experience: string;
    skills: string;
    courses: string;
    projects: string;
    contact: string;
  };
  hero: {
    eyebrow: string;
    badge_data: string;
    badge_dev: string;
    value_prop: string;
    cta_work: string;
    cta_resume: string;
    scroll: string;
    stat_exp: string;
    stat_exp_label: string;
    stat_projects: string;
    stat_projects_label: string;
    stat_belt: string;
    stat_belt_label: string;
  };
  about: {
    section_label: string;
    heading: string;
    p1: string;
    p2: string;
    p3: string;
    highlight_lean: string;
    highlight_rca: string;
    highlight_db: string;
    highlight_bi: string;
    highlight_api: string;
    highlight_frontend: string;
    tl_start_year: string;
    tl_start: string;
    tl_mid: string;
    tl_now: string;
    photo_soon: string;
  };
  skills: {
    section_label: string;
    heading: string;
    subheading: string;
    group_bi: string;
    group_sql: string;
    group_process: string;
    group_dev: string;
    primary_badge: string;
    tools_label: string;
  };
  courses: {
    section_label: string;
    heading: string;
    subtitle: string;
    issued_label: string;
    view_cert: string;
    cat_data: string;
    cat_dev: string;
    cat_methodology: string;
    cat_cloud: string;
  };
  projects: {
    section_label: string;
    heading: string;
    subtitle: string;
    folder_hint: string;
  };
  experience: {
    section_label: string;
    heading: string;
    subheading: string;
    label_current: string;
    label_focus: string;
    label_progression: string;
    label_stack: string;
  };
  contact: {
    section_label: string;
    heading_1: string;
    heading_accent: string;
    body: string;
    cta_resume: string;
    cta_email: string;
    cta_github: string;
    cta_linkedin: string;
  };
  footer: {
    copy: string;
  };
};
