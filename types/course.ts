/**
 * TypeScript types for Course data
 * Based on FRONTEND_IMPLEMENTATION_PLAN.md Section 3.3
 */

export type DegreeLevel = 'Bachelor' | 'Master' | 'MBA' | 'LLM' | 'PhD' | 'Other';
export type DegreeType = 'Arts' | 'Science' | 'Engineering' | 'Business' | 'Education' | 'Laws' | 'Other';
export type StudyType = 'Second cycle' | 'Undergraduate' | 'Mixed';
export type AdmissionMode = 'Open' | 'NC Restricted' | 'Aptitude Test';
export type TuitionModel = 'free' | 'paid' | 'unknown';
export type TuitionPeriod = 'semester' | 'year' | 'total';
export type IntakeSeason = 'winter' | 'summer' | 'all' | 'unknown';

export interface ProcessedCourse {
  // Core fields
  id: string;
  courseName: string;
  university: string;
  detailPageUrl: string;
  
  // Location
  city: string;
  cities?: string[];
  locationDisplay: string;
  
  // Degree
  degree: string; // Original
  degreeLevel: DegreeLevel;
  degreeType: DegreeType;
  degreeAbbreviation?: string;
  
  // Study details
  studyType: StudyType;
  durationSemesters: number;
  durationYears: number;
  durationDisplay: string;
  
  // Study mode
  studyModes: string[];
  isInternational: boolean;
  isPartTime: boolean;
  isDualSystem: boolean;
  
  // Subject
  subject: string; // Original
  broadCategories: string[];
  subjectKeywords: string[];
  subjectDisplay: string;
  areasOfConcentration?: string;
  
  // Admission
  admissionMode: AdmissionMode;
  admissionRestricted: boolean;
  minGrade?: number; // Minimum grade requirement (1.0-3.0, German grading system)
  
  // Intake
  intakeMonths: string[];
  intakeSeason: IntakeSeason;
  intakeDates?: string[];
  
  // Tuition
  tuitionModel: TuitionModel;
  tuitionAmountApprox?: number;
  tuitionPeriod?: TuitionPeriod;
  tuitionNote?: string;
  
  // Language requirements
  minIelts?: number;
  minToeflIbt?: number;
  minToeflPbt?: number;
  minToeflCbt?: number;
  minToeic?: number;
  cefrLevel?: string; // B2, C1, etc. (from GER)
  cambridgeCert?: string; // FCE, CAE, CPE, etc.
  otherTests?: string[]; // Other mentioned tests without scores
  acceptsMoi?: boolean; // Medium of Instruction certificate accepted
  languageRequirementsText?: string;
  
  // Deadlines
  deadlineWinter?: string;
  deadlineSummer?: string;
  deadlineDisplay?: string;
  
  // Additional info
  mainInstructionLanguage: string;
  digitalTeaching?: string;
  internationalDoubleDiploma?: boolean;
  furtherLanguages?: string[];
  annotation?: string;
  
  // Raw fields (for detail view)
  rawData?: {
    beginningStudents?: string;
    accessRequirements?: string;
    completionRequirements?: string;
    practicalExperience?: string;
    furtherRequirements?: string;
    duration?: string;
    targetGroup?: string;
    applicationDeadlineAptitudeTest?: string;
    applicationDeadlineBeginningStudents?: string;
    applicationDeadlineSelectionProcess?: string;
  };
}

