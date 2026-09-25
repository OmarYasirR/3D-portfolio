import React from "react";

/**
 * Same display as the desktop IndexPage, but with navigation wired directly
 * (mobile has no left/right spread — just one page at a time). `pages` is
 * passed down from MobileBook's own dynamic page list, so this never has
 * its own out-of-sync copy of the section list.
 */
const MobileIndex = ({ pages, onPageNavigate }) => {
  return (
    <div className="w-full h-full p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="flex flex-col h-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Portfolio Index</h1>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="grid gap-4">
            {pages.map((page) => (
              <div
                key={page.id}
                className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:bg-white cursor-pointer group border border-gray-200"
                onClick={() => onPageNavigate(page.pageIndex)}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full shadow-md group-hover:shadow-lg transition-shadow">
                    <span className="text-white font-bold text-sm">{page.pageNum}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 group-hover:text-primary transition-colors">
                      {page.title}
                    </h3>
                  </div>
                </div>
                <i className="bx bx-chevron-right text-xl text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all"></i>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-300">
          <div className="text-center">
            <p className="text-sm text-gray-600">Tap any section to navigate directly</p>
            <p className="text-xs text-gray-500 mt-1">Total {pages.length} sections in portfolio</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileIndex;
