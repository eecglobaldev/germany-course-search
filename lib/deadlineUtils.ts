/**
 * Utility functions for parsing and checking deadline status
 */

export type DeadlineStatus = 'passed' | 'not_passed' | 'no_deadline';

export interface DeadlineInfo {
  status: DeadlineStatus;
  deadline?: string; // Original deadline string
}

/**
 * Parse a deadline string and determine if it has passed
 * Handles various formats:
 * - Date ranges: "01.09.2025 — 15.01.2026"
 * - Single dates: "15.01.2026"
 * - "expired" text: "The deadline for the Winter Semester 2025/2026 has expired"
 * - No deadline: "Informationen beim International Office", "Bei Hochschule erfragen", etc.
 */
export function parseDeadline(deadline: string | null | undefined): DeadlineInfo {
  if (!deadline || !deadline.trim()) {
    return { status: 'no_deadline' };
  }

  const cleanDeadline = deadline
    .replace(/^Bewerbungsfrist Nicht-EU-Ausländer;\s*/i, '')
    .trim();

  // Check if deadline has expired (explicitly stated)
  if (/expired|abgelaufen|vergangen/i.test(cleanDeadline)) {
    return { status: 'passed', deadline: cleanDeadline };
  }

  // Check if it's a "no deadline" case (contact for info, etc.)
  const noDeadlinePatterns = [
    /informationen beim/i,
    /bei hochschule erfragen/i,
    /contact/i,
    /informationen zum/i,
    /information/i,
    /erfragen/i,
  ];
  
  if (noDeadlinePatterns.some(pattern => pattern.test(cleanDeadline))) {
    return { status: 'no_deadline', deadline: cleanDeadline };
  }

  // Try to extract date range: "01.09.2025 — 15.01.2026" or "01.09.2025 - 15.01.2026"
  const dateRangeMatch = cleanDeadline.match(/(\d{1,2})\.(\d{1,2})\.(\d{4})\s*[—–-]\s*(\d{1,2})\.(\d{1,2})\.(\d{4})/);
  if (dateRangeMatch) {
    const [, day1, month1, year1, day2, month2, year2] = dateRangeMatch;
    // Use the end date (second date) to check if deadline has passed
    const endDate = new Date(parseInt(year2), parseInt(month2) - 1, parseInt(day2));
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (endDate < today) {
      return { status: 'passed', deadline: cleanDeadline };
    } else {
      return { status: 'not_passed', deadline: cleanDeadline };
    }
  }

  // Try to extract single date: "15.01.2026"
  const singleDateMatch = cleanDeadline.match(/(\d{1,2})\.(\d{1,2})\.(\d{4})/);
  if (singleDateMatch) {
    const [, day, month, year] = singleDateMatch;
    const deadlineDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (deadlineDate < today) {
      return { status: 'passed', deadline: cleanDeadline };
    } else {
      return { status: 'not_passed', deadline: cleanDeadline };
    }
  }

  // If we can't parse a date, assume no deadline
  return { status: 'no_deadline', deadline: cleanDeadline };
}

/**
 * Get deadline status for a specific semester
 */
export function getSemesterDeadlineStatus(
  deadlineWinter: string | null | undefined,
  deadlineSummer: string | null | undefined,
  semester: 'winter' | 'summer'
): DeadlineInfo {
  if (semester === 'winter') {
    return parseDeadline(deadlineWinter);
  } else {
    return parseDeadline(deadlineSummer);
  }
}

/**
 * Get band priority for sorting
 * Lower number = higher priority (shown first)
 * Order: Green (1), Yellow (2), Purple (3), Black+Green (4), Black+Yellow (5), Black+Purple (6), Red (7)
 */
export function getBandPriority(
  deadlineStatus: DeadlineStatus,
  admissionMode: string
): number {
  if (deadlineStatus === 'passed') {
    return 7; // Red band - lowest priority
  } else if (deadlineStatus === 'no_deadline') {
    // Half black + half color bands
    if (admissionMode === 'Open') {
      return 4; // Black + Green
    } else if (admissionMode === 'NC Restricted') {
      return 5; // Black + Yellow
    } else if (admissionMode === 'Aptitude Test') {
      return 6; // Black + Purple
    }
  } else if (deadlineStatus === 'not_passed') {
    // Solid color bands
    if (admissionMode === 'Open') {
      return 1; // Green - highest priority
    } else if (admissionMode === 'NC Restricted') {
      return 2; // Yellow
    } else if (admissionMode === 'Aptitude Test') {
      return 3; // Purple
    }
  }
  
  // Fallback for unknown cases
  return 8;
}
