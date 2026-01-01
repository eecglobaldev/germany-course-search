/**
 * CourseCard Component
 * Displays a single course in card format
 */

import React from 'react';
import Badge from '@/components/ui/Badge';
import CourseBadges from './CourseBadges';
import type { ProcessedCourse } from '@/types/course';

interface CourseCardProps {
  course: ProcessedCourse;
  onExpand?: (course: ProcessedCourse) => void;
}

export default function CourseCard({ course, onExpand }: CourseCardProps) {
  const handleCardClick = () => {
    if (onExpand) {
      onExpand(course);
    }
  };

  return (
    <div 
      className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-lg transition-all duration-200 flex flex-col h-full"
    >
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 flex-1">
            {course.courseName}
          </h3>
          {course.degreeAbbreviation && (
            <Badge variant="default" size="sm" className="flex-shrink-0">
              {course.degreeAbbreviation}
            </Badge>
          )}
        </div>
        <p className="text-sm text-gray-600 mb-2">
          {course.university}
        </p>
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-500">
            📍 {course.city}
          </p>
          {course.admissionMode && (
            <>
              <span className="text-gray-300">•</span>
              {course.admissionMode === 'Open' && (
                <Badge variant="success" size="sm">Open Admission</Badge>
              )}
              {course.admissionMode === 'NC Restricted' && (
                <Badge variant="warning" size="sm">NC Restricted</Badge>
              )}
              {course.admissionMode === 'Aptitude Test' && (
                <Badge variant="default" size="sm">Aptitude Test</Badge>
              )}
            </>
          )}
        </div>
      </div>

      {/* Subject - Always show with consistent height */}
      <div className="mb-4 min-h-[2.5rem]">
        {course.subjectDisplay ? (
          <p className="text-sm text-gray-700 line-clamp-2">
            <span className="font-medium">Subject:</span> {course.subjectDisplay}
          </p>
        ) : (
          <p className="text-sm text-gray-400 italic">Subject not specified</p>
        )}
      </div>

      {/* Badges - Always show with consistent min-height */}
      <div className="mb-4 min-h-[2rem]">
        <CourseBadges course={course} />
      </div>

      {/* Intake Months - Always show with consistent height */}
      <div className="mb-4 min-h-[1.5rem]">
        {course.intakeMonths && course.intakeMonths.length > 0 ? (
          <div className="text-xs">
            <span className="text-gray-600">
              <span className="font-medium text-gray-700">Intake Months:</span> {course.intakeMonths.join(', ')}
            </span>
          </div>
        ) : (
          <div className="text-xs text-gray-400 italic">Intake months not specified</div>
        )}
      </div>

      {/* Spacer to push footer to bottom */}
      <div className="flex-grow"></div>

      {/* Footer - Clickable section */}
      <div 
        className="mt-auto pt-4 border-t border-gray-200 cursor-pointer hover:bg-gray-50 -mx-5 -mb-5 px-5 pb-5 rounded-b-lg transition-colors group"
        onClick={handleCardClick}
      >
        <div className="flex items-center justify-center gap-2">
          <span className="text-sm font-medium text-blue-600 group-hover:text-blue-700 transition-colors">
            Click to view details
          </span>
          <svg 
            className="h-4 w-4 text-blue-600 group-hover:text-blue-700 transition-colors" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}

