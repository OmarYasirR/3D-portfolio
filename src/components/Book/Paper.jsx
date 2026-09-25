const Paper = ({ children, style, isMobile }) => {
  
  return (
    <div
      className={`paper absolute book-page ${isMobile? 'w-full p-4' :'w-1/2 py-8'} h-full shadow-lg transform-style-3d transition-transform duration-500  rounded-l-lg origin-right ease-in-out perspective-250`}
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
