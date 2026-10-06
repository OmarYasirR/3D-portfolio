import React from "react";

const CoverPage = ({ onStartBrowsing, isMobile = false }) => {
  const handleOpenBook = () => {
    if (onStartBrowsing) {
      onStartBrowsing();
    }
  };

  return (
    <div
      className="group relative w-full h-full overflow-hidden text-white"
      style={{
        backgroundImage: [
          "linear-gradient(90deg, rgba(0,0,0,0.15), transparent 35%, transparent 65%, rgba(0,0,0,0.15))",
          "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E\")",
          "linear-gradient(135deg, #00abf0, #006e9a)",
        ].join(", "),
        backgroundSize: "cover, 20px 20px, cover",
        backgroundRepeat: "no-repeat, repeat, no-repeat",
      }}
    >
      <div className="flex w-full h-full">
        {/* Spine */}
        <div
          className="w-8 flex-shrink-0 shadow-2xl flex items-center justify-center"
          style={{ background: "linear-gradient(to bottom, #006e9a, #00abf0, #006e9a)" }}
        >
          <div className="w-6 h-32 bg-primary/80 rounded-lg shadow-inner flex flex-col items-center justify-center gap-4">
            <div className="w-4 h-0.5 bg-white/30"></div>
            <div className="w-4 h-0.5 bg-white/30"></div>
            <div className="w-4 h-0.5 bg-white/30"></div>
          </div>
        </div>

        {/* Main content column */}
        <div className="flex-1 min-w-0 p-3 sm:p-4 pt-4">
          <div className="h-full border-2 border-white/20 rounded-lg p-1">
            <div className="h-full border border-white/10 rounded flex flex-col p-3 sm:p-7">
              <div className="flex justify-end">
                <span className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20 text-sm font-mono">
                  2024
                </span>
              </div>

              {/* Centered hero content fills the remaining space */}
              <div className="flex-1 flex flex-col items-center justify-start text-center pt-6">
                <h1 className="text-4xl font-bold mb-4 font-serif tracking-wider drop-shadow-lg">
                  PORTFOLIO
                </h1>
                <div className="w-32 h-1 bg-white/50 mb-4 rounded-full"></div>
                <p className="text-white/80 text-lg font-light tracking-widest mb-5">
                  DIGITAL COLLECTION
                </p>

                <h2 className="text-2xl sm:text-3xl font-semibold mb-2">Omar Yasir Dafalla</h2>
                <p className="text-xl text-white/90 font-light mb-10">Full Stack Developer</p>

                <div className="flex gap-8">
                  <div className="flex flex-col items-center group/icon">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-2 group-hover/icon:bg-white/30 transition-all duration-300 shadow-lg backdrop-blur-sm">
                      <i className="bx bx-code-alt text-2xl text-white"></i>
                    </div>
                    <span className="text-white/80">Development</span>
                  </div>

                  <div className="flex flex-col items-center group/icon">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-2 group-hover/icon:bg-white/30 transition-all duration-300 shadow-lg backdrop-blur-sm">
                      <i className="bx bx-palette text-2xl text-white"></i>
                    </div>
                    <span className="text-white/80">Design</span>
                  </div>

                  <div className="flex flex-col items-center group/icon">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-2 group-hover/icon:bg-white/30 transition-all duration-300 shadow-lg backdrop-blur-sm">
                      <i className="bx bx-rocket text-2xl text-white"></i>
                    </div>
                    <span className="text-white/80">Innovation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverPage;