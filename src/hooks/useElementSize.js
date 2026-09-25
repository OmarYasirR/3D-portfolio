import { useState, useRef, useLayoutEffect, useCallback } from 'react';

/**
 * Tracks an element's real rendered content size (via ResizeObserver),
 * for layouts where the page height isn't a fixed constant — e.g. mobile,
 * where viewport height varies by device.
 *
 * Usage:
 *   const { ref, height } = useElementSize();
 *   <div ref={ref} className="h-full">...</div>
 *   // height is 0 until the first paint/measurement lands
 */
export function useElementSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const elRef = useRef(null);

  const setRef = useCallback((node) => {
    elRef.current = node;
  }, []);

  useLayoutEffect(() => {
    const el = elRef.current;
    if (!el) return undefined;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref: setRef, width: size.width, height: size.height };
}
