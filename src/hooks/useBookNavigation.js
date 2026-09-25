import { useState, useEffect } from 'react';

export const useBookNavigation = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pages, setPages] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Initialize pages
    const pageElements = document.querySelectorAll('.book-page.page-right');
    setPages(Array.from(pageElements));
  }, []);

  const navigateToPage = (pageIndex) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentPage(pageIndex);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      navigateToPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      navigateToPage(currentPage - 1);
    }
  };

  const goToContact = () => {
    navigateToPage(pages.length - 1);
  };

  const goToProfile = () => {
    navigateToPage(0);
  };

  return {
    currentPage,
    nextPage,
    prevPage,
    goToContact,
    goToProfile,
    isAnimating
  };
};