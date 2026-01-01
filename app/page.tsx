/**
 * Main Course Explorer Page
 * F-pattern layout with sidebar filters and course grid
 */

'use client';

import { useState, useMemo } from 'react';
import { useCourseData } from '@/hooks/useCourseData';
import { useCourseFilters } from '@/hooks/useCourseFilters';
import { usePagination } from '@/hooks/usePagination';
import { filterCourses, sortCourses } from '@/lib/filters';
import { searchCourses } from '@/lib/search';
import Sidebar from '@/components/layout/Sidebar';
import SearchBar from '@/components/filters/SearchBar';
import MultiSelectFilter from '@/components/filters/MultiSelectFilter';
import EnglishExamFilter from '@/components/filters/EnglishExamFilter';
import GradeFilter from '@/components/filters/GradeFilter';
import CourseGrid from '@/components/course/CourseGrid';
import CourseDetailModal from '@/components/course/CourseDetailModal';
import EmptyState from '@/components/ui/EmptyState';
import Button from '@/components/ui/Button';
import { 
  DEGREE_LEVELS,
  STUDY_TYPES,
  STUDY_MODES,
  ADMISSION_MODES,
  IELTS_SCORES, 
  TOEFL_IBT_SCORES, 
  TOEFL_PBT_SCORES, 
  TOEFL_CBT_SCORES, 
  TOEIC_SCORES,
  GRADE_OPTIONS
} from '@/lib/constants';
import type { ProcessedCourse } from '@/types/course';

export default function Home() {
  const { courses, loading, error, totalCount } = useCourseData();
  const { 
    filters, 
    setSearch, 
    setDegreeLevels,
    setStudyTypes,
    setStudyModes,
    setAdmissionModes,
    setIELTSScore,
    setTOEFLIbtScore,
    setTOEFLPbtScore,
    setTOEFLCbtScore,
    setTOEICScore,
    setGradeScore,
    resetFilters, 
    setPage 
  } = useCourseFilters();
  const [selectedCourse, setSelectedCourse] = useState<ProcessedCourse | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleExpandCourse = (course: ProcessedCourse) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };

  // Apply search, filters, and sorting
  const filteredCourses = useMemo(() => {
    if (loading || error || courses.length === 0) return [];

    // Step 1: Apply search (fuzzy search with Fuse.js)
    let result = filters.searchQuery
      ? searchCourses(filters.searchQuery, courses)
      : courses;

    // Step 2: Apply filters
    result = filterCourses(result, filters);

    // Step 3: Apply sorting
    result = sortCourses(result, filters.sortBy, filters.sortOrder);

    return result;
  }, [courses, filters, loading, error]);

  // Pagination
  const pagination = usePagination({
    totalItems: filteredCourses.length,
    itemsPerPage: filters.itemsPerPage,
    currentPage: filters.page,
  });

  // Get paginated courses
  const paginatedCourses = useMemo(() => {
    return pagination.paginatedItems(filteredCourses);
  }, [filteredCourses, pagination]);

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading courses...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md">
          <div className="text-red-600 dark:text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Error Loading Courses
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error.message}</p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Make sure <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-gray-900 dark:text-gray-100">courses_processed.json</code> exists in the public directory.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <Sidebar>
        <div className="space-y-4">
          {/* Degree Level Filter */}
          <MultiSelectFilter
            title="Degree Level"
            options={DEGREE_LEVELS}
            selectedValues={filters.selectedDegreeLevels}
            onChange={setDegreeLevels}
          />

          {/* Study Type Filter */}
          <MultiSelectFilter
            title="Study Type"
            options={STUDY_TYPES}
            selectedValues={filters.selectedStudyTypes}
            onChange={setStudyTypes}
          />

          {/* Study Mode Filter */}
          <MultiSelectFilter
            title="Study Mode"
            options={STUDY_MODES}
            selectedValues={filters.selectedStudyModes}
            onChange={setStudyModes}
          />

          {/* Admission Mode Filter */}
          <MultiSelectFilter
            title="Admission Mode"
            options={ADMISSION_MODES}
            selectedValues={filters.selectedAdmissionModes}
            onChange={setAdmissionModes}
          />

          {/* Grade Filter */}
          <GradeFilter
            selectedValue={filters.gradeScore}
            onChange={setGradeScore}
            gradeOptions={[...GRADE_OPTIONS]}
          />

          {/* English Exam Filters */}
          <div className="border-t border-gray-200 pt-4 mt-4">
            <EnglishExamFilter
              title="IELTS"
              examType="ielts"
              selectedValue={filters.ieltsScore}
              onChange={setIELTSScore}
              scoreOptions={[...IELTS_SCORES]}
            />

            <EnglishExamFilter
              title="TOEFL IBT"
              examType="toeflIbt"
              selectedValue={filters.toeflIbtScore}
              onChange={setTOEFLIbtScore}
              scoreOptions={[...TOEFL_IBT_SCORES]}
            />

            <EnglishExamFilter
              title="TOEFL PBT"
              examType="toeflPbt"
              selectedValue={filters.toeflPbtScore}
              onChange={setTOEFLPbtScore}
              scoreOptions={[...TOEFL_PBT_SCORES]}
            />

            <EnglishExamFilter
              title="TOEFL CBT"
              examType="toeflCbt"
              selectedValue={filters.toeflCbtScore}
              onChange={setTOEFLCbtScore}
              scoreOptions={[...TOEFL_CBT_SCORES]}
            />

            <EnglishExamFilter
              title="TOEIC"
              examType="toeic"
              selectedValue={filters.toeicScore}
              onChange={setTOEICScore}
              scoreOptions={[...TOEIC_SCORES]}
            />
          </div>

          <button
            onClick={resetFilters}
            className="w-full px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      </Sidebar>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Search Bar */}
          <div className="mb-6">
            <SearchBar
              value={filters.searchQuery}
              onChange={setSearch}
              placeholder="Search courses, universities, cities..."
            />
          </div>

          {/* Results Info */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredCourses.length.toLocaleString()}</span> of{' '}
              <span className="font-semibold text-gray-900 dark:text-white">{totalCount.toLocaleString()}</span> courses
            </p>
            {filteredCourses.length === 0 && (
              <button
                onClick={resetFilters}
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
              >
                Clear filters
              </button>
            )}
          </div>

          {/* Course Grid */}
          {filteredCourses.length === 0 ? (
            <EmptyState
              title="No courses found"
              message="Try adjusting your search or removing some filters"
              actionLabel="Clear All Filters"
              onAction={resetFilters}
            />
          ) : (
            <>
              <CourseGrid courses={paginatedCourses} onExpand={handleExpandCourse} />
              
              {/* Course Detail Modal */}
              <CourseDetailModal
                course={selectedCourse}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
              />
              
              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="mt-8 flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Showing {pagination.startIndex + 1} to {pagination.endIndex} of {filteredCourses.length} courses
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage(filters.page - 1)}
                      disabled={!pagination.canGoPrev}
                    >
                      Previous
                    </Button>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                        let pageNum;
                        if (pagination.totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (filters.page <= 3) {
                          pageNum = i + 1;
                        } else if (filters.page >= pagination.totalPages - 2) {
                          pageNum = pagination.totalPages - 4 + i;
                        } else {
                          pageNum = filters.page - 2 + i;
                        }
                        
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setPage(pageNum)}
                            className={`px-3 py-1 text-sm rounded ${
                              filters.page === pageNum
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage(filters.page + 1)}
                      disabled={!pagination.canGoNext}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
