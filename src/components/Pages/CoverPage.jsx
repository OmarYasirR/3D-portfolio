import React from "react";

const CoverPage = () => {
  
  return (
    <div className="w-full h-full bg-gradient-to-br from-primary to-secondary relative overflow-hidden group">
      {/* Book Cover Texture */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%22100%22%20height%3D%22100%22%20viewBox%3D%220%200%20100%20100%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cfilter%20id%3D%22noise%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%221%22%20/%3E%3C/filter%3E%3Crect%20width%3D%22100%22%20height%3D%22100%22%20filter%3D%22url%28%23noise%29%22%20opacity%3D%220.2%22%20/%3E%3C/svg%3E')] opacity-20"></div>
      
      {/* Darker Overlay for Depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/15 to-transparent"></div>
      
      {/* Spine */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-b from-primary-dark via-primary to-primary-dark shadow-2xl">
        {/* Spine Decorations */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-32 bg-primary/80 rounded-lg shadow-inner">
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-4 h-0.5 bg-white/30"></div>
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-4 h-0.5 bg-white/30"></div>
          <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-4 h-0.5 bg-white/30"></div>
        </div>
      </div>

      {/* Cover Content */}
      <div className="relative w-full h-full flex flex-col items-center justify-center p-8 text-center ml-3 sm:ml-8">
        
        {/* Decorative Border */}
        <div className="absolute inset-4 border-2 border-white/20 rounded-lg pointer-events-none"></div>
        <div className="absolute inset-6 border border-white/10 rounded pointer-events-none"></div>

        {/* Main Title */}
        <div className="mb-8 transform">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 font-serif tracking-wider drop-shadow-lg">
            PORTFOLIO
          </h1>
          <div className="w-32 h-1 bg-white/50 mx-auto mb-4 rounded-full"></div>
          <p className="text-white/80 text-lg font-light tracking-widest">
            DIGITAL COLLECTION
          </p>
        </div>

        {/* Author Info */}
        <div className="mb-12 text-white">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-2">Omar Yasir Dafalla</h2>
          <p className="text-xl text-white/90 font-light">Full Stack Developer</p>
        </div>

        {/* Icons Section */}
        <div className="flex space-x-8 mb-12">
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
        

        {/* Year Badge */}
        <div className="absolute top-6 right-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
            <span className="text-white text-sm font-mono">2024</span>
          </div>
        </div>

        {/* Corner Decorations */}
        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-white/30"></div>
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/30"></div>
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white/30"></div>
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-white/30"></div>
      </div>

      {/* Shine Effect on Hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full bg-repeat" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.2' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
    </div>
  );
};

export default CoverPage;