export interface ResumeExperience {
  role: string;
  company: string;
  companyUrl?: string;
  location?: string;
  start: string;
  end?: string;
  summary?: string;
  highlights: string[];
  tech?: string[];
}

export interface ResumeEducation {
  degree: string;
  school: string;
  schoolUrl?: string;
  location?: string;
  start: string;
  end?: string;
  details?: string[];
}

export interface ResumeSkillGroup {
  label: string;
  items: string[];
}

export interface ResumeCertification {
  name: string;
  issuer?: string;
  year?: string;
}

export interface ResumeLanguage {
  name: string;
  level: string;
}

export interface Resume {
  summary: string;
  location: string;
  availability: string;
  experience: ResumeExperience[];
  education: ResumeEducation[];
  skills: ResumeSkillGroup[];
  certifications: ResumeCertification[];
  languages: ResumeLanguage[];
}

export const resume: Resume = {
  summary:
    'Full-stack software engineer with 2+ years building scalable products, focused on fintech ' +
    'and modern software architecture. I work mainly in Python (FastAPI) and React, deploy on ' +
    'AWS with Terraform and GitHub Actions, and bring AI/LLM-assisted workflows into day-to-day ' +
    'engineering. I care about clean, well-documented code and mentoring the people around me.',
  location: 'Málaga, Spain',
  availability: 'Open to work',
  experience: [
    {
      role: 'Engineer I',
      company: 'Ebury',
      companyUrl: 'https://www.ebury.com/',
      location: 'Málaga, Spain',
      start: '2025-06',
      end: undefined,
      summary:
        'Own features end to end on a fintech platform, from architecture through deployment.',
      highlights: [
        'Delivered the company-wide web rebranding, migrating legacy frontends to a React architecture that improved page load speeds by 35% and lifted SEO metrics.',
        'Owned full feature lifecycles: architectural decisions, high-throughput FastAPI APIs, and deployments on AWS via Terraform and GitHub Actions.',
        'Pioneered agentic coding practices and AI-driven workflows across the team, accelerating feature delivery by 20% while keeping code reliability high.',
        'Mentored junior engineers and ran technical onboarding, setting code review standards and sharing practices in clean code and software architecture.',
        'Worked across engineering teams to standardize API designs and reusable components, breaking down silos and improving cross-team velocity.',
      ],
      tech: ['Python', 'FastAPI', 'React', 'AWS', 'Terraform', 'GitHub Actions'],
    },
    {
      role: 'Associate Engineer',
      company: 'Ebury',
      companyUrl: 'https://www.ebury.com/',
      location: 'Málaga, Spain',
      start: '2024-06',
      end: '2025-06',
      summary: 'Co-built a greenfield product from scratch, from system design to production.',
      highlights: [
        'Co-engineered a greenfield project end to end, contributing to the planning, design, and implementation of the system architecture.',
        'Developed scalable microservices and high-performance REST APIs with FastAPI, handling backend logic and data processing.',
        'Built dynamic frontend features with Next.js, optimizing client-side performance and user experience.',
        'Kept the codebase robust with comprehensive unit tests and automated testing workflows.',
      ],
      tech: ['Python', 'FastAPI', 'Next.js', 'PostgreSQL'],
    },
    {
      role: 'Junior Developer (Internship)',
      company: 'Bartolomé Consultores',
      location: 'Fuengirola, Spain',
      start: '2024-03',
      end: '2024-05',
      highlights: [
        'Migrated a core internal application from PHP to a modern Angular architecture, improving frontend performance and maintainability.',
        'Designed and developed RESTful APIs for efficient data communication between systems.',
        'Redesigned complex user interfaces, improving UX and adding new platform functionality.',
      ],
      tech: ['Angular', 'PHP', 'REST APIs'],
    },
  ],
  education: [
    {
      degree: 'Associate Degree in Development of Web Applications',
      school: 'IES Vega de Mijas',
      location: 'Mijas, Spain',
      start: '2022',
      end: '2024',
      details: ['Level 5 on the European Qualifications Framework (EQF).'],
    },
  ],
  skills: [
    {
      label: 'Programming Languages',
      items: ['Python', 'JavaScript', 'TypeScript', 'Java', 'SQL', 'PHP'],
    },
    {
      label: 'Backend',
      items: ['FastAPI', 'Spring Boot', 'RESTful APIs', 'Microservices'],
    },
    {
      label: 'Frontend',
      items: ['React', 'Next.js', 'Astro', 'Angular'],
    },
    {
      label: 'Cloud & DevOps',
      items: ['AWS', 'Terraform', 'Docker', 'GitHub Actions'],
    },
    {
      label: 'AI & Methodologies',
      items: ['AI-Assisted Development', 'LLM Integration', 'Agile (Scrum/Kanban)', 'SOLID'],
    },
  ],
  certifications: [],
  languages: [
    { name: 'Spanish', level: 'Native' },
    { name: 'English', level: 'B2 – Professional Working Proficiency' },
  ],
};
