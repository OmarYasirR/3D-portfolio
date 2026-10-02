import { useState, useEffect } from 'react';
import MobileScreen from './MobileScreen';
import DesktopScreen from './DesktopScreen';

const Book = ({isMobile}) => {
  

  return (isMobile ? <MobileScreen /> : <DesktopScreen />);
};

export default Book;