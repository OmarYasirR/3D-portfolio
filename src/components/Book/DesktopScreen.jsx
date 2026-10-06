import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Paper from "./Paper";
import Page from "./Page";

import { usePages } from "../../hooks/usePages";

const DesktopScreen = () => {
  const [isStartd, setIsStartd] = useState(false);
  const [isFliping, setIsFliping] = useState(false);
  const [leftPages, SetLeftPages] = useState([])
  const papersRef = useRef(null);

  // Mutable flip counters — refs, not state, so interval-driven index
  // navigation always reads the current value rather than one captured by
  // a stale closure.
  const leftIndexRef = useRef(0);
  const rightIndexRef = useRef(0);


  // ---- Flip mechanics ----
  const flippingStyle = (element, stylesArr) => {
    if (element) {
      setIsFliping(true);
      Object.assign(element.style, stylesArr[0]);
      setTimeout(() => {
        Object.assign(element.style, stylesArr[1]);
        setIsFliping(false);
      }, 500);
    }
  };



  const flipLeft = (pageIndex) => {
    const children = papersRef.current ? Array.from(papersRef.current?.children): []
    console.log(children.length)
    const el = children[pageIndex];
    SetLeftPages(prev => prev.slice(0, -1))
    const style = [{ transform: "rotateY(0deg)" }, { zIndex: rightIndexRef.current + 1 }];
    flippingStyle(el, style);
    leftIndexRef.current -= 1;
    rightIndexRef.current += 1;
    if (pageIndex === 0) {
      setTimeout(() => setIsStartd(false), 700);
    }
  };

  const handleFlip = (direction, pageIndex) => {
    if (direction === "right") flipRight(pageIndex);
    else if (direction === "left") flipLeft(pageIndex);
  };

  
  const navigateToIndex = (targetPairIndex) => {
    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      if (step === targetPairIndex) {
        clearInterval(interval);
      }
      flipRight(step)
    }, 300);
  }

  const { pagePairs, loading, Pages } = usePages(navigateToIndex);

  
  //   const papers = useMemo(() => {
  //   if(papersRef.current){
  //     const children = Array.from(papersRef.current?.children);
  //     return children
  //   } else{ return [] }
  // }, [pagePairs.length, rightIndexRef.current])


    const flipRight = (pageIndex) => {
    if (pageIndex === 0) setIsStartd(true);
    const children = papersRef.current ? Array.from(papersRef.current?.children): []
    console.log(children.length)
    const el = children[pageIndex];
    SetLeftPages(prev => [...prev, el])
    const style = [{ transform: "rotateY(180deg)" }, { zIndex: leftIndexRef.current }];
    console.log(leftIndexRef.current)
    flippingStyle(el, style);
    leftIndexRef.current += 1;
    rightIndexRef.current -= 1;
  }



  useEffect(() => {
    console.log(Pages)
    console.log(pagePairs?.length)
    if (papersRef.current) {
      const children = Array.from(papersRef.current.children);
    
      rightIndexRef.current = children.length;
      // leftIndexRef.current = 0;
    }
    if(leftPages.length){
      leftPages.forEach((el, i) => Object.assign(el.style, { zIndex: i }))
    }
  }, [pagePairs.length]);

  return (
    <>
      {pagePairs.length === 0 ? (
        <div className="flex justify-center items-center min-h-screen bg-dark">
          <div className="text-white text-xl">Loading Book...</div>
        </div>
      ) : (
        <div
          ref={papersRef}
          className={`transition-all ease-in-out duration-500 animate-show-book wrapper relative w-[55rem] h-[35rem] overflow-hidden ${ !isStartd ? 'flex justify-center' : '' }`}
        >   
          {pagePairs.map((item, index) => (
            <Paper key={item.id} style={{ zIndex: pagePairs.length - index }} isStartd={isStartd} >
              <Page
                content={item.front.component}
                pageNum={item.front.number !== 0 ? item.front.number : ""}
                fliper={() => handleFlip("right", index)}
                isfront={true}
                isFlippable={isFliping}
                isCover={index === 0}
                navDisabled={index === 0 && loading}
              />
              <Page
                content={item.back.component}
                pageNum={item.back.number}
                fliper={() => handleFlip("left", index)}
                isfront={false}
                isFlippable={isFliping}
              />
            </Paper>
          ))}
        </div>
      )}
    </>
  );
};

export default DesktopScreen;