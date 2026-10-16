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
    'Software developer with experience across the stack, from database to interface. ' +
    'I focus on shipping reliable products, keeping systems simple, and making the details ' +
    'users touch feel considered. Replace this paragraph with a two- or three-sentence pitch ' +
    'that says who you are, what you are good at, and what you want next.',
  location: 'City, Country',
  availability: 'Open to new opportunities',
  experience: [
    {
      role: 'Senior Software Developer',
      company: 'Example Corp',
      location: 'Remote',
      start: '2023-01',
      end: undefined,
      summary: 'Lead developer on a customer-facing product used by thousands of people daily.',
      highlights: [
        'Led the rebuild of the core experience, cutting page load time by 60%.',
        'Designed the API and data model that three teams now build on.',
        'Mentored two junior developers through their first production launches.',
      ],
      tech: ['TypeScript', 'Astro', 'Node.js', 'PostgreSQL'],
    },
    {
      role: 'Software Developer',
      company: 'Another Company',
      location: 'City, Country',
      start: '2021-03',
      end: '2022-12',
      summary: 'Built and maintained features across a multi-tenant SaaS platform.',
      highlights: [
        'Shipped an integration that reduced manual support tickets by 35%.',
        'Introduced end-to-end tests, raising coverage from 20% to 75%.',
      ],
      tech: ['React', 'GraphQL', 'Docker', 'AWS'],
    },
    {
      role: 'Junior Developer',
      company: 'First Job',
      start: '2019-06',
      end: '2021-02',
      highlights: [
        'Delivered internal tools that replaced manual spreadsheet workflows.',
        'Learned to write code for the next reader, not just the next deadline.',
      ],
      tech: ['JavaScript', 'Python', 'SQL'],
    },
  ],
  education: [
    {
      degree: 'B.Sc. in Computer Science',
      school: 'Example University',
      location: 'City, Country',
      start: '2015',
      end: '2019',
      details: ['Focus on distributed systems and human-computer interaction.'],
    },
  ],
  skills: [
    {
      label: 'Languages',
      items: ['TypeScript', 'JavaScript', 'Python', 'SQL', 'Go'],
    },
    {
      label: 'Frontend',
      items: ['Astro', 'React', 'Tailwind CSS', 'HTML & CSS', 'Accessibility'],
    },
    {
      label: 'Backend',
      items: ['Node.js', 'PostgreSQL', 'Redis', 'REST', 'GraphQL'],
    },
    {
      label: 'Tooling',
      items: ['Git', 'Docker', 'CI/CD', 'Linux', 'Vitest'],
    },
  ],
  certifications: [
    {
      name: 'Example Certification',
      issuer: 'Example Issuer',
      year: '2024',
    },
  ],
  languages: [
    { name: 'English', level: 'Fluent' },
    { name: 'Spanish', level: 'Native' },
  ],
};
