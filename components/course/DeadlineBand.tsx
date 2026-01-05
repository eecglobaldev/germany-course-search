/**
 * Deadline Band Component
 * Shows colored band on top of course cards based on deadline status and admission mode
 */

'use client';

import React from 'react';
import { getSemesterDeadlineStatus, type DeadlineStatus } from '@/lib/deadlineUtils';
import type { ProcessedCourse } from '@/types/course';

interface DeadlineBandProps {
  course: ProcessedCourse;
  selectedSemester: 'winter' | 'summer';
}

export default function DeadlineBand({ course, selectedSemester }: DeadlineBandProps) {
  const deadlineInfo = getSemesterDeadlineStatus(
    course.deadlineWinter,
    course.deadlineSummer,
    selectedSemester
  );

  const status = deadlineInfo.status;
  const admissionMode = course.admissionMode;

  // Determine band color based on status and admission mode
  let bandColor = '';
  let bandStyle: React.CSSProperties = {};

  if (status === 'passed') {
    // Deadline passed: red band (regardless of admission mode)
    bandColor = 'bg-red-500';
  } else if (status === 'no_deadline') {
    // No deadline: half black + half color based on admission mode
    if (admissionMode === 'Open') {
      bandStyle = {
        background: 'linear-gradient(to right, #000000 50%, #22c55e 50%)',
      };
    } else if (admissionMode === 'NC Restricted') {
      bandStyle = {
        background: 'linear-gradient(to right, #000000 50%, #eab308 50%)',
      };
    } else if (admissionMode === 'Aptitude Test') {
      bandStyle = {
        background: 'linear-gradient(to right, #000000 50%, #a855f7 50%)',
      };
    } else {
      bandColor = 'bg-gray-500';
    }
  } else if (status === 'not_passed') {
    // Deadline not passed: color based on admission mode
    if (admissionMode === 'Open') {
      bandColor = 'bg-green-500';
    } else if (admissionMode === 'NC Restricted') {
      bandColor = 'bg-yellow-500';
    } else if (admissionMode === 'Aptitude Test') {
      bandColor = 'bg-purple-500';
    } else {
      bandColor = 'bg-gray-500';
    }
  } else {
    // Fallback
    bandColor = 'bg-gray-500';
  }

  return (
    <div
      className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl ${bandColor}`}
      style={bandStyle}
      aria-label={`Deadline status: ${status}, Admission: ${admissionMode}`}
    />
  );
}
