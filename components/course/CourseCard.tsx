/**
 * CourseCard Component
 * Premium card design with depth, animations, and micro-interactions
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import CourseBadges from './CourseBadges';
import type { ProcessedCourse } from '@/types/course';

interface CourseCardProps {
  course: ProcessedCourse;
  onExpand?: (course: ProcessedCourse) => void;
  index?: number;
}

export default function CourseCard({ course, onExpand, index = 0 }: CourseCardProps) {
  const handleCardClick = () => {
    if (onExpand) {
      onExpand(course);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ scale: 1.02, y: -2 }}
      className="group relative"
    >
      {/* Card Container */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-5 h-full flex flex-col border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden min-h-[400px]">
        {/* Border trace effect on hover */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20" style={{ animation: 'shimmer 3s ease-in-out infinite' }} />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Header */}
          <div className="mb-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white line-clamp-2 flex-1 tracking-tight">
                {course.courseName}
              </h3>
              {course.degreeAbbreviation && (
                <Badge variant="default" size="sm" className="flex-shrink-0">
                  {course.degreeAbbreviation}
                </Badge>
              )}
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
              {course.university}
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                📍 {course.city}
              </p>
              {course.admissionMode && (
                <>
                  <span className="text-gray-400 dark:text-gray-600">•</span>
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

          {/* Subject */}
          <div className="mb-4 min-h-[2.5rem]">
            {course.subjectDisplay ? (
              <p className="text-sm text-gray-800 dark:text-gray-200 line-clamp-2">
                <span className="font-medium text-gray-900 dark:text-white">Subject:</span> {course.subjectDisplay}
              </p>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-500 italic">Subject not specified</p>
            )}
          </div>

          {/* Badges */}
          <div className="mb-4 min-h-[2rem]">
            <CourseBadges course={course} />
          </div>

          {/* Intake Months */}
          <div className="mb-4 min-h-[1.5rem]">
            {course.intakeMonths && course.intakeMonths.length > 0 ? (
              <div className="text-xs">
                <span className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium text-gray-800 dark:text-gray-300">Intake Months:</span> {course.intakeMonths.join(', ')}
                </span>
              </div>
            ) : (
              <div className="text-xs text-gray-500 dark:text-gray-500 italic">Intake months not specified</div>
            )}
          </div>

          {/* Spacer */}
          <div className="flex-grow"></div>

          {/* Footer - Clickable section */}
          <motion.div
            whileHover={{ x: 4 }}
            className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 -mx-5 -mb-5 px-5 pb-5 rounded-b-xl transition-all duration-300"
            onClick={handleCardClick}
          >
            <div className="flex items-center justify-center gap-2">
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                Click to view details
              </span>
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
