// KUCCPS-Aligned Data and Calculation Engine
// This module contains the core logic for student placement intelligence

export const KCSE_GRADES = ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'E'] as const;
export type KCSEGrade = typeof KCSE_GRADES[number];

export const GRADE_POINTS: Record<KCSEGrade, number> = {
  'A': 12, 'A-': 11, 'B+': 10, 'B': 9, 'B-': 8,
  'C+': 7, 'C': 6, 'C-': 5, 'D+': 4, 'D': 3, 'D-': 2, 'E': 1
};

export const SUBJECTS = {
  compulsory: ['English', 'Kiswahili', 'Mathematics'],
  sciences: ['Biology', 'Physics', 'Chemistry'],
  humanities: ['History', 'Geography', 'CRE', 'IRE', 'HRE'],
  technical: ['Computer Studies', 'Agriculture', 'Home Science', 'Art & Design', 'Aviation Technology'],
  languages: ['French', 'German', 'Arabic', 'Music'],
  business: ['Business Studies', 'Economics'],
} as const;

export const ALL_SUBJECTS = [
  ...SUBJECTS.compulsory,
  ...SUBJECTS.sciences,
  ...SUBJECTS.humanities,
  ...SUBJECTS.technical,
  ...SUBJECTS.languages,
  ...SUBJECTS.business,
];

export interface SubjectGrade {
  subject: string;
  grade: KCSEGrade;
}

export interface StudentProfile {
  grades: SubjectGrade[];
  year: number;
  careerInterests: string[];
  learningPreference: 'theoretical' | 'practical' | 'mixed';
  riskAppetite: 'safe' | 'balanced' | 'competitive';
  sponsorship: 'government' | 'self' | 'undecided';
  institutionType: 'university' | 'tvet' | 'kmtc' | 'any';
}

export const CAREER_CLUSTERS = [
  { id: 'tech', name: 'Technology & Computing', icon: '💻', color: 'teal' },
  { id: 'health', name: 'Health & Medicine', icon: '🏥', color: 'emerald' },
  { id: 'business', name: 'Business & Finance', icon: '📊', color: 'amber' },
  { id: 'education', name: 'Education & Training', icon: '📚', color: 'blue' },
  { id: 'engineering', name: 'Engineering', icon: '⚙️', color: 'slate' },
  { id: 'creative', name: 'Creative Arts & Media', icon: '🎨', color: 'purple' },
  { id: 'agriculture', name: 'Agriculture & Environment', icon: '🌱', color: 'green' },
  { id: 'law', name: 'Law & Governance', icon: '⚖️', color: 'navy' },
  { id: 'aviation', name: 'Aviation & Transport', icon: '✈️', color: 'sky' },
  { id: 'hospitality', name: 'Hospitality & Tourism', icon: '🏨', color: 'orange' },
  { id: 'trades', name: 'Skilled Trades', icon: '🔧', color: 'gray' },
];

export interface Course {
  id: string;
  name: string;
  institution: string;
  institutionType: 'university' | 'tvet' | 'kmtc';
  level: 'degree' | 'diploma' | 'certificate' | 'artisan';
  cluster: string;
  cutoff2024: number;
  cutoff2023: number;
  cutoff2022: number;
  minimumRequirements: {
    subject: string;
    minGrade: KCSEGrade;
  }[];
  clusterSubjects: string[];
  employmentRate: number;
  salaryRange: { min: number; max: number };
  careerPaths: string[];
  description: string;
  sponsored: boolean;
}

// Sample courses database (in production, this would be from a database)
export const COURSES: Course[] = [
  {
    id: 'bsc-cs-uon',
    name: 'Bachelor of Science in Computer Science',
    institution: 'University of Nairobi',
    institutionType: 'university',
    level: 'degree',
    cluster: 'tech',
    cutoff2024: 42.5,
    cutoff2023: 41.8,
    cutoff2022: 40.2,
    minimumRequirements: [
      { subject: 'Mathematics', minGrade: 'B+' },
      { subject: 'English', minGrade: 'C+' },
      { subject: 'Physics', minGrade: 'C+' },
    ],
    clusterSubjects: ['Mathematics', 'Physics', 'Chemistry'],
    employmentRate: 89,
    salaryRange: { min: 60000, max: 250000 },
    careerPaths: ['Software Engineer', 'Data Scientist', 'Systems Analyst', 'IT Consultant'],
    description: 'Comprehensive program covering software development, algorithms, AI, and systems design.',
    sponsored: true,
  },
  {
    id: 'medicine-uon',
    name: 'Bachelor of Medicine and Bachelor of Surgery (MBChB)',
    institution: 'University of Nairobi',
    institutionType: 'university',
    level: 'degree',
    cluster: 'health',
    cutoff2024: 46.8,
    cutoff2023: 46.2,
    cutoff2022: 45.5,
    minimumRequirements: [
      { subject: 'Biology', minGrade: 'A-' },
      { subject: 'Chemistry', minGrade: 'A-' },
      { subject: 'Mathematics', minGrade: 'B+' },
      { subject: 'English', minGrade: 'B' },
    ],
    clusterSubjects: ['Biology', 'Chemistry', 'Physics', 'Mathematics'],
    employmentRate: 98,
    salaryRange: { min: 150000, max: 800000 },
    careerPaths: ['Medical Doctor', 'Surgeon', 'Specialist Physician', 'Medical Researcher'],
    description: 'Premier medical program producing highly skilled healthcare professionals.',
    sponsored: true,
  },
  {
    id: 'bcom-strathmore',
    name: 'Bachelor of Commerce',
    institution: 'Strathmore University',
    institutionType: 'university',
    level: 'degree',
    cluster: 'business',
    cutoff2024: 38.5,
    cutoff2023: 37.9,
    cutoff2022: 36.8,
    minimumRequirements: [
      { subject: 'Mathematics', minGrade: 'B' },
      { subject: 'English', minGrade: 'B' },
    ],
    clusterSubjects: ['Mathematics', 'Business Studies', 'Economics'],
    employmentRate: 85,
    salaryRange: { min: 50000, max: 300000 },
    careerPaths: ['Accountant', 'Financial Analyst', 'Business Consultant', 'Bank Manager'],
    description: 'Comprehensive business education with focus on finance and accounting.',
    sponsored: false,
  },
  {
    id: 'nursing-kmtc',
    name: 'Diploma in Kenya Registered Community Health Nursing',
    institution: 'KMTC Nairobi',
    institutionType: 'kmtc',
    level: 'diploma',
    cluster: 'health',
    cutoff2024: 32.5,
    cutoff2023: 31.8,
    cutoff2022: 30.5,
    minimumRequirements: [
      { subject: 'Biology', minGrade: 'C+' },
      { subject: 'Chemistry', minGrade: 'C' },
      { subject: 'English', minGrade: 'C' },
      { subject: 'Mathematics', minGrade: 'C' },
    ],
    clusterSubjects: ['Biology', 'Chemistry', 'Physics'],
    employmentRate: 95,
    salaryRange: { min: 45000, max: 120000 },
    careerPaths: ['Registered Nurse', 'Community Health Nurse', 'Nursing Officer', 'Healthcare Administrator'],
    description: 'Professional nursing program with clinical training in healthcare facilities.',
    sponsored: true,
  },
  {
    id: 'electrical-tvet',
    name: 'Diploma in Electrical Engineering',
    institution: 'Kenya Coast National Polytechnic',
    institutionType: 'tvet',
    level: 'diploma',
    cluster: 'engineering',
    cutoff2024: 28.0,
    cutoff2023: 27.5,
    cutoff2022: 26.8,
    minimumRequirements: [
      { subject: 'Mathematics', minGrade: 'C' },
      { subject: 'Physics', minGrade: 'C' },
      { subject: 'English', minGrade: 'D+' },
    ],
    clusterSubjects: ['Mathematics', 'Physics', 'Chemistry'],
    employmentRate: 82,
    salaryRange: { min: 35000, max: 100000 },
    careerPaths: ['Electrical Technician', 'Power Systems Engineer', 'Maintenance Engineer'],
    description: 'Practical training in electrical systems, wiring, and power distribution.',
    sponsored: true,
  },
  {
    id: 'actuarial-uon',
    name: 'Bachelor of Science in Actuarial Science',
    institution: 'University of Nairobi',
    institutionType: 'university',
    level: 'degree',
    cluster: 'business',
    cutoff2024: 44.2,
    cutoff2023: 43.5,
    cutoff2022: 42.8,
    minimumRequirements: [
      { subject: 'Mathematics', minGrade: 'A-' },
      { subject: 'English', minGrade: 'B' },
    ],
    clusterSubjects: ['Mathematics', 'Business Studies', 'Economics'],
    employmentRate: 92,
    salaryRange: { min: 80000, max: 500000 },
    careerPaths: ['Actuary', 'Risk Analyst', 'Insurance Consultant', 'Pension Specialist'],
    description: 'Elite program combining mathematics, statistics, and financial theory.',
    sponsored: true,
  },
  {
    id: 'law-uon',
    name: 'Bachelor of Laws (LLB)',
    institution: 'University of Nairobi',
    institutionType: 'university',
    level: 'degree',
    cluster: 'law',
    cutoff2024: 43.5,
    cutoff2023: 42.8,
    cutoff2022: 41.5,
    minimumRequirements: [
      { subject: 'English', minGrade: 'B+' },
      { subject: 'Kiswahili', minGrade: 'B' },
    ],
    clusterSubjects: ['English', 'History', 'CRE'],
    employmentRate: 88,
    salaryRange: { min: 70000, max: 400000 },
    careerPaths: ['Advocate', 'State Counsel', 'Legal Consultant', 'Judge'],
    description: 'Rigorous legal education preparing students for the bar examinations.',
    sponsored: true,
  },
  {
    id: 'architecture-jkuat',
    name: 'Bachelor of Architecture',
    institution: 'JKUAT',
    institutionType: 'university',
    level: 'degree',
    cluster: 'engineering',
    cutoff2024: 40.5,
    cutoff2023: 39.8,
    cutoff2022: 38.5,
    minimumRequirements: [
      { subject: 'Mathematics', minGrade: 'B' },
      { subject: 'Physics', minGrade: 'B' },
      { subject: 'English', minGrade: 'C+' },
    ],
    clusterSubjects: ['Mathematics', 'Physics', 'Art & Design'],
    employmentRate: 78,
    salaryRange: { min: 60000, max: 350000 },
    careerPaths: ['Architect', 'Urban Planner', 'Interior Designer', 'Construction Manager'],
    description: 'Creative and technical program in building design and urban planning.',
    sponsored: true,
  },
  {
    id: 'clinical-medicine-kmtc',
    name: 'Diploma in Clinical Medicine and Surgery',
    institution: 'KMTC Nairobi',
    institutionType: 'kmtc',
    level: 'diploma',
    cluster: 'health',
    cutoff2024: 35.5,
    cutoff2023: 34.8,
    cutoff2022: 33.5,
    minimumRequirements: [
      { subject: 'Biology', minGrade: 'B-' },
      { subject: 'Chemistry', minGrade: 'C+' },
      { subject: 'English', minGrade: 'C+' },
      { subject: 'Mathematics', minGrade: 'C' },
    ],
    clusterSubjects: ['Biology', 'Chemistry', 'Physics'],
    employmentRate: 94,
    salaryRange: { min: 55000, max: 150000 },
    careerPaths: ['Clinical Officer', 'Medical Officer', 'Healthcare Supervisor'],
    description: 'Medical training for clinical officers providing primary healthcare.',
    sponsored: true,
  },
  {
    id: 'hospitality-tvet',
    name: 'Diploma in Food and Beverage Management',
    institution: 'Utalii College',
    institutionType: 'tvet',
    level: 'diploma',
    cluster: 'hospitality',
    cutoff2024: 25.0,
    cutoff2023: 24.5,
    cutoff2022: 23.8,
    minimumRequirements: [
      { subject: 'English', minGrade: 'C' },
      { subject: 'Mathematics', minGrade: 'D+' },
    ],
    clusterSubjects: ['Home Science', 'Business Studies', 'English'],
    employmentRate: 80,
    salaryRange: { min: 30000, max: 120000 },
    careerPaths: ['Hotel Manager', 'Restaurant Manager', 'Events Coordinator', 'Chef'],
    description: 'Industry-focused training in hospitality and food service management.',
    sponsored: true,
  },
];

// Calculate cluster points based on KUCCPS formula
export function calculateClusterPoints(grades: SubjectGrade[], clusterSubjects: string[]): number {
  // Get all subject points
  const subjectPoints = grades.map(g => ({
    subject: g.subject,
    points: GRADE_POINTS[g.grade]
  }));

  // English, Kiswahili, and Mathematics are compulsory
  const compulsorySubjects = ['English', 'Kiswahili', 'Mathematics'];
  let totalPoints = 0;
  let subjectCount = 0;

  // Add compulsory subjects (weighted x1)
  compulsorySubjects.forEach(sub => {
    const found = subjectPoints.find(s => s.subject === sub);
    if (found) {
      totalPoints += found.points;
      subjectCount++;
    }
  });

  // Get cluster subjects (weighted x2 for relevance)
  const relevantSubjects = subjectPoints.filter(s => 
    clusterSubjects.includes(s.subject) && !compulsorySubjects.includes(s.subject)
  );

  // Add top cluster subjects with weight
  relevantSubjects
    .sort((a, b) => b.points - a.points)
    .slice(0, 2)
    .forEach(s => {
      totalPoints += s.points * 1.5; // Weight boost for cluster relevance
      subjectCount++;
    });

  // Add remaining best subjects
  const remainingSubjects = subjectPoints.filter(s => 
    !compulsorySubjects.includes(s.subject) && 
    !relevantSubjects.slice(0, 2).find(r => r.subject === s.subject)
  );

  remainingSubjects
    .sort((a, b) => b.points - a.points)
    .slice(0, 4 - relevantSubjects.slice(0, 2).length)
    .forEach(s => {
      totalPoints += s.points;
      subjectCount++;
    });

  return Math.round(totalPoints * 10) / 10;
}

// Calculate mean grade
export function calculateMeanGrade(grades: SubjectGrade[]): number {
  const totalPoints = grades.reduce((sum, g) => sum + GRADE_POINTS[g.grade], 0);
  return Math.round((totalPoints / grades.length) * 10) / 10;
}

// Check if student meets minimum requirements
export function meetsMinimumRequirements(
  grades: SubjectGrade[], 
  requirements: { subject: string; minGrade: KCSEGrade }[]
): boolean {
  return requirements.every(req => {
    const studentGrade = grades.find(g => g.subject === req.subject);
    if (!studentGrade) return false;
    return GRADE_POINTS[studentGrade.grade] >= GRADE_POINTS[req.minGrade];
  });
}

// Calculate placement probability
export function calculatePlacementProbability(
  studentPoints: number, 
  cutoff: number, 
  trend: 'rising' | 'stable' | 'falling'
): number {
  const difference = studentPoints - cutoff;
  let baseProbability: number;

  if (difference >= 5) baseProbability = 95;
  else if (difference >= 3) baseProbability = 85;
  else if (difference >= 1) baseProbability = 70;
  else if (difference >= 0) baseProbability = 55;
  else if (difference >= -1) baseProbability = 40;
  else if (difference >= -2) baseProbability = 25;
  else if (difference >= -3) baseProbability = 15;
  else baseProbability = 5;

  // Adjust for trend
  if (trend === 'rising') baseProbability -= 5;
  else if (trend === 'falling') baseProbability += 5;

  return Math.min(99, Math.max(1, baseProbability));
}

// Determine cutoff trend
export function getCutoffTrend(c2024: number, c2023: number, c2022: number): 'rising' | 'stable' | 'falling' {
  const avgChange = ((c2024 - c2023) + (c2023 - c2022)) / 2;
  if (avgChange > 0.5) return 'rising';
  if (avgChange < -0.5) return 'falling';
  return 'stable';
}

// Get competitiveness level
export function getCompetitiveness(cutoff: number, level: string): 'low' | 'medium' | 'high' | 'very-high' {
  if (level === 'degree') {
    if (cutoff >= 44) return 'very-high';
    if (cutoff >= 38) return 'high';
    if (cutoff >= 32) return 'medium';
    return 'low';
  }
  if (level === 'diploma') {
    if (cutoff >= 34) return 'very-high';
    if (cutoff >= 28) return 'high';
    if (cutoff >= 22) return 'medium';
    return 'low';
  }
  return 'low';
}

// Format currency in KES
export function formatKES(amount: number): string {
  return `KES ${amount.toLocaleString()}`;
}
