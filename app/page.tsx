/**
 * Main Course Explorer Page
 * F-pattern layout with sidebar filters and course grid
 */

'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { useCourseData } from '@/hooks/useCourseData';
import { useCourseFilters } from '@/hooks/useCourseFilters';
import { usePagination } from '@/hooks/usePagination';
import { filterCourses, sortCourses } from '@/lib/filters';
import { searchCourses } from '@/lib/search';
import Sidebar from '@/components/layout/Sidebar';
import SearchBar from '@/components/filters/SearchBar';
import SortDropdown from '@/components/filters/SortDropdown';
import MultiSelectFilter from '@/components/filters/MultiSelectFilter';
import EnglishExamFilter from '@/components/filters/EnglishExamFilter';
import GradeFilter from '@/components/filters/GradeFilter';
import CourseGrid from '@/components/course/CourseGrid';
import CourseDetailModal from '@/components/course/CourseDetailModal';
import EmptyState from '@/components/ui/EmptyState';
import Button from '@/components/ui/Button';
import {
  STUDY_TYPES,
  ADMISSION_MODES,
  IELTS_SCORES,
  TOEFL_IBT_SCORES,
  TOEFL_PBT_SCORES,
  TOEFL_CBT_SCORES,
  TOEIC_SCORES,
  GRADE_OPTIONS,
  SUBJECT_CATEGORIES
} from '@/lib/constants';
import type { ProcessedCourse } from '@/types/course';

export default function Home() {
  const { courses, loading, error, totalCount } = useCourseData();
  const {
    filters,
    setSearch,
    setSubjects,
    setStudyTypes,
    setAdmissionModes,
    setIELTSScores,
    setIELTSNotSpecified,
    setTOEFLIbtScore,
    setTOEFLPbtScore,
    setTOEFLCbtScore,
    setTOEICScore,
    setGradeScore,
    setGradeNotSpecified,
    setIntakeSeasons,
    setCities,
    setUniversities,
    setSort,
    resetFilters,
    setPage
  } = useCourseFilters();
  const [selectedCourse, setSelectedCourse] = useState<ProcessedCourse | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const mainContentRef = useRef<HTMLElement>(null);

  // Function to scroll to top - multiple attempts to ensure it works
  const scrollToTop = () => {
    // Immediate scroll (instant) - set scrollTop directly
    if (mainContentRef.current) {
      mainContentRef.current.scrollTop = 0;
    }
    // Also scroll window immediately
    window.scrollTo({ top: 0 });

    // Smooth scroll after a tiny delay
    requestAnimationFrame(() => {
      if (mainContentRef.current) {
        mainContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Additional scroll after DOM update (in case content is still loading)
    setTimeout(() => {
      if (mainContentRef.current) {
        mainContentRef.current.scrollTop = 0;
        mainContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  // Handler for page change with scroll
  const handlePageChange = (newPage: number) => {
    // Scroll immediately before page change
    scrollToTop();
    // Then change the page
    setPage(newPage);
    // Scroll again after page change
    setTimeout(() => {
      scrollToTop();
    }, 50);
  };

  const handleExpandCourse = (course: ProcessedCourse) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };

  // Extract unique cities from courses
  const uniqueCities = useMemo(() => {
    if (loading || error || courses.length === 0) return [];
    const citySet = new Set<string>();
    courses.forEach((course) => {
      // Handle primary city - split by comma if needed
      if (course.city) {
        const cities = course.city.split(',').map(c => c.trim()).filter(c => c);
        cities.forEach(city => citySet.add(city));
      }
      // Handle cities array
      if (course.cities) {
        course.cities.forEach((city) => {
          if (city) {
            // Also split by comma in case cities array contains comma-separated strings
            const splitCities = city.split(',').map(c => c.trim()).filter(c => c);
            splitCities.forEach(c => citySet.add(c));
          }
        });
      }
    });
    return Array.from(citySet).sort();
  }, [courses, loading, error]);

  // Extract unique universities from courses
  const uniqueUniversities = useMemo(() => {
    if (loading || error || courses.length === 0) return [];
    const universitySet = new Set<string>();
    courses.forEach((course) => {
      if (course.university) {
        universitySet.add(course.university);
      }
    });
    return Array.from(universitySet).sort();
  }, [courses, loading, error]);

  // Extract subject categories from courses (broadCategories), ordered by SUBJECT_CATEGORIES
  const uniqueSubjects = useMemo(() => {
    if (loading || error || courses.length === 0) return [];
    const set = new Set<string>();
    courses.forEach((course) => {
      (course.broadCategories || []).forEach((cat) => {
        if (cat) set.add(cat);
      });
    });
    return SUBJECT_CATEGORIES.filter((cat) => set.has(cat));
  }, [courses, loading, error]);

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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-[var(--text-secondary)]">Loading courses...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md">
          <div className="text-red-600 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
            Error Loading Courses
          </h2>
          <p className="text-[var(--text-secondary)] mb-4">{error.message}</p>
          <p className="text-sm text-[var(--text-muted)]">
            Make sure <code className="bg-[var(--bg-card)] px-2 py-1 rounded text-[var(--text-primary)]">courses_processed.json</code> exists in the public directory.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] relative">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}>
        <div className="space-y-4">
          {/* Subject Filter */}
          <MultiSelectFilter
            title="Subject"
            options={uniqueSubjects}
            selectedValues={filters.selectedSubjects}
            onChange={setSubjects}
          />

          {/* Study Type Filter */}
          <MultiSelectFilter
            title="Study Type"
            options={STUDY_TYPES}
            selectedValues={filters.selectedStudyTypes}
            onChange={setStudyTypes}
            displayMap={{ 'Second cycle': 'Masters', 'Undergraduate': 'Bachelor' }}
          />

          {/* Admission Mode Filter */}
          <MultiSelectFilter
            title="Admission Mode"
            options={ADMISSION_MODES}
            selectedValues={filters.selectedAdmissionModes}
            onChange={setAdmissionModes}
          />

          {/* Location Filter */}
          <MultiSelectFilter
            title="Location"
            options={uniqueCities}
            selectedValues={filters.selectedCities}
            onChange={setCities}
            maxHeight="300px"
          />

          {/* University Filter */}
          <MultiSelectFilter
            title="University"
            options={uniqueUniversities}
            selectedValues={filters.selectedUniversities}
            onChange={setUniversities}
            maxHeight="300px"
          />

          {/* Intake Season Filter */}
          <MultiSelectFilter
            title="Intake Season"
            options={['winter', 'summer']}
            selectedValues={filters.selectedIntakeSeasons}
            onChange={setIntakeSeasons}
            displayMap={{ 'winter': 'Winter', 'summer': 'Summer' }}
          />

          {/* Grade Filter */}
          <GradeFilter
            selectedValue={filters.gradeScore}
            notSpecified={filters.gradeNotSpecified}
            onChange={setGradeScore}
            onNotSpecifiedChange={setGradeNotSpecified}
            gradeOptions={[...GRADE_OPTIONS]}
          />

          {/* English Exam Filters */}
          <div className="border-t border-[var(--border-color)] pt-4 mt-4">
            <EnglishExamFilter
              title="IELTS"
              examType="ielts"
              selectedValues={filters.ieltsScores}
              notSpecified={filters.ieltsNotSpecified}
              onChangeMultiple={setIELTSScores}
              onNotSpecifiedChange={setIELTSNotSpecified}
              scoreOptions={[...IELTS_SCORES]}
              allowMultiple={true}
              showNotSpecified={true}
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
            className="w-full px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Reset Filters
          </button>
        </div>
      </Sidebar>

      {/* Main Content */}
      <main ref={mainContentRef} className="flex-1 w-full lg:w-auto overflow-y-auto bg-transparent transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Mobile Filter Toggle Button - Always visible on mobile */}
          <div className="mb-6 lg:hidden sticky top-4 z-30">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
            >
              {isSidebarOpen ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Close Filters
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  Open Filters
                </>
              )}
            </button>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <SearchBar
              value={filters.searchQuery}
              onChange={setSearch}
              placeholder="Search courses, universities, cities..."
            />
          </div>

          {/* Sort Dropdown and Results Info */}
          <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <SortDropdown
                value={filters.sortBy}
                sortOrder={filters.sortOrder}
                onChange={(sortBy, sortOrder) => setSort(sortBy, sortOrder)}
              />
            </div>
            <div className="flex items-center gap-4">
              <p className="text-sm text-[var(--text-secondary)]">
                Showing <span className="font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">{filteredCourses.length.toLocaleString()}</span> of{' '}
                <span className="font-bold text-[var(--test-primary)]">{totalCount.toLocaleString()}</span> courses
              </p>
              {filteredCourses.length === 0 && (
                <button
                  onClick={resetFilters}
                  className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                >
                  Clear filters
                </button>
              )}
            </div>
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
                  <div className="text-sm text-[var(--text-secondary)]">
                    Showing {pagination.startIndex + 1} to {pagination.endIndex} of {filteredCourses.length} courses
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(filters.page - 1)}
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
                            onClick={() => handlePageChange(pageNum)}
                            className={`px-3 py-1 text-sm rounded transition-colors ${filters.page === pageNum
                                ? 'bg-blue-600 text-white'
                                : 'bg-[var(--bg-card)] text-[var(--text-secondary)] hover:bg-gray-100 dark:hover:bg-slate-700 border border-[var(--border-color)]'
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
                      onClick={() => handlePageChange(filters.page + 1)}
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
