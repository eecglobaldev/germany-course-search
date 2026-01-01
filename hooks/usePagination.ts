/**
 * Pagination hook
 * Handles pagination logic for course lists
 */

import { useMemo } from 'react';

interface UsePaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
}

interface UsePaginationReturn {
  totalPages: number;
  startIndex: number;
  endIndex: number;
  paginatedItems: <T>(items: T[]) => T[];
  canGoNext: boolean;
  canGoPrev: boolean;
}

export function usePagination({
  totalItems,
  itemsPerPage,
  currentPage,
}: UsePaginationProps): UsePaginationReturn {
  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(totalItems / itemsPerPage));
  }, [totalItems, itemsPerPage]);

  const startIndex = useMemo(() => {
    return (currentPage - 1) * itemsPerPage;
  }, [currentPage, itemsPerPage]);

  const endIndex = useMemo(() => {
    return Math.min(startIndex + itemsPerPage, totalItems);
  }, [startIndex, itemsPerPage, totalItems]);

  const paginatedItems = <T,>(items: T[]): T[] => {
    return items.slice(startIndex, endIndex);
  };

  const canGoNext = currentPage < totalPages;
  const canGoPrev = currentPage > 1;

  return {
    totalPages,
    startIndex,
    endIndex,
    paginatedItems,
    canGoNext,
    canGoPrev,
  };
}

