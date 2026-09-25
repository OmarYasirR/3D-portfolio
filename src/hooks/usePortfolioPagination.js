import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { usePagedItems } from './usePagedItems';

// All the GitHub/Vercel fetching + merging + README-image lookup now
// happens server-side in /api/projects.js — the client never sees
// GITHUB_TOKEN/VERCEL_TOKEN, it just calls your own API route.
async function fetchProjects() {
  const res = await axios.get('/api/projects');
  return res.data.projects;
}

/**
 * Owns the portfolio data lifecycle end-to-end: fetch -> filter -> paginate.
 * Used by both DesktopScreen and MobileBook so the two don't drift out of
 * sync with separate copies of this logic.
 *
 * @param {Object} options
 * @param {number} options.pageHeight  Available content height in px for ONE
 *        physical page's project grid (desktop: fixed constant is fine since
 *        the book container is a fixed size; mobile: pass a live-measured
 *        value from useElementSize since viewport height varies).
 * @param {number} [options.rowSize=2] Items per row in the grid.
 */
export function usePortfolioPagination({ pageHeight, rowSize = 2 }) {
  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [projectsError, setProjectsError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    let cancelled = false;
    setProjectsLoading(true);
    setProjectsError(null);
    fetchProjects()
      .then((data) => {
        if (!cancelled) setProjects(data);
      })
      .catch((err) => {
        if (!cancelled) {
          console.error('Failed to load projects:', err);
          setProjectsError(err);
          setProjects([]);
        }
      })
      .finally(() => {
        if (!cancelled) setProjectsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredProjects = useMemo(
    () => (activeFilter === 'all' ? projects : projects.filter((p) => p.category === activeFilter)),
    [projects, activeFilter]
  );

  const { pages, isMeasuring, setMeasureRef } = usePagedItems(
    filteredProjects,
    // pageHeight of 0 (not measured yet) would bucket everything onto one
    // page — usePagedItems' `isMeasuring` return covers the very first
    // render, but guard here too for the "container not mounted yet" case.
    { pageHeight: pageHeight || 99999, gap: 16, rowSize },
    [activeFilter, pageHeight]
  );

  return {
    filteredProjects,
    pages,
    ready: !projectsLoading && !isMeasuring && pageHeight > 0,
    error: projectsError,
    setMeasureRef,
    activeFilter,
    setActiveFilter,
  };
}