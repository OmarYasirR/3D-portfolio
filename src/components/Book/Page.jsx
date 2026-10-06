import React from "react";
import PageNavigation from "../UI/PageNavigation";

const Page = ({ content, isfront = false, pageNum, fliper, isFlippable, isCover = false, navDisabled = false, isMobile = false, handlePrevPage, style={} }) => {
  const handleFlip = () => {
    if (!isFlippable && !navDisabled && fliper) {
      fliper();
      console.log('fliper called')
    }
  };

  return (
    <div
      className={`absolute inset-0 backface-hidden shadow-xl bg-gradient-to-br from-blue-50 to-indigo-50
        ${!isfront && "rotate-y-180"}
        `}
      style={{ backfaceVisibility: "hidden", ...style }}
    > 
      <div className="w-full h-full relative">
        {content}

        {/* Page Number */}
        <span className="number-page absolute bottom-4 right-4 text-sm text-gray-600 font-medium"> 
          {pageNum + 1}
        </span>

        {/* Navigation */}
        <PageNavigation
          fliping={handleFlip}
          isBack={isfront}
          pageNumber={pageNum}
          isCover={isCover}
          disabled={navDisabled}
          isMobile={isMobile}
          handlePrevPage={handlePrevPage}

        />
      </div>
    </div>
  );
};

export default Page;