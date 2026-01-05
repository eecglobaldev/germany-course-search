/**
 * CourseDetailModal Component
 * Displays all course information in a modal/popup
 */

'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar, Clock, GraduationCap, DollarSign, FileText } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import { renderTextWithLinks } from '@/lib/textUtils';
import type { ProcessedCourse } from '@/types/course';

interface CourseDetailModalProps {
  course: ProcessedCourse | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CourseDetailModal({ course, isOpen, onClose }: CourseDetailModalProps) {
  // Handle Escape key press
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && course && (
        <div className="fixed inset-0 z-[100] overflow-y-auto">
          {/* Backdrop - uses semantic bg-glass for consistency */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-md z-[100]"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="flex min-h-full items-start justify-center pt-24 px-4 pb-4 relative z-[101]">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ 
                type: "spring",
                damping: 25,
                stiffness: 300,
                duration: 0.3
              }}
              className="relative bg-[var(--bg-modal)] rounded-2xl shadow-2xl max-w-4xl w-full max-h-[calc(100vh-8rem)] overflow-y-auto border border-[var(--border-color)]"
            >
          {/* Gradient border effect - Optional premium touch */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-pink-500/20 opacity-0 hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>

          {/* Header */}
          <div className="sticky top-0 bg-[var(--bg-modal)] border-b border-[var(--border-color)] px-4 py-3 flex items-start justify-between z-10">
            <div className="flex-1">
              <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent mb-2">
                {course.courseName}
              </h2>
              <div className="flex items-center gap-3 text-xs text-[var(--text-secondary)]">
                <div className="flex items-center gap-1">
                  <GraduationCap className="h-3.5 w-3.5" />
                  {course.university}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {course.city}
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="ml-3 text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="px-4 py-3 space-y-5">
            {/* Admission Mode - Prominent Display */}
            {course.admissionMode && (
              <section className="bg-[var(--bg-card)] rounded-lg p-4 border border-[var(--border-color)]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[var(--text-secondary)] mb-1">Admission Mode</p>
                    <p className="text-base text-[var(--text-primary)]">
                      {course.admissionMode === 'Open' && 'Open Admission - No restrictions'}
                      {course.admissionMode === 'NC Restricted' && 'NC Restricted - Numerus Clausus (limited places)'}
                      {course.admissionMode === 'Aptitude Test' && 'Aptitude Test Required'}
                    </p>
                  </div>
                  <div>
                    {course.admissionMode === 'Open' && (
                      <Badge variant="success" size="md">Open Admission</Badge>
                    )}
                    {course.admissionMode === 'NC Restricted' && (
                      <Badge variant="warning" size="md">NC Restricted</Badge>
                    )}
                    {course.admissionMode === 'Aptitude Test' && (
                      <Badge variant="default" size="md">Aptitude Test Required</Badge>
                    )}
                  </div>
                </div>
              </section>
            )}

            {/* Degree Information */}
            <section>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Degree Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-[var(--text-secondary)] mb-1">Degree Level</p>
                  <p className="font-semibold text-[var(--text-primary)]">{course.degreeLevel || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-sm text-[var(--text-secondary)] mb-1">Degree Type</p>
                  <p className="font-semibold text-[var(--text-primary)]">{course.degreeType || 'Not specified'}</p>
                </div>
                {course.degreeAbbreviation ? (
                  <div>
                    <p className="text-sm text-[var(--text-secondary)] mb-1">Abbreviation</p>
                    <Badge variant="default" size="sm">{course.degreeAbbreviation}</Badge>
                  </div>
                ) : null}
                <div>
                  <p className="text-sm text-[var(--text-secondary)] mb-1">Study Type</p>
                  <p className="font-semibold text-[var(--text-primary)]">
                    {course.studyType 
                      ? (course.studyType === 'Second cycle' ? 'Masters' : 
                         course.studyType === 'Undergraduate' ? 'Bachelors' : 
                         course.studyType)
                      : 'Not specified'}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-[var(--text-secondary)] mb-1">Full Degree Name</p>
                  <p className="text-[var(--text-primary)]">{course.degree || 'Not specified'}</p>
                </div>
              </div>
            </section>

            {/* Subject & Categories */}
            <section>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3">Subject & Categories</h3>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-[var(--text-secondary)] mb-1">Subject</p>
                  <p className="text-[var(--text-primary)]">{course.subjectDisplay || course.subject || 'Not specified'}</p>
                </div>
                {course.broadCategories && course.broadCategories.length > 0 ? (
                  <div>
                    <p className="text-sm text-[var(--text-secondary)] mb-2">Categories</p>
                    <div className="flex flex-wrap gap-2">
                      {course.broadCategories.map((cat, idx) => (
                        <Badge key={idx} variant="info" size="sm">{cat}</Badge>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-[var(--text-secondary)] mb-1">Categories</p>
                    <p className="text-[var(--text-muted)] text-sm">Not categorized</p>
                  </div>
                )}
                {course.areasOfConcentration && (
                  <div>
                    <p className="text-sm text-[var(--text-secondary)] mb-1">Areas of Concentration</p>
                    <p className="text-[var(--text-primary)]">{course.areasOfConcentration}</p>
                  </div>
                )}
              </div>
            </section>

            {/* Duration & Study Mode */}
            <section>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Duration & Study Mode
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {(course.rawData?.duration || course.durationDisplay) && (
                  <div>
                    <p className="text-sm text-[var(--text-secondary)] mb-1">Duration</p>
                    <p className="font-semibold text-[var(--text-primary)]">
                      {course.rawData?.duration || course.durationDisplay}
                    </p>
                  </div>
                )}
                {course.studyModes && course.studyModes.length > 0 && (() => {
                  // Filter out 'part-time' and 'dual system', and map 'international course' to custom text
                  const filteredModes = course.studyModes
                    .filter(mode => mode !== 'part-time' && mode !== 'dual system')
                    .map(mode => mode === 'international course' ? 'Highly preferred for international students' : mode);
                  
                  return filteredModes.length > 0 ? (
                    <div>
                      <p className="text-sm text-[var(--text-secondary)] mb-1">Study Modes</p>
                      <div className="flex flex-wrap gap-2">
                        {filteredModes.map((mode, idx) => (
                          <Badge key={idx} variant="gray" size="sm">{mode}</Badge>
                        ))}
                      </div>
                    </div>
                  ) : null;
                })()}
              </div>
            </section>

            {/* Tuition Information */}
            {(course.tuitionModel && course.tuitionModel !== 'unknown') || course.tuitionNote ? (
              <section>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Tuition Information
                </h3>
                <div className="space-y-2">
                  {course.tuitionModel && course.tuitionModel !== 'unknown' && (
                    <div>
                      {course.tuitionModel === 'free' && (
                        <Badge variant="success" size="sm">Free</Badge>
                      )}
                      {course.tuitionModel === 'paid' && course.tuitionAmountApprox && (
                        <p className="text-base font-semibold text-[var(--text-primary)]">
                          €{course.tuitionAmountApprox.toLocaleString()}/year
                          {course.tuitionPeriod && ` (per ${course.tuitionPeriod})`}
                        </p>
                      )}
                      {course.tuitionModel === 'paid' && !course.tuitionAmountApprox && (
                        <p className="text-base font-semibold text-[var(--text-primary)]">Paid (amount not specified)</p>
                      )}
                    </div>
                  )}
                  {course.tuitionNote && (
                    <div>
                      <p className="text-sm text-[var(--text-secondary)] mb-1">Note</p>
                      <p className="text-[var(--text-primary)] text-sm">{course.tuitionNote}</p>
                    </div>
                  )}
                </div>
              </section>
            ) : null}

            {/* Admission Requirements */}
            <section>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3">Admission Requirements</h3>
              <div className="space-y-3">
                {course.admissionMode && (
                  <div>
                    <p className="text-sm text-[var(--text-secondary)] mb-1">Admission Mode</p>
                    {course.admissionMode === 'Open' && (
                      <Badge variant="success" size="sm">Open Admission</Badge>
                    )}
                    {course.admissionMode === 'NC Restricted' && (
                      <Badge variant="warning" size="sm">NC Restricted</Badge>
                    )}
                    {course.admissionMode === 'Aptitude Test' && (
                      <Badge variant="default" size="sm">Aptitude Test Required</Badge>
                    )}
                  </div>
                )}
                {course.minGrade && (
                  <div>
                    <p className="text-sm text-[var(--text-secondary)] mb-1">Minimum Grade Requirement</p>
                    <p className="text-base font-semibold text-[var(--text-primary)]">{course.minGrade} (German grading system)</p>
                    <p className="text-xs text-[var(--text-muted)] mt-1">Note: Lower is better (1.0 = excellent, 3.0 = minimum passing)</p>
                  </div>
                )}
                {course.rawData?.accessRequirements && (
                  <div>
                    <p className="text-sm text-[var(--text-secondary)] mb-1">Access and Admission Requirements</p>
                    <ul className="list-disc list-inside space-y-1 marker:text-yellow-500 dark:marker:text-yellow-400">
                      {course.rawData.accessRequirements
                        .split(';')
                        .map((req: string) => req.trim())
                        .filter((req: string) => req.length > 0)
                        .map((req: string, idx: number) => (
                          <li key={idx} className="text-[var(--text-primary)] text-sm">
                            {renderTextWithLinks(req)}
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
                {course.rawData?.completionRequirements && (
                  <div>
                    <p className="text-sm text-[var(--text-secondary)] mb-1">Completion of first university degree</p>
                    <ul className="list-disc list-inside space-y-1 marker:text-yellow-500 dark:marker:text-yellow-400">
                      {course.rawData.completionRequirements
                        .split(';')
                        .map((req: string) => req.trim())
                        .filter((req: string) => req.length > 0)
                        .map((req: string, idx: number) => (
                          <li key={idx} className="text-[var(--text-primary)] text-sm">
                            {renderTextWithLinks(req)}
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
                {course.rawData?.practicalExperience && (
                  <div>
                    <p className="text-sm text-[var(--text-secondary)] mb-1">Required practical experience</p>
                    <ul className="list-disc list-inside space-y-1 marker:text-yellow-500 dark:marker:text-yellow-400">
                      {course.rawData.practicalExperience
                        .split(';')
                        .map((req: string) => req.trim())
                        .filter((req: string) => req.length > 0)
                        .map((req: string, idx: number) => (
                          <li key={idx} className="text-[var(--text-primary)] text-sm">
                            {renderTextWithLinks(req)}
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
                {course.rawData?.furtherRequirements && (
                  <div>
                    <p className="text-sm text-[var(--text-secondary)] mb-1">Further admission requirements</p>
                    <p className="text-[var(--text-primary)] text-sm whitespace-pre-wrap">
                      {renderTextWithLinks(course.rawData.furtherRequirements)}
                    </p>
                  </div>
                )}
                {course.rawData?.applicationDeadlineAptitudeTest && (
                  <div>
                    <p className="text-sm text-[var(--text-secondary)] mb-1">Application Deadline for Aptitude Test</p>
                    <p className="text-[var(--text-primary)] text-sm">
                      {renderTextWithLinks(course.rawData.applicationDeadlineAptitudeTest)}
                    </p>
                  </div>
                )}
                {course.rawData?.applicationDeadlineBeginningStudents && (
                  <div>
                    <p className="text-sm text-[var(--text-secondary)] mb-1">Application Deadline for Beginning Students</p>
                    <p className="text-[var(--text-primary)] text-sm">
                      {renderTextWithLinks(course.rawData.applicationDeadlineBeginningStudents)}
                    </p>
                  </div>
                )}
                {course.rawData?.applicationDeadlineSelectionProcess && (
                  <div>
                    <p className="text-sm text-[var(--text-secondary)] mb-1">Application Deadline for Selection Process</p>
                    <p className="text-[var(--text-primary)] text-sm">
                      {renderTextWithLinks(course.rawData.applicationDeadlineSelectionProcess)}
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* Intake Information */}
            {(course.intakeSeason && course.intakeSeason !== 'unknown') ||
              (course.intakeMonths && course.intakeMonths.length > 0) ||
              course.deadlineWinter ||
              course.deadlineSummer ||
              course.rawData?.beginningStudents ? (
              <section>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Intake Information
                </h3>
                <div className="space-y-3">
                  {/* Intake Season - show both if both deadlines are present */}
                  {(course.intakeSeason && course.intakeSeason !== 'unknown') || (course.deadlineWinter && course.deadlineSummer) ? (
                    <div>
                      <p className="text-sm text-[var(--text-secondary)] mb-1">Intake Season</p>
                      <p className="font-semibold text-[var(--text-primary)] capitalize">
                        {course.deadlineWinter && course.deadlineSummer 
                          ? 'Winter & Summer'
                          : course.intakeSeason === 'all'
                          ? 'All Seasons'
                          : course.intakeSeason}
                      </p>
                    </div>
                  ) : null}
                  {course.deadlineWinter && (
                    <div>
                      <p className="text-sm text-[var(--text-secondary)] mb-1">Winter Deadline</p>
                      <p className="font-semibold text-[var(--text-primary)]">
                        {course.deadlineWinter.replace(/^Bewerbungsfrist Nicht-EU-Ausländer;\s*/i, '').trim()}
                      </p>
                    </div>
                  )}
                  {course.deadlineSummer && (
                    <div>
                      <p className="text-sm text-[var(--text-secondary)] mb-1">Summer Deadline</p>
                      <p className="font-semibold text-[var(--text-primary)]">
                        {course.deadlineSummer.replace(/^Bewerbungsfrist Nicht-EU-Ausländer;\s*/i, '').trim()}
                      </p>
                    </div>
                  )}
                  {course.rawData?.beginningStudents && (
                    <div>
                      <p className="text-sm text-[var(--text-secondary)] mb-1">Beginning Students</p>
                      <p className="text-[var(--text-primary)] text-sm whitespace-pre-wrap">
                        {renderTextWithLinks(course.rawData.beginningStudents.replace(/\s*\(GERMAN\)\s*/gi, '').trim())}
                      </p>
                    </div>
                  )}
                </div>
              </section>
            ) : null}

            {/* Additional Information */}
            {(course.annotation || course.rawData?.targetGroup || course.digitalTeaching || course.internationalDoubleDiploma ||
              (course.furtherLanguages && course.furtherLanguages.length > 0)) ? (
              <section>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Additional Information
                </h3>
                <div className="space-y-2">
                  {course.rawData?.targetGroup && (
                    <div>
                      <p className="text-sm text-[var(--text-secondary)] mb-1">Target group</p>
                      <p className="text-[var(--text-primary)] text-sm">
                        {renderTextWithLinks(course.rawData.targetGroup)}
                      </p>
                    </div>
                  )}
                  {course.annotation && (
                    <div>
                      <p className="text-sm text-[var(--text-secondary)] mb-1">Annotation of the Higher Education Institution</p>
                      <p className="text-[var(--text-primary)] text-sm">
                        {renderTextWithLinks(course.annotation)}
                      </p>
                    </div>
                  )}
                  {course.digitalTeaching && (
                    <div>
                      <p className="text-sm text-[var(--text-secondary)] mb-1">Digital Teaching</p>
                      <p className="text-[var(--text-primary)] text-sm">{course.digitalTeaching}</p>
                    </div>
                  )}
                  {course.internationalDoubleDiploma && (
                    <div>
                      <p className="text-sm text-[var(--text-secondary)] mb-1">International Double Diploma</p>
                      <Badge variant="success" size="sm">Available</Badge>
                    </div>
                  )}
                  {course.furtherLanguages && course.furtherLanguages.length > 0 && (
                    <div>
                      <p className="text-sm text-[var(--text-secondary)] mb-1">Further Languages</p>
                      <div className="flex flex-wrap gap-2">
                        {course.furtherLanguages.map((lang, idx) => (
                          <Badge key={idx} variant="info" size="sm">{lang}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </section>
            ) : null}

          </div>

            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
