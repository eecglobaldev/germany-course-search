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
import DeadlineBand from './DeadlineBand';
import type { ProcessedCourse } from '@/types/course';

interface CourseCardProps {
  course: ProcessedCourse;
  onExpand?: (course: ProcessedCourse) => void;
  index?: number;
  selectedSemester: 'winter' | 'summer';
}

export default function CourseCard({ course, onExpand, index = 0, selectedSemester }: CourseCardProps) {
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
      <div className="bg-[var(--bg-card)] rounded-2xl p-6 h-full flex flex-col border border-[var(--border-color)] hover:border-purple-300/50 dark:hover:border-purple-500/30 shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden min-h-[400px] group/card">
        {/* Deadline Band */}
        <DeadlineBand course={course} selectedSemester={selectedSemester} />
        {/* Gradient background on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/0 via-blue-50/0 to-pink-50/0 group-hover/card:from-purple-50/50 group-hover/card:via-blue-50/30 group-hover/card:to-pink-50/50 dark:group-hover/card:from-purple-900/10 dark:group-hover/card:via-blue-900/10 dark:group-hover/card:to-pink-900/10 transition-all duration-500 rounded-2xl"></div>

        {/* Animated border gradient */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-pink-500/20 blur-xl"></div>
          <div className="absolute inset-[1px] rounded-2xl bg-[var(--bg-card)]"></div>
        </div>

        {/* Shine effect */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent -translate-x-full group-hover/card:translate-x-full transition-transform duration-1000"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Header */}
          <div className="mb-4">
            <div className="flex items-start justify-between gap-2 mb-3">
              <h3 className="font-bold text-lg text-[var(--text-primary)] line-clamp-2 flex-1 tracking-tight group-hover/card:text-transparent group-hover/card:bg-gradient-to-r group-hover/card:from-purple-600 group-hover/card:to-blue-600 dark:group-hover/card:from-purple-400 dark:group-hover/card:to-blue-400 group-hover/card:bg-clip-text transition-all duration-300">
                {course.courseName}
              </h3>
              {course.degreeAbbreviation && (
                <Badge variant="default" size="sm" className="flex-shrink-0 shadow-sm">
                  {course.degreeAbbreviation}
                </Badge>
              )}
            </div>
            <p className="text-sm font-medium text-[var(--text-secondary)] mb-2 flex items-center gap-1.5">
              <span className="text-purple-500">🎓</span>
              {course.university}
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-sm text-[var(--text-secondary)] flex items-center gap-1">
                <span className="text-blue-500">📍</span>
                <span className="font-medium">{course.city}</span>
              </p>
              {course.admissionMode && (
                <>
                  <span className="text-[var(--text-muted)]">•</span>
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
              <p className="text-sm text-[var(--text-secondary)] line-clamp-2">
                <span className="font-medium text-[var(--text-primary)]">Subject:</span> {course.subjectDisplay}
              </p>
            ) : (
              <p className="text-sm text-[var(--text-muted)] italic">Subject not specified</p>
            )}
          </div>

          {/* Badges */}
          <div className="mb-4 min-h-[2rem]">
            <CourseBadges course={course} />
          </div>

          {/* Intake Semester */}
          <div className="mb-4 min-h-[1.5rem]">
            {(() => {
              // Check if both winter and summer deadlines exist
              const hasBothSeasons = course.deadlineWinter && course.deadlineSummer;
              // Check intake season
              const intakeSeason = course.intakeSeason;
              
              if (hasBothSeasons || intakeSeason === 'all') {
                return (
                  <div className="text-xs">
                    <span className="text-[var(--text-secondary)]">
                      <span className="font-medium text-[var(--text-primary)]">Intake Semester:</span> Winter & Summer
                    </span>
                  </div>
                );
              } else if (intakeSeason === 'winter' || course.deadlineWinter) {
                return (
                  <div className="text-xs">
                    <span className="text-[var(--text-secondary)]">
                      <span className="font-medium text-[var(--text-primary)]">Intake Semester:</span> Winter
                    </span>
                  </div>
                );
              } else if (intakeSeason === 'summer' || course.deadlineSummer) {
                return (
                  <div className="text-xs">
                    <span className="text-[var(--text-secondary)]">
                      <span className="font-medium text-[var(--text-primary)]">Intake Semester:</span> Summer
                    </span>
                  </div>
                );
              } else {
                return (
                  <div className="text-xs text-[var(--text-muted)] italic">Intake semester not specified</div>
                );
              }
            })()}
          </div>

          {/* Spacer */}
          <div className="flex-grow"></div>

          {/* Footer - Clickable section */}
          <motion.div
            whileHover={{ x: 4 }}
            className="mt-auto pt-4 border-t border-[var(--border-color)] cursor-pointer hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-blue-50/50 dark:hover:from-purple-900/20 dark:hover:to-blue-900/20 -mx-6 -mb-6 px-6 pb-6 rounded-b-2xl transition-all duration-300 group/button"
            onClick={handleCardClick}
          >
            <div className="flex items-center justify-center gap-2">
              <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent group-hover/button:from-purple-700 group-hover/button:to-blue-700 dark:group-hover/button:from-purple-300 dark:group-hover/button:to-blue-300 transition-all duration-300">
                View Details
              </span>
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-500 dark:to-blue-500 p-1.5 rounded-full"
              >
                <ArrowRight className="h-3.5 w-3.5 text-white" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
