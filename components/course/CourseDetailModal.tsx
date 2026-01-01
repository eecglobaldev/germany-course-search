/**
 * CourseDetailModal Component
 * Displays all course information in a modal/popup
 */

'use client';

import React from 'react';
import { X, ExternalLink, MapPin, Calendar, Clock, GraduationCap, DollarSign, FileText } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import type { ProcessedCourse } from '@/types/course';

interface CourseDetailModalProps {
  course: ProcessedCourse | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CourseDetailModal({ course, isOpen, onClose }: CourseDetailModalProps) {
  if (!isOpen || !course) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {course.courseName}
              </h2>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <GraduationCap className="h-4 w-4" />
                  {course.university}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {course.city}
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="ml-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-4 space-y-6">
            {/* Admission Mode - Prominent Display */}
            {course.admissionMode && (
              <section className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Admission Mode</p>
                    <p className="text-base text-gray-900">
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
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Degree Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Degree Level</p>
                  <p className="font-semibold text-gray-900">{course.degreeLevel || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Degree Type</p>
                  <p className="font-semibold text-gray-900">{course.degreeType || 'Not specified'}</p>
                </div>
                {course.degreeAbbreviation ? (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Abbreviation</p>
                    <Badge variant="default" size="sm">{course.degreeAbbreviation}</Badge>
                  </div>
                ) : null}
                <div>
                  <p className="text-sm text-gray-600 mb-1">Study Type</p>
                  <p className="font-semibold text-gray-900">{course.studyType || 'Not specified'}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-600 mb-1">Full Degree Name</p>
                  <p className="text-gray-900">{course.degree || 'Not specified'}</p>
                </div>
              </div>
            </section>

            {/* Subject & Categories */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Subject & Categories</h3>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Subject</p>
                  <p className="text-gray-900">{course.subjectDisplay || course.subject || 'Not specified'}</p>
                </div>
                {course.broadCategories && course.broadCategories.length > 0 ? (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Categories</p>
                    <div className="flex flex-wrap gap-2">
                      {course.broadCategories.map((cat, idx) => (
                        <Badge key={idx} variant="info" size="sm">{cat}</Badge>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Categories</p>
                    <p className="text-gray-500 text-sm">Not categorized</p>
                  </div>
                )}
                {course.areasOfConcentration && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Areas of Concentration</p>
                    <p className="text-gray-900">{course.areasOfConcentration}</p>
                  </div>
                )}
              </div>
            </section>

            {/* Duration & Study Mode */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Duration & Study Mode
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {course.durationDisplay && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Duration</p>
                    <p className="font-semibold text-gray-900">
                      {course.durationDisplay}
                      {course.durationYears && ` (${course.durationYears} years)`}
                    </p>
                  </div>
                )}
                {course.studyModes && course.studyModes.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Study Modes</p>
                    <div className="flex flex-wrap gap-2">
                      {course.studyModes.map((mode, idx) => (
                        <Badge key={idx} variant="gray" size="sm">{mode}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                {course.isInternational && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">International</p>
                    <Badge variant="success" size="sm">Yes</Badge>
                  </div>
                )}
                {course.isPartTime && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Part-Time Available</p>
                    <Badge variant="info" size="sm">Yes</Badge>
                  </div>
                )}
              </div>
            </section>

            {/* Tuition Information */}
            {(course.tuitionModel && course.tuitionModel !== 'unknown') || course.tuitionNote ? (
              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Tuition Information
                </h3>
                <div className="space-y-2">
                  {course.tuitionModel && course.tuitionModel !== 'unknown' && (
                    <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                      <p className="text-sm font-medium text-gray-700">Fee</p>
                      <div className="text-right">
                        {course.tuitionModel === 'free' && (
                          <Badge variant="success" size="sm">Free</Badge>
                        )}
                        {course.tuitionModel === 'paid' && course.tuitionAmountApprox && (
                          <p className="text-base font-semibold text-gray-900">
                            €{course.tuitionAmountApprox.toLocaleString()}/year
                            {course.tuitionPeriod && ` (per ${course.tuitionPeriod})`}
                          </p>
                        )}
                        {course.tuitionModel === 'paid' && !course.tuitionAmountApprox && (
                          <p className="text-base font-semibold text-gray-900">Paid (amount not specified)</p>
                        )}
                      </div>
                    </div>
                  )}
                  {course.tuitionNote && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Note</p>
                      <p className="text-gray-900 text-sm">{course.tuitionNote}</p>
                    </div>
                  )}
                </div>
              </section>
            ) : null}

            {/* Admission Requirements */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Admission Requirements</h3>
              <div className="space-y-3">
                {course.admissionMode && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Admission Mode</p>
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
                    <p className="text-sm text-gray-600 mb-1">Minimum Grade Requirement</p>
                    <p className="text-base font-semibold text-gray-900">{course.minGrade} (German grading system)</p>
                    <p className="text-xs text-gray-500 mt-1">Note: Lower is better (1.0 = excellent, 3.0 = minimum passing)</p>
                  </div>
                )}
                {course.rawData?.completionRequirements && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Completion Requirements</p>
                    <ul className="list-disc list-inside space-y-1">
                      {course.rawData.completionRequirements
                        .split(';')
                        .map((req: string) => req.trim())
                        .filter((req: string) => req.length > 0)
                        .map((req: string, idx: number) => (
                          <li key={idx} className="text-gray-900 text-sm">{req}</li>
                        ))}
                    </ul>
                  </div>
                )}
                {course.rawData?.practicalExperience && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Practical Experience</p>
                    <ul className="list-disc list-inside space-y-1">
                      {course.rawData.practicalExperience
                        .split(';')
                        .map((req: string) => req.trim())
                        .filter((req: string) => req.length > 0)
                        .map((req: string, idx: number) => (
                          <li key={idx} className="text-gray-900 text-sm">{req}</li>
                        ))}
                    </ul>
                  </div>
                )}
                {course.rawData?.furtherRequirements && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Further Requirements</p>
                    <p className="text-gray-900 text-sm whitespace-pre-wrap">{course.rawData.furtherRequirements}</p>
                  </div>
                )}
                {course.rawData?.accessRequirements && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Access Requirements</p>
                    <ul className="list-disc list-inside space-y-1">
                      {course.rawData.accessRequirements
                        .split(';')
                        .map((req: string) => req.trim())
                        .filter((req: string) => req.length > 0)
                        .map((req: string, idx: number) => (
                          <li key={idx} className="text-gray-900 text-sm">{req}</li>
                        ))}
                    </ul>
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
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Intake Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {course.intakeSeason && course.intakeSeason !== 'unknown' && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Intake Season</p>
                      <p className="font-semibold text-gray-900 capitalize">{course.intakeSeason}</p>
                    </div>
                  )}
                  {course.intakeMonths && course.intakeMonths.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Intake Months</p>
                      <p className="font-semibold text-gray-900">{course.intakeMonths.join(', ')}</p>
                    </div>
                  )}
                  {course.deadlineWinter && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Winter Deadline</p>
                      <p className="font-semibold text-gray-900">{course.deadlineWinter}</p>
                    </div>
                  )}
                  {course.deadlineSummer && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Summer Deadline</p>
                      <p className="font-semibold text-gray-900">{course.deadlineSummer}</p>
                    </div>
                  )}
                  {course.rawData?.beginningStudents && (
                    <div className="col-span-2">
                      <p className="text-sm text-gray-600 mb-1">Beginning Students</p>
                      <p className="text-gray-900 text-sm whitespace-pre-wrap">{course.rawData.beginningStudents}</p>
                    </div>
                  )}
                </div>
              </section>
            ) : null}

            {/* Additional Information */}
            {(course.annotation || course.digitalTeaching || course.internationalDoubleDiploma || 
              (course.furtherLanguages && course.furtherLanguages.length > 0)) ? (
              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Additional Information
                </h3>
                <div className="space-y-2">
                  {course.annotation && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Annotation</p>
                      <p className="text-gray-900 text-sm">{course.annotation}</p>
                    </div>
                  )}
                  {course.digitalTeaching && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Digital Teaching</p>
                      <p className="text-gray-900 text-sm">{course.digitalTeaching}</p>
                    </div>
                  )}
                  {course.internationalDoubleDiploma && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">International Double Diploma</p>
                      <Badge variant="success" size="sm">Available</Badge>
                    </div>
                  )}
                  {course.furtherLanguages && course.furtherLanguages.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Further Languages</p>
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

          {/* Footer */}
          <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-between">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => window.open(course.detailPageUrl, '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View Official Page
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

