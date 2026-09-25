const BookPage = ({ 
  children, 
  side = 'left', 
  isTurned = false, 
  zIndex = 10,
  pageId,
  className = ''
}) => {
  const isRight = side === 'right';
  
  return (
    <div
      id={pageId}
      className={`book-page absolute w-1/2 h-full bg-gradient-to-r from-white to-gray-200 shadow-lg flex p-8 
        ${isRight 
          ? 'right-0 transform-style-3d origin-left transition-transform duration-1000 ease-cubic-bezier' 
          : 'left-0 shadow-[-6px_6px_6px_rgba(0,0,0,0.1)]'
        }
        ${isRight && isTurned ? 'rotate-y-180' : ''}
        ${className}`}
      style={{ 
        zIndex,
        transformStyle: 'preserve-3d'
      }}
    >
      {children}
    </div>
  );
};

export default BookPage;