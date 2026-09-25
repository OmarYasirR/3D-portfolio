import React from "react";

const IndexPage = ({ pages, onPageNavigate, showHeader, isMobile }) => {
  return (
    <div className="w-full h-full p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="flex flex-col h-full">
        {showHeader && (
          <h1 className="title text-3xl font-bold text-center mb-8">
            Portfolio Index
          </h1>
        )}

        {/* Index List */}
        <div className="flex-1">
          <div className="grid gap-4">
            {pages.map((page, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:bg-white cursor-pointer group border border-gray-200"
                onClick={() => onPageNavigate(isMobile ? page.pageNum : page.pageIndex)}
              >
                <div className="flex items-center space-x-4">
                  {/* Page Number Badge */}
                  <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full shadow-md group-hover:shadow-lg transition-shadow">
                    <span className="text-white font-bold text-sm">
                      {page.pageNum}
                    </span>
                  </div>

                  {/* Page Title */}
                  <div>
                    <h3 className="font-semibold text-gray-800 group-hover:text-primary transition-colors">
                      {page.title}
                    </h3>
                    {page.subtitle && (
                      <p className="text-sm text-gray-600 mt-1">{page.subtitle}</p>
                    )}
                  </div>
                </div>

                {/* Navigation Indicator */}
                <div className="flex items-center space-x-2">
                  <i className="bx bx-chevron-right text-xl text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all"></i>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-6 border-t border-gray-300">
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Click on any section to navigate directly
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Total {pages.length} sections in portfolio
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;