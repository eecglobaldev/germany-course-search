/**
 * Constants for the application
 * Based on FRONTEND_IMPLEMENTATION_PLAN.md Section 5.2
 */

// Color Palette
export const colors = {
  primary: '#2563EB',        // Deep Royal Blue
  primaryHover: '#1D4ED8',
  primaryLight: '#DBEAFE',
  secondary: '#475569',      // Slate Grey
  secondaryLight: '#64748B',
  success: '#059669',         // Teal/Emerald
  successLight: '#D1FAE5',
  warning: '#D97706',        // Amber
  warningLight: '#FEF3C7',
  bgPrimary: '#FFFFFF',
  bgSecondary: '#F8FAFC',     // Off-white/Gray
  bgTertiary: '#F1F5F9',
  border: '#E2E8F0',
  borderDark: '#CBD5E1',
  textPrimary: '#0F172A',
  textSecondary: '#475569',
  textMuted: '#94A3B8',
} as const;

// Filter Options
// Only include degree levels that actually exist in the data
export const DEGREE_LEVELS = ['Bachelor', 'Master', 'MBA', 'LLM', 'Other'] as const;
export const DEGREE_TYPES = ['Arts', 'Science', 'Engineering', 'Business', 'Education', 'Laws', 'Other'] as const;
export const STUDY_TYPES = ['Second cycle', 'Undergraduate'] as const;
export const STUDY_MODES = ['full-time', 'international course'] as const;
export const ADMISSION_MODES = ['Open', 'NC Restricted', 'Aptitude Test'] as const;
export const TUITION_MODELS = ['all', 'free', 'paid'] as const;

// Months for intake filter
export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
] as const;

// Intake seasons mapping
export const INTAKE_SEASONS = {
  winter: ['September', 'October'],
  summer: ['March', 'April'],
} as const;

// Sort options
export const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'name', label: 'Course Name (A-Z)' },
  { value: 'university', label: 'University (A-Z)' },
  { value: 'city', label: 'City (A-Z)' },
  { value: 'duration', label: 'Duration' },
  { value: 'tuition', label: 'Tuition' },
] as const;

// Pagination
export const ITEMS_PER_PAGE_OPTIONS = [10, 20, 50, 100] as const;
export const DEFAULT_ITEMS_PER_PAGE = 20;

// Search
export const SEARCH_DEBOUNCE_MS = 300;

// Subject categories (will be populated from keywords file)
export const SUBJECT_CATEGORIES = [
  'Engineering',
  'IT / Computer Science',
  'Business / Economics',
  'Natural Sciences',
  'Social Sciences',
  'Humanities',
  'Arts / Design',
  'Medicine / Health',
  'Law',
  'Education',
  'General / Interdisciplinary',
] as const;

// English exam score options
// IELTS: Only 5.0 and above (4.0 and 4.5 removed per user request)
export const IELTS_SCORES = [5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0] as const;
// TOEFL IBT: 50 to 120, increments of 10
export const TOEFL_IBT_SCORES: readonly number[] = [50, 60, 70, 80, 90, 100, 110, 120];
// TOEFL PBT: 400 to 700, increments of 10
export const TOEFL_PBT_SCORES: readonly number[] = [
  400, 410, 420, 430, 440, 450, 460, 470, 480, 490, 500,
  510, 520, 530, 540, 550, 560, 570, 580, 590, 600,
  610, 620, 630, 640, 650, 660, 670, 680, 690, 700
];
// TOEFL CBT: 150 to 300, increments of 10
export const TOEFL_CBT_SCORES: readonly number[] = [
  150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250, 260, 270, 280, 290, 300
];
// TOEIC: 200 to 1000, increments of 50
export const TOEIC_SCORES: readonly number[] = [
  200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000
];
// Grade options based on actual data (German grading: 1.0 = best, 3.0 = minimum passing)
export const GRADE_OPTIONS = [1.0, 1.5, 1.7, 1.8, 1.9, 2.0, 2.2, 2.3, 2.5, 2.6, 2.7, 2.8, 2.9, 3.0] as const;

