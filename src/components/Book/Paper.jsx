const Paper = ({ children, style, isMobile }) => {
  
  return (
    <div
      className={`paper absolute book-page ${isMobile? 'w-full p-4' :'w-1/2 py-8'} h-full shadow-lg transform-style-3d transition-all duration-500 ease-in-out rounded-l-lg origin-right  perspective-250`}
      style={{
        transformStyle: 'preserve-3d',
        ...style
      }}
    >
      {children}
    </div>
  );
};

export default Paper;
