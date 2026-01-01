/**
 * Custom hook for managing filter state
 * Uses useReducer for complex state management
 */

'use client';

import { useReducer, useCallback } from 'react';
import type { FilterState } from '@/types/filter';
import { DEFAULT_FILTER_STATE } from '@/types/filter';

type FilterAction =
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'SET_SUBJECTS'; payload: string[] }
  | { type: 'SET_DEGREE_LEVELS'; payload: string[] }
  | { type: 'SET_DEGREE_TYPES'; payload: string[] }
  | { type: 'SET_STUDY_TYPES'; payload: string[] }
  | { type: 'SET_STUDY_MODES'; payload: string[] }
  | { type: 'SET_ADMISSION_MODES'; payload: string[] }
  | { type: 'SET_TUITION'; payload: FilterState['tuitionModel'] }
  | { type: 'SET_IELTS_SCORE'; payload: number | undefined }
  | { type: 'SET_TOEFL_IBT_SCORE'; payload: number | undefined }
  | { type: 'SET_TOEFL_PBT_SCORE'; payload: number | undefined }
  | { type: 'SET_TOEFL_CBT_SCORE'; payload: number | undefined }
  | { type: 'SET_TOEIC_SCORE'; payload: number | undefined }
  | { type: 'SET_GRADE_SCORE'; payload: number | undefined }
  | { type: 'SET_DURATION'; payload: [number, number] }
  | { type: 'SET_INTAKE_MONTHS'; payload: string[] }
  | { type: 'SET_CITIES'; payload: string[] }
  | { type: 'SET_UNIVERSITIES'; payload: string[] }
  | { type: 'SET_SORT'; payload: { by: FilterState['sortBy']; order: FilterState['sortOrder'] } }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'SET_ITEMS_PER_PAGE'; payload: number }
  | { type: 'RESET_FILTERS' }
  | { type: 'SET_FILTERS'; payload: Partial<FilterState> };

function filterReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case 'SET_SEARCH':
      return { ...state, searchQuery: action.payload, page: 1 };
    case 'SET_SUBJECTS':
      return { ...state, selectedSubjects: action.payload, page: 1 };
    case 'SET_DEGREE_LEVELS':
      return { ...state, selectedDegreeLevels: action.payload, page: 1 };
    case 'SET_DEGREE_TYPES':
      return { ...state, selectedDegreeTypes: action.payload, page: 1 };
    case 'SET_STUDY_TYPES':
      return { ...state, selectedStudyTypes: action.payload, page: 1 };
    case 'SET_STUDY_MODES':
      return { ...state, selectedStudyModes: action.payload, page: 1 };
    case 'SET_ADMISSION_MODES':
      return { ...state, selectedAdmissionModes: action.payload, page: 1 };
    case 'SET_TUITION':
      return { ...state, tuitionModel: action.payload, page: 1 };
    case 'SET_IELTS_SCORE':
      return { ...state, ieltsScore: action.payload, page: 1 };
    case 'SET_TOEFL_IBT_SCORE':
      return { ...state, toeflIbtScore: action.payload, page: 1 };
    case 'SET_TOEFL_PBT_SCORE':
      return { ...state, toeflPbtScore: action.payload, page: 1 };
    case 'SET_TOEFL_CBT_SCORE':
      return { ...state, toeflCbtScore: action.payload, page: 1 };
    case 'SET_TOEIC_SCORE':
      return { ...state, toeicScore: action.payload, page: 1 };
    case 'SET_GRADE_SCORE':
      return { ...state, gradeScore: action.payload, page: 1 };
    case 'SET_DURATION':
      return { ...state, durationRange: action.payload, page: 1 };
    case 'SET_INTAKE_MONTHS':
      return { ...state, selectedIntakeMonths: action.payload, page: 1 };
    case 'SET_CITIES':
      return { ...state, selectedCities: action.payload, page: 1 };
    case 'SET_UNIVERSITIES':
      return { ...state, selectedUniversities: action.payload, page: 1 };
    case 'SET_SORT':
      return {
        ...state,
        sortBy: action.payload.by,
        sortOrder: action.payload.order,
      };
    case 'SET_PAGE':
      return { ...state, page: action.payload };
    case 'SET_ITEMS_PER_PAGE':
      return { ...state, itemsPerPage: action.payload, page: 1 };
    case 'RESET_FILTERS':
      return DEFAULT_FILTER_STATE;
    case 'SET_FILTERS':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export function useCourseFilters(initialState?: Partial<FilterState>) {
  const [state, dispatch] = useReducer(
    filterReducer,
    { ...DEFAULT_FILTER_STATE, ...initialState }
  );

  const setSearch = useCallback((query: string) => {
    dispatch({ type: 'SET_SEARCH', payload: query });
  }, []);

  const setSubjects = useCallback((subjects: string[]) => {
    dispatch({ type: 'SET_SUBJECTS', payload: subjects });
  }, []);

  const setDegreeLevels = useCallback((levels: string[]) => {
    dispatch({ type: 'SET_DEGREE_LEVELS', payload: levels });
  }, []);

  const setStudyTypes = useCallback((types: string[]) => {
    dispatch({ type: 'SET_STUDY_TYPES', payload: types });
  }, []);

  const setStudyModes = useCallback((modes: string[]) => {
    dispatch({ type: 'SET_STUDY_MODES', payload: modes });
  }, []);

  const setAdmissionModes = useCallback((modes: string[]) => {
    dispatch({ type: 'SET_ADMISSION_MODES', payload: modes });
  }, []);

  const setTuition = useCallback((model: FilterState['tuitionModel']) => {
    dispatch({ type: 'SET_TUITION', payload: model });
  }, []);

  const setIELTSScore = useCallback((score?: number) => {
    dispatch({ type: 'SET_IELTS_SCORE', payload: score });
  }, []);

  const setTOEFLIbtScore = useCallback((score?: number) => {
    dispatch({ type: 'SET_TOEFL_IBT_SCORE', payload: score });
  }, []);

  const setTOEFLPbtScore = useCallback((score?: number) => {
    dispatch({ type: 'SET_TOEFL_PBT_SCORE', payload: score });
  }, []);

  const setTOEFLCbtScore = useCallback((score?: number) => {
    dispatch({ type: 'SET_TOEFL_CBT_SCORE', payload: score });
  }, []);

  const setTOEICScore = useCallback((score?: number) => {
    dispatch({ type: 'SET_TOEIC_SCORE', payload: score });
  }, []);

  const setGradeScore = useCallback((score?: number) => {
    dispatch({ type: 'SET_GRADE_SCORE', payload: score });
  }, []);

  const setDuration = useCallback((range: [number, number]) => {
    dispatch({ type: 'SET_DURATION', payload: range });
  }, []);

  const setIntakeMonths = useCallback((months: string[]) => {
    dispatch({ type: 'SET_INTAKE_MONTHS', payload: months });
  }, []);

  const setSort = useCallback((by: FilterState['sortBy'], order: FilterState['sortOrder'] = 'asc') => {
    dispatch({ type: 'SET_SORT', payload: { by, order } });
  }, []);

  const setPage = useCallback((page: number) => {
    dispatch({ type: 'SET_PAGE', payload: page });
  }, []);

  const resetFilters = useCallback(() => {
    dispatch({ type: 'RESET_FILTERS' });
  }, []);

  const updateFilters = useCallback((filters: Partial<FilterState>) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  }, []);

  return {
    filters: state,
    setSearch,
    setSubjects,
    setDegreeLevels,
    setStudyTypes,
    setStudyModes,
    setAdmissionModes,
    setTuition,
    setIELTSScore,
    setTOEFLIbtScore,
    setTOEFLPbtScore,
    setTOEFLCbtScore,
    setTOEICScore,
    setGradeScore,
    setDuration,
    setIntakeMonths,
    setSort,
    setPage,
    resetFilters,
    updateFilters,
  };
}

