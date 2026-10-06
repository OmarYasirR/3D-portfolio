import { useState, useRef, useCallback } from "react";
import MobileNavigation from "../UI/MobileNavigation";
import { usePages } from "../../hooks/usePages";
import PageNavigation from "../UI/PageNavigation";



// const Pages = [
//   {
//     kind: "cover",
//     title: "Portfolio",
//     subtitle: "A book you flip, not scroll",
//   },
//   {
//     kind: "content",
//     title: "Page 2",
//     body: "This page exists purely to test the flip mechanic. Click the left or right edge, or use the arrow buttons, to turn the page.",
//   },
//   {
//     kind: "content",
//     title: "Page 3",
//     body: "Each page is a fixed-size panel. The flip is a CSS 3D rotation between the leaving page (front face) and the entering page (back face).",
//   },
//   {
//     kind: "content",
//     title: "Page 4",
//     body: "Once this harness feels right, the real fetched-and-paginated content from useGithubBookPages slots in here as the page content.",
//   },
//   {
//     kind: "content",
//     title: "Page 5",
//     body: "Last page — the forward arrow disables here, same as the back arrow disables on the cover.",
//   },
// ];

const PAGE_W = 340;
const PAGE_H = 550;
const FLIP_MS = 650;

export default function MobileScreen() {
  const [current, setCurrent] = useState(0);
  const [flip, setFlip] = useState(null); // { direction: 'next' | 'prev', target: number }
  const isAnimating = useRef(false);
  

  
  const handleNavigateTo = useCallback((targetIndex) => {
    setCurrent(targetIndex);
  }, []);
  const { Pages } = usePages(handleNavigateTo, true)

  const canNext = current < Pages.length - 1;
  const canPrev = current > 0;

  function goNext() {
    if (isAnimating.current || !canNext) return;
    isAnimating.current = true;
    setFlip({ direction: "next", target: current + 1 });
  }

  function goPrev() {
    if (isAnimating.current || !canPrev) return;
    isAnimating.current = true;
    setFlip({ direction: "prev", target: current - 1 });
  }

  function handleTransitionEnd() {
    if (!flip) return;
    setCurrent(flip.target);
    setFlip(null);
    isAnimating.current = false;
  }

  const rotation = flip ? (flip.direction === "next" ? -180 : 180) : 0;
  const backContent = flip ? Pages[flip.target].component : null;

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-stone-50 p-8">
      <div className="flex items-center">

        <div
          style={{
            width: PAGE_W,
            height: PAGE_H,
            perspective: 1800,
          }}
          className="relative"
        >
          {/* static base: shows the entering page underneath at all times */}
          <div
            style={{ width: PAGE_W, height: PAGE_H }}
            className="absolute inset-0 rounded-sm shadow-xl overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100"
          >
            <PageFace component={backContent ?? Pages[current].component} index={(flip ? flip.target : current) + 1} />
          </div>

          {/* flipping panel: leaving page on front, entering page on back */}
          <div
            onTransitionEnd={handleTransitionEnd}
            style={{
              width: PAGE_W,
              height: PAGE_H,
              transformStyle: "preserve-3d",
              transformOrigin: flip?.direction === "prev" ? "right center" : "left center",
              transform: `rotateY(${rotation}deg)`,
              transition: flip ? `transform ${FLIP_MS}ms cubic-bezier(0.45, 0.05, 0.55, 0.95)` : "none",
            }}
            className="absolute inset-0 rounded-sm bg-gradient-to-br from-blue-50 to-indigo-100"
          >
            <div
              style={{ backfaceVisibility: "hidden" }}
              className="absolute inset-0 rounded-sm shadow-xl overflow-hidden"
            >
              <PageFace component={Pages[current].component} index={current + 1} />
            </div>
            <div
              style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              className="absolute inset-0 rounded-sm shadow-xl overflow-hidden"
            >
              {backContent && <PageFace component={backContent} index={(flip?.target ?? 0) + 1} />}
            </div>
          </div>

          {/* click zones for edge-tap flipping */}
          <button
            onClick={goPrev}
            disabled={!canPrev}
            className="absolute left-0 top-0 h-full w-10 cursor-pointer disabled:cursor-default"
            style={{ background: "transparent" }}
            aria-label="Flip to previous page"
          />
          <button
            onClick={goNext}
            disabled={!canNext}
            className="absolute right-0 top-0 h-full w-10 cursor-pointer disabled:cursor-default"
            style={{ background: "transparent" }}
            aria-label="Flip to next page"
          />
           {current > 0 && (
        <MobileNavigation
          currentPage={current}
          totalPages={Pages.length}
          onNext={goNext}
          onPrev={goPrev}
          onNavigateTo={handleNavigateTo}
          pages={Pages}
        />
      )}
        <>
          <PageNavigation
            fliping={goPrev}
            isCover={current === 0}
            isMobile={true}
            handlePrevPage={goNext}

          />
        </>
        </div>

        {/* <button
          onClick={goNext}
          disabled={!canNext}
          className="p-3 rounded-full bg-white shadow disabled:opacity-30 disabled:cursor-not-allowed hover:bg-stone-50 transition"
          aria-label="Next page"
        >
          <i className="bx bx-chevron-right"></i>
        </button> */}
      </div>
    </div>
  );
}

function PageFace({ component }) {

  return ( component );
}