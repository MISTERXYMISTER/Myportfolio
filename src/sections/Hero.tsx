'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const ROWS = 6;
const COLS = 6;
const BLOCK_SIZE = 50;
const COOLDOWN = 1000;

interface BlockInfo {
  numCols: number;
  numRows: number;
  numBlocks: number;
}

export default function InteractiveGrid() {
  const [isFlipped, setIsFlipped] = useState(false);
  const boardRef = useRef<HTMLDivElement>(null);
  const blocksContainerRef = useRef<HTMLDivElement>(null);
  const blockInfoRef = useRef<BlockInfo>({ numCols: 0, numRows: 0, numBlocks: 0 });
  const lastEnterTimesRef = useRef<Map<number, number>>(new Map());
  const [blocksReady, setBlocksReady] = useState(false);

  // Store event listeners for cleanup
  const eventListenersRef = useRef<Map<Element, () => void>>(new Map());

  // Create tiles
  const createTiles = (row: number, col: number) => {
    const xPercent = (col / (COLS - 1)) * 100;
    const yPercent = (row / (ROWS - 1)) * 100;
    const bgPosition = `${xPercent}% ${yPercent}%`;

    return (
      <div key={`${row}-${col}`} className="tile relative flex-1 transform-style-preserve-3d">
        <div 
          className="tile-face tile-front absolute w-full h-full backface-hidden rounded-md overflow-hidden"
          style={{ 
            backgroundImage: "url('/1.png')",
            backgroundSize: "600% 600%",
            backgroundPosition: bgPosition
          }}
        />
        <div 
          className="tile-face tile-back absolute w-full h-full backface-hidden rounded-md overflow-hidden"
          style={{ 
            backgroundImage: "url('/2.png')",
            backgroundSize: "600% 600%",
            backgroundPosition: bgPosition,
            transform: 'rotateX(180deg)'
          }}
        />
      </div>
    );
  };

  // Create board
  const createBoard = () => {
    const rows = [];
    for (let i = 0; i < ROWS; i++) {
      const cols = [];
      for (let j = 0; j < COLS; j++) {
        cols.push(createTiles(i, j));
      }
      rows.push(
        <div key={i} className="row flex flex-1 gap-1">
          {cols}
        </div>
      );
    }
    return rows;
  };

  // Animate individual tile
  const animateTile = (tile: HTMLDivElement, tiltY: number) => {
    gsap.timeline()
      .set(tile, { rotationX: isFlipped ? 180 : 0, rotationY: 0 })
      .to(tile, {
        rotationX: isFlipped ? 450 : 270,
        rotationY: tiltY,
        duration: 0.5,
        ease: "power2.out",
      })
      .to(tile, {
        rotationX: isFlipped ? 540 : 360,
        rotationY: 0,
        duration: 0.5,
        ease: "power2.out",
      }, "-=0.25");
  };

  // Flip all tiles
  const flipAllTiles = () => {
    if (!boardRef.current) return;
    
    const tiles = boardRef.current.querySelectorAll('.tile');
    setIsFlipped(!isFlipped);
    
    gsap.to(Array.from(tiles), {
      rotationX: !isFlipped ? 180 : 0,
      duration: 1,
      stagger: {
        amount: 0.5,
        from: "random",
      },
      ease: "power2.out",
    });
  };

  // Initialize component
  useEffect(() => {
    // Create blocks and initialize block info
    const initializeBlocks = () => {
      if (typeof window === 'undefined' || !blocksContainerRef.current) return;
      
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const numCols = Math.ceil(screenWidth / BLOCK_SIZE);
      const numRows = Math.ceil(screenHeight / BLOCK_SIZE);
      const numBlocks = numCols * numRows;

      blockInfoRef.current = { numCols, numRows, numBlocks };
      setBlocksReady(true);
    };

    // Initialize tile animations
    const initializeTileAnimation = () => {
      if (!boardRef.current) return;
      
      const tiles = boardRef.current.querySelectorAll('.tile');
      
      // Clean up previous event listeners
      eventListenersRef.current.forEach((removeListener, element) => {
        removeListener();
      });
      eventListenersRef.current.clear();

      tiles.forEach((tile, index) => {
        const htmlTile = tile as HTMLDivElement;
        
        const handleMouseEnter = () => {
          const currentTime = Date.now();
          const lastEnterTime = lastEnterTimesRef.current.get(index) || 0;
          
          if (currentTime - lastEnterTime > COOLDOWN) {
            lastEnterTimesRef.current.set(index, currentTime);

            let tiltY;
            if (index % 6 === 0) {
              tiltY = -40;
            } else if (index % 6 === 5) {
              tiltY = 40;
            } else if (index % 6 === 1) {
              tiltY = -20;
            } else if (index % 6 === 4) {
              tiltY = 20;
            } else if (index % 6 === 2) {
              tiltY = -10;
            } else {
              tiltY = 10;
            }

            animateTile(htmlTile, tiltY);
          }
        };

        htmlTile.addEventListener('mouseenter', handleMouseEnter);
        
        // Store cleanup function
        const removeListener = () => {
          htmlTile.removeEventListener('mouseenter', handleMouseEnter);
        };
        
        eventListenersRef.current.set(htmlTile, removeListener);
      });
    };

    // Highlight block on mouse move
    const highlightBlock = (e: MouseEvent) => {
      if (!blocksContainerRef.current || !blocksReady) return;
      
      const { numCols } = blockInfoRef.current;
      const rect = blocksContainerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const col = Math.floor(x / BLOCK_SIZE);
      const row = Math.floor(y / BLOCK_SIZE);
      const index = row * numCols + col + 6;

      const block = blocksContainerRef.current.children[index] as HTMLElement;
      if (block) {
        block.classList.add('border-white');
        setTimeout(() => {
          block.classList.remove('border-white');
        }, 250);
      }
    };

    // Initialize everything
    initializeBlocks();
    initializeTileAnimation();
    
    document.addEventListener('mousemove', highlightBlock);
    
    // Cleanup function
    return () => {
      document.removeEventListener('mousemove', highlightBlock);
      
      // Clean up tile event listeners
      eventListenersRef.current.forEach((removeListener) => {
        removeListener();
      });
      eventListenersRef.current.clear();
    };
  }, [blocksReady, isFlipped]); // Add isFlipped as dependency

  // Create blocks for rendering
  const renderBlocks = () => {
    if (!blocksReady || !blockInfoRef.current.numBlocks) {
      return null;
    }
    
    const blocks = [];
    const numBlocks = blockInfoRef.current.numBlocks;
    
    for (let i = 0; i < numBlocks; i++) {
      blocks.push(
        <div 
          key={i}
          className="block w-[50px] h-[50px] border border-transparent"
          data-index={i}
        />
      );
    }
    return blocks;
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 w-full flex justify-between items-center px-4 md:px-8 lg:px-8 py-8 mt-10 lg:mt-16 z-10 pointer-events-none sm:mt-12">
        <button 
          id="flipButton"
          onClick={flipAllTiles}
          className="pointer-events-auto border-none outline-none text-white bg-black rounded px-4 py-2 uppercase text-sm hover:bg-gray-800 transition-colors lg:text-xl"
        >
          Flip Tiles
        </button>
      </nav>

      {/* Board with tiles */}
      <section 
        ref={boardRef}
        className="board w-full h-full p-1 flex flex-col gap-1 relative z-1 perspective-100"
      >
        {createBoard()}
      </section>

      {/* Blocks container for mouse effect */}
      <div className="blocks-container fixed top-0 left-0 w-screen h-screen overflow-hidden pointer-events-none z-20">
        <div 
          ref={blocksContainerRef}
          id="blocks"
          className="w-[105vw] h-screen flex flex-wrap justify-start items-start overflow-hidden"
        >
          {renderBlocks()}
        </div>
      </div>
    </div>
  );
}