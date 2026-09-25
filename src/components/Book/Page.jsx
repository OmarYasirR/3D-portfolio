import React from "react";
import PageNavigation from "../UI/PageNavigation";

const Page = ({ content, isfront = false, pageNum, fliper, isFlippable, isCover = false, navDisabled = false, isMobile = false, handlePrevPage }) => {
  const handleFlip = () => {
    if (!isFlippable && !navDisabled && fliper) {
      fliper();
      console.log('fliper called')
    }
  };

  return (
    <div
      className={`bg-gradient-to-r absolute inset-0 backface-hidden shadow-2xl from-white to-gray-100 ${
        !isfront && "rotate-y-180"
      }`}
      style={{ backfaceVisibility: "hidden" }}
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