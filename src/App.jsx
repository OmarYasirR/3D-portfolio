import { useEffect, useState } from 'react';
import Book from './components/Book/Book';
import './styles/globals.css';

function App() {

  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 922);
      setIsLoading(false);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isLoading) {
    return (
      <div className={`flex justify-center items-center min-h-screen bg-dark`}>
        <div className="text-white text-xl">Loading Portfolio...</div>
      </div>
    );
  }


  return (
    <div className={`h-screen w-screen bg-dark text-gray-800 overflow-hidden flex justify-center items-center`}>
      <Book isMobile={isMobile} />
    </div>
  );
}

export default App;