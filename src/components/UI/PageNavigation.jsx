import { useEffect } from "react";

const PageNavigation = ({
  fliping,
  pageNumber,
  isBack = false,
  isCover = false,
  disabled = false,
  isMobile = false,
  handlePrevPage,
}) => {
  const handleClick = () => {
    if (disabled) return;
    fliping();
  };


  if (isCover) {
    return (
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center z-50">
        <button
          onClick={handleClick}
          disabled={disabled}
          aria-label={disabled ? "Loading portfolio" : "Open portfolio"}
          className={`px-6 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 flex items-center space-x-2 group/btn backdrop-blur-sm border border-white/20 ${
            disabled
              ? "bg-white/10 text-white/60 cursor-not-allowed"
              : "bg-white/20 hover:bg-white/30 text-white hover:shadow-xl transform hover:scale-105"
          }`}
        >
          <span>{disabled ? "Loading…" : "Open Portfolio"}</span>
          {!disabled && (
            <i className="bx bx-chevron-right text-xl group-hover/btn:translate-x-1 transition-transform"></i>
          )}
        </button>
        <p className="text-white/70 text-sm mt-3 animate-pulse">
          {disabled ? "Fetching latest projects…" : "Click to explore my work"}
        </p>
      </div>
    );
  }

  {
    if (isMobile) {
      return (
        <div className="absolute top-1/2 left-0 right-0 flex justify-between px-4 z-50">
          <button
            onClick={handleClick}
            aria-label="Next page"
            className="text-2xl text-primary bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg hover:bg-primary hover:text-white transition-all opacity-50 hover:opacity-100"
          >
            <i className="bx bx-chevron-left"></i>
          </button>
          <button
            onClick={handlePrevPage}
            aria-label="Previous page"
            className="text-2xl text-primary bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg hover:bg-primary hover:text-white transition-all opacity-50 hover:opacity-100"
          >
            <i className="bx bx-chevron-right"></i>
          </button>
          
        </div>
      );
    }
  }

  return (
    <button
      onClick={handleClick}
      aria-label={isBack ? "Previous page" : "Next page"}
      className={`nextprev-btn absolute top-1/2 ${
        isBack ? "left-4" : "right-4"
      } -translate-y-1/2 text-2xl text-primary bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg hover:bg-primary hover:text-white transition-all`}
      data-page={`turn-${pageNumber}`}
    >
      <i
        className={`bx ${isBack ? "bx-chevron-left" : "bx-chevron-right"}`}
      ></i>
    </button>
  );
};

export default PageNavigation;
