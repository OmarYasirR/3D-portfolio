import { useState, useLayoutEffect, useRef, useCallback } from 'react';

/**
 * Splits `items` across virtual "pages" that all fit inside a fixed-height
 * container, without any scrolling. Works by rendering every item once,
 * off-screen, measuring its real rendered height, then bucketing items
 * greedily so no page ever exceeds `pageHeight`.
 *
 * Use this for ANY book page whose content length isn't known ahead of time
 * (fetched projects, work history, education entries, etc).
 *
 * @param {Array} items        Full data set, e.g. projects fetched from a server.
 * @param {Object} options
 * @param {number} options.pageHeight  Available content height in px
 *        (the page's real height minus header/footer/padding chrome —
 *        measure this empirically for your layout, see README notes below).
 * @param {number} [options.gap=0]    Vertical gap between items in px
 *        (must match whatever gap/space-y your CSS actually uses).
 * @param {number} [options.rowSize=1] How many items sit side-by-side per row
 *        (e.g. 2 for a `grid-cols-2` layout). Rows are kept whole — a page
 *        never contains half a row.
 * @param {Array} deps          Extra values that should trigger re-measurement
 *        (e.g. [activeFilter, isMobile]). `items` and `pageHeight` are
 *        already tracked for you.
 *
 * @returns {{
 *   pages: Array<Array>,      // items bucketed per page
 *   isMeasuring: boolean,     // true during the (usually 1-frame) measuring pass
 *   setMeasureRef: (index) => (el) => void, // attach to each item in the hidden pass
 * }}
 */
export function usePagedItems(items, { pageHeight, gap = 0, rowSize = 1 }, deps = []) {
  // Optimistic default: everything on page 1 until the first real measurement lands,
  // so there's never a "nothing rendered" flash.
  const [pages, setPages] = useState(() => [items]);
  const [isMeasuring, setIsMeasuring] = useState(true);
  const measureRefs = useRef([]);

  const setMeasureRef = useCallback((index) => (el) => {
    measureRefs.current[index] = el;
  }, []);

  useLayoutEffect(() => {
    setIsMeasuring(true);
    measureRefs.current = measureRefs.current.slice(0, items.length);

    // Let the hidden measuring pass paint first.
    const raf = requestAnimationFrame(() => {
      // 1. Measure every item.
      const heights = items.map((_, i) => measureRefs.current[i]?.getBoundingClientRect().height || 0);

      // 2. Group into rows (rowSize > 1 for grids). Row height = tallest item in the row.
      const rows = [];
      for (let i = 0; i < items.length; i += rowSize) {
        const rowItems = items.slice(i, i + rowSize);
        const rowHeight = Math.max(...heights.slice(i, i + rowSize), 0);
        rows.push({ items: rowItems, height: rowHeight });
      }

      // 3. Bucket whole rows into pages by accumulated height.
      const newPages = [];
      let currentPageRows = [];
      let currentHeight = 0;

      rows.forEach((row) => {
        const addedHeight = currentPageRows.length ? row.height + gap : row.height;

        if (currentHeight + addedHeight > pageHeight && currentPageRows.length > 0) {
          newPages.push(currentPageRows.flatMap((r) => r.items));
          currentPageRows = [row];
          currentHeight = row.height;
        } else {
          currentPageRows.push(row);
          currentHeight += addedHeight;
        }
      });

      if (currentPageRows.length) {
        newPages.push(currentPageRows.flatMap((r) => r.items));
      }

      setPages(newPages.length ? newPages : [[]]);
      setIsMeasuring(false);
    });

    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, pageHeight, gap, rowSize, ...deps]);

  return { pages, isMeasuring, setMeasureRef };
}
