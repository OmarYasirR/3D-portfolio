const Paper = ({ children, style, isStartd }) => {
  
  return (
    <div
      className={`paper absolute ${isStartd && 'inset-0'} book-page w-1/2 py-8 h-full transform-style-3d transition-all duration-500 ease-in-out rounded-l-lg origin-right  perspective-250`}
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
