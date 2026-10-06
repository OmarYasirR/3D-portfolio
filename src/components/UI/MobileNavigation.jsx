import { useState, useMemo } from "react";

const MobileNavigation = ({
  currentPage,
  totalPages,
  onNext,
  onPrev,
  onNavigateTo,
  pages,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const seen = new Set();
  const menuEntries = useMemo(
    () =>
      pages.filter((page) => {
        if (!seen.has(page.title)) {
          seen.add(page.title);
          return true;
        }
        return false;
      }),
    [pages],
  );

  const currentSectionTitle = useMemo(() => {
    for (let i = currentPage; i >= 0; i--) {
      if (pages[i]?.title) return pages[i].title;
    }
    return pages[currentPage]?.id === "cover" ? "Cover" : "Index";
  }, [pages, currentPage]);

return (  
    <>
      {showMenu && (
        <div
          className="fixed inset-0 z-60 bg-dark/10 backdrop-blur-[2px] transition-opacity"
          onClick={() => setShowMenu(false)}
        />
      )}
      {/* Section Indicator with Menu */}
      {/* apply glass effect (backdrop-blur) */}
      <div className="flex flex-col items-center fixed bottom-3 left-1/2 -translate-x-1/2 z-70 w-fit">
        <button
          onClick={() => setShowMenu(!showMenu)}
          aria-label="Jump to section"
          className="
      relative flex items-center px-4 py-2 rounded-full text-white
      bg-gradient-to-b from-primary/70 to-secondary/70
      backdrop-blur-xl backdrop-saturate-150
      border border-white/30
      shadow-[0_8px_32px_rgba(21,31,40,0.25),0_1px_0_rgba(255,255,255,0.5)_inset] hover:brightness-110 hover:shadow-[0_12px_40px_rgba(21,31,40,0.35),0_1px_0_rgba(255,255,255,0.6)_inset]
      active:scale-[0.98] opacity-80 hover:opacity-100 transition-all duration-500
    "
        >
          {/* top glass highlight */}
          <span className="pointer-events-none absolute left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-transparent via-white/80 to-transparent" />

          <span className="mx-4 font-medium drop-shadow-sm text-nowrap">
            {currentSectionTitle}
          </span>
          <span className="text-xs opacity-75">
            {currentPage}/{totalPages}
          </span>
          <i
            className={`bx bx-chevron-down ml-1 transition-transform duration-300 ${showMenu ? "rotate-180" : ""}`}
          ></i>
        </button>

        {showMenu && (
          <div
            className="
        absolute bottom-16 rounded-2xl p-3 min-w-[200px]
        bg-gradient-to-b from-white/70 to-white/40
        backdrop-blur-xl backdrop-saturate-150
        border border-white/60
        shadow-[0_12px_36px_rgba(21,31,40,0.22),0_1px_0_rgba(255,255,255,0.5)_inset]
        animate-in fade-in slide-in-from-bottom-2 duration-200
      "
          >
            {/* top glass highlight on the popover */}
            <div className="pointer-events-none absolute inset-x-6 top-px h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />

            <div className="grid grid-cols-2 gap-2">
              {menuEntries.map((page) => (
                <button
                  key={page.id}
                  onClick={() => {
                    onNavigateTo(page.pageNum);
                    setShowMenu(false);
                  }}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    page.title === currentSectionTitle
                      ? "bg-gradient-to-b from-primary/80 to-secondary/80 text-white shadow-sm backdrop-blur-md border border-white/30"
                      : "bg-white/50 text-gray-700 border border-white/40 backdrop-blur-md hover:bg-white/80"
                  }`}
                >
                  {page.title}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MobileNavigation;
