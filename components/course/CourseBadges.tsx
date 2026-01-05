/**
 * CourseBadges Component
 * Displays badges for course attributes (tuition, duration, IELTS, etc.)
 */

import React from 'react';
import Badge from '@/components/ui/Badge';
import type { ProcessedCourse } from '@/types/course';

interface CourseBadgesProps {
  course: ProcessedCourse;
}

export default function CourseBadges({ course }: CourseBadgesProps) {
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {/* Tuition Badge */}
      {course.tuitionModel === 'free' && (
        <Badge variant="success" size="sm">
          Fee: Free
        </Badge>
      )}
      {course.tuitionModel === 'paid' && course.tuitionAmountApprox && (
        <Badge variant="gray" size="sm">
          Fee: €{course.tuitionAmountApprox.toLocaleString()}/year
        </Badge>
      )}
      {course.tuitionModel === 'unknown' && (
        <Badge variant="gray" size="sm">
          Fee: Contact for Details
        </Badge>
      )}

      {/* IELTS Badge - only show if score is explicitly given */}
      {course.minIelts && (
        <Badge variant="default" size="sm">
          IELTS: {course.minIelts}
        </Badge>
      )}

      {/* TOEFL IBT Badge - only show if score is explicitly given */}
      {course.minToeflIbt && (
        <Badge variant="default" size="sm">
          TOEFL IBT: {course.minToeflIbt}
        </Badge>
      )}

      {/* TOEFL PBT Badge */}
      {course.minToeflPbt && (
        <Badge variant="default" size="sm">
          TOEFL PBT: {course.minToeflPbt}
        </Badge>
      )}

      {/* TOEFL CBT Badge */}
      {course.minToeflCbt && (
        <Badge variant="default" size="sm">
          TOEFL CBT: {course.minToeflCbt}
        </Badge>
      )}

      {/* TOEIC Badge */}
      {course.minToeic && (
        <Badge variant="default" size="sm">
          TOEIC: {course.minToeic}
        </Badge>
      )}

      {/* CEFR Level Badge */}
      {course.cefrLevel && (
        <Badge variant="info" size="sm">
          CEFR: {course.cefrLevel}
        </Badge>
      )}

      {/* Cambridge Certificate Badge */}
      {course.cambridgeCert && (
        <Badge variant="default" size="sm">
          Cambridge: {course.cambridgeCert}
        </Badge>
      )}

      {/* Other Tests Badge - show if tests are mentioned but no specific scores/certificates */}
      {!course.minIelts && !course.minToeflIbt && !course.minToeflPbt && 
       !course.minToeflCbt && !course.minToeic && !course.cefrLevel && !course.cambridgeCert &&
       (course.otherTests && course.otherTests.length > 0) && (
        <Badge variant="default" size="sm">
          {course.otherTests.join(', ')}
        </Badge>
      )}

      {/* MOI Badge - Medium of Instruction */}
      {course.acceptsMoi && (
        <Badge variant="info" size="sm">
          Other english exams accepted
        </Badge>
      )}

      {/* Minimum Grade Badge */}
      {course.minGrade && (
        <Badge variant="warning" size="sm">
          Min Grade: {course.minGrade}
        </Badge>
      )}
    </div>
  );
}

