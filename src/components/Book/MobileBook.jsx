import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Page from "./Page";
import Paper from "./Paper";
import MobileNavigation from "../UI/MobileNavigation";
import { usePages } from "../../hooks/usePages";

const MobileBook = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageElements, setPageElements] = useState([]);
  const pagesRef = useRef();

  const handleNavigateTo = (targetIndex) => {
      if (targetIndex === currentPage) return;

      if(targetIndex < currentPage) {
        let index = currentPage
        const interval = setInterval(() => {
          if (index === targetIndex) {
            clearInterval(interval);
            return;
          }
          console.log('index   ' + index)
          console.log('target index   ' + targetIndex)
          index -= 1
          if (pageElements[index]) {
            Object.assign(pageElements[index].style, { transform: "rotateY(0deg)" });
          }
          setCurrentPage(prev => prev - 1);
        }, 300);
        return;
      }
        let index = currentPage
      const interval = setInterval(() => {
        console.log('index    ' + index)
        console.log('targetIndex    ' + targetIndex)
      if (index === targetIndex) {
        clearInterval(interval);
        return;
      }
      if (pageElements[index]) {
        Object.assign(pageElements[index].style, { transform: "rotateY(270deg)" });
        index+=1
        setCurrentPage(prev => prev + 1);
      }
      
    }, 300);
  }

  const { Pages, loading } = usePages(handleNavigateTo);

  const handleNextPage = () => {
    if(currentPage >= Pages.length - 1) return
    Object.assign(pageElements[currentPage].style, { transform: "rotateY(270deg)" });
    console.log('currentPage   ' + currentPage)
    setCurrentPage(prev => prev + 1);
  }

  const handlePrevPage = () => { 
    if(currentPage < 0) return
    Object.assign(pageElements[currentPage - 1].style, { transform: "rotateY(0deg)" });
    setCurrentPage(prev => prev - 1);
  };

  useEffect(() => {
    if (pagesRef.current) {
      setPageElements(Array.from(pagesRef.current.children));
    }
  }, [Pages.length]);

  return (
    <div
      ref={pagesRef}
      className="mobile-book w-full h-full relative max-w-[480px] transition-all ease-in-out duration-500 animate-show-book"
    >
      {Pages.map((page, i) => (
        <Paper isMobile key={page.id} style={{ zIndex: Pages.length - i }}>
          <Page
            content={page.component}
            pageNum={page.pageNum || ""}
            fliper={handleNextPage}
            isfront={true}
            isFlippable={false}
            isCover={i === 0}
            navDisabled={i === 0 && loading}
            isMobile={true}
            handlePrevPage={handlePrevPage}
          />
        </Paper>
      ))}

      {currentPage > 0 && (
        <MobileNavigation
          currentPage={currentPage}
          totalPages={Pages.length}
          onNavigateTo={handleNavigateTo}
          pages={Pages}
        />
      )}
    </div>
  );
};

export default MobileBook;