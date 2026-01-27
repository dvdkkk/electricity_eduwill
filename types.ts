export interface CurriculumItem {
  category: string;
  subjects: string[];
}

export interface Course {
  id: string;
  title: string;
  subTitle: string;
  description: string;
  duration: string;
  schedule: string;
  classTime: string;
  capacity: string;
  locations: string;
  curriculum: CurriculumItem[];
  type: 'technician' | 'engineer'; // technician: 기능사, engineer: 기사/산업기사
  image?: string;
  video?: string;
}

export interface EmploymentStatus {
  company: string;
  name: string;
  branch: string;
  license: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}