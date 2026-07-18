export interface JobPosting {
  id: number;
  title: string;
  company: string;
  location: string;
  workMode: 'Remote' | 'Onsite' | 'Hybrid';
  sponsorshipRequired: boolean;
  requiredSkills: string[];
  gpaThreshold: number;
  visaSponsorship: boolean;
  description: string;
}

export class JobsService {
  private jobs: JobPosting[] = [
    {
      id: 1,
      title: 'Frontend Engineer',
      company: 'CredX Labs',
      location: 'Remote',
      workMode: 'Remote',
      sponsorshipRequired: false,
      requiredSkills: ['React', 'TypeScript', 'SQL'],
      gpaThreshold: 3.2,
      visaSponsorship: false,
      description: 'Build intuitive web experiences for a student-focused platform.'
    },
    {
      id: 2,
      title: 'Full Stack Developer',
      company: 'Northstar',
      location: 'New York',
      workMode: 'Hybrid',
      sponsorshipRequired: true,
      requiredSkills: ['React', 'Node.js', 'AWS'],
      gpaThreshold: 3.5,
      visaSponsorship: true,
      description: 'Work across product UI and backend services for AI-driven products.'
    },
    {
      id: 3,
      title: 'Data Analyst Intern',
      company: 'Insight Co',
      location: 'Chicago',
      workMode: 'Onsite',
      sponsorshipRequired: false,
      requiredSkills: ['SQL', 'Python', 'Data Analysis'],
      gpaThreshold: 3.0,
      visaSponsorship: false,
      description: 'Turn customer data into insights for product and marketing teams.'
    },
    {
      id: 4,
      title: 'Backend Engineer',
      company: 'ByteForge',
      location: 'Austin',
      workMode: 'Remote',
      sponsorshipRequired: false,
      requiredSkills: ['Java', 'Spring', 'AWS'],
      gpaThreshold: 3.4,
      visaSponsorship: false,
      description: 'Develop robust distributed services and integrations.'
    }
  ];

  fetchJobs(): JobPosting[] {
    return [...this.jobs];
  }
}
