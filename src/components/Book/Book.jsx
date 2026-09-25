import { useState, useEffect } from 'react';
import MobileBook from './MobileBook';
import DesktopScreen from './DesktopScreen';

const Book = ({isMobile}) => {
  

  return (isMobile ? <MobileBook /> : <DesktopScreen />);
};

export default Book;