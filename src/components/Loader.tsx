// components/Loader.tsx
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Loader = ({ onComplete }: { onComplete: () => void }) => {
  const counter3Ref = useRef<HTMLDivElement>(null);
  const counter2Ref = useRef<HTMLDivElement>(null);
  const counter1Ref = useRef<HTMLDivElement>(null);
  const loader1Ref = useRef<HTMLDivElement>(null);
  const loader2Ref = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const loadingScreenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create numbers for counter-3
    if (counter3Ref.current) {
      for(let i = 0; i < 2; i++){
        for(let j = 0; j < 10; j++){
          const div = document.createElement('div');
          div.className = 'h-[51px] md:h-[102px] leading-[51px] md:leading-[102px] text-[50px] md:text-[100px]';
          div.textContent = j.toString();
          counter3Ref.current.appendChild(div);
        }
      }

      const finalDiv = document.createElement('div');
      finalDiv.className = 'h-[51px] md:h-[102px] leading-[51px] md:leading-[102px] text-[50px] md:text-[100px]';
      finalDiv.textContent = '0';
      counter3Ref.current.appendChild(finalDiv);
    }

    function animate(counter: HTMLElement | null, duration: number, delay = 0){
      if (!counter) return;
      
      const numElement = counter.querySelector("div");
      if (!numElement) return;
      
      const numHeight = numElement.clientHeight;
      const totalDistance = (counter.querySelectorAll("div").length - 1) * numHeight;

      gsap.to(counter, {
        y: -totalDistance,
        duration: duration,
        delay: delay,
        ease: "power2.inOut",
        onComplete: function() {
          gsap.set(counter, { y: -totalDistance });
        }
      });
    }

    // Start animations
    setTimeout(() => {
      animate(counter3Ref.current, 6);
      animate(counter2Ref.current, 6);
      animate(counter1Ref.current, 2, 4);

      // Fixed animations
      gsap.to(".digit", {
        y: -75, // Reduced for mobile
        stagger: 0.25,
        delay: 0,
        duration: 1,
        ease: "power4.inOut"
      });

      if (loader1Ref.current) {
        gsap.from(loader1Ref.current, {
          width: "0%",
          duration: 6,
          ease: "power2.inOut"
        });
      }

      if (loader2Ref.current) {
        gsap.from(loader2Ref.current, {
          width: "0%",
          delay: 1.9,
          duration: 2,
          ease: "power2.inOut"
        });
      }

      if (loaderRef.current) {
        gsap.to(loaderRef.current, {
          backgroundColor: "transparent",
          delay: 6,
          duration: 0.1
        });

        gsap.to(loaderRef.current, {
          scale: 40,
          duration: 1,
          delay: 7,
          ease: "power2.inOut"
        });

        gsap.to(loaderRef.current, {
          rotation: 45,
          y: 500,
          x: 2000,
          duration: 1,
          delay: 7,
          ease: "power2.inOut"
        });
      }

      if (loader1Ref.current) {
        gsap.to(loader1Ref.current, {
          rotation: 90,
          y: -25, // Reduced for mobile
          duration: 0.5,
          delay: 6
        });
      }

      if (loader2Ref.current) {
        gsap.to(loader2Ref.current, {
          x: -37, // Reduced for mobile
          y: 37,  // Reduced for mobile
          duration: 0.5,
          delay: 6
        });
      }

      if (loadingScreenRef.current) {
        gsap.to(loadingScreenRef.current, {
          opacity: 0,
          duration: 0.5,
          delay: 7.5,
          ease: "power1.inOut",
          onComplete: onComplete
        });
      }

    }, 100);

  }, [onComplete]);

  return (
    <div 
      ref={loadingScreenRef} 
      className="fixed top-0 left-0 w-full h-full bg-black text-white pointer-events-none z-[9999] flex items-center justify-center"
    >
      {/* Responsive loader bars */}
      <div 
        ref={loaderRef} 
        className="absolute top-1/2 left-1/2 w-[150px] md:w-[300px] h-[25px] md:h-[50px] -translate-x-1/2 -translate-y-1/2 flex bg-gray-600 z-[10000]"
      >
        <div 
          ref={loader1Ref} 
          className="relative bg-white w-[100px] md:w-[200px] h-[25px] md:h-[50px]"
        ></div>
        <div 
          ref={loader2Ref} 
          className="relative bg-white w-[50px] md:w-[100px] h-[25px] md:h-[50px]"
        ></div>
      </div>

      {/* Responsive counter */}
      <div className="fixed left-[20px] md:left-[50px] bottom-[20px] md:bottom-[50px] flex h-[51px] md:h-[102px] text-[50px] md:text-[100px] leading-[51px] md:leading-[102px] font-normal overflow-hidden z-[10000]">
        <div ref={counter1Ref} className="relative top-[-7px] md:top-[-15px] digit">
          <div className="h-[51px] md:h-[102px] leading-[51px] md:leading-[102px] text-[50px] md:text-[100px]">0</div>
          <div className="h-[51px] md:h-[102px] leading-[51px] md:leading-[102px] text-[50px] md:text-[100px]">0</div>
          <div className="h-[51px] md:h-[102px] leading-[51px] md:leading-[102px] text-[50px] md:text-[100px]">0</div>
          <div className="h-[51px] md:h-[102px] leading-[51px] md:leading-[102px] text-[50px] md:text-[100px] relative right-0">1</div>
        </div>
        <div ref={counter2Ref} className="relative top-[-7px] md:top-[-15px] digit">
          <div className="h-[51px] md:h-[102px] leading-[51px] md:leading-[102px] text-[50px] md:text-[100px]">0</div>
          <div className="h-[51px] md:h-[102px] leading-[51px] md:leading-[102px] text-[50px] md:text-[100px] relative right-[-5px] md:right-[-10px]">1</div>
          <div className="h-[51px] md:h-[102px] leading-[51px] md:leading-[102px] text-[50px] md:text-[100px]">2</div>
          <div className="h-[51px] md:h-[102px] leading-[51px] md:leading-[102px] text-[50px] md:text-[100px]">3</div>
          <div className="h-[51px] md:h-[102px] leading-[51px] md:leading-[102px] text-[50px] md:text-[100px]">4</div>
          <div className="h-[51px] md:h-[102px] leading-[51px] md:leading-[102px] text-[50px] md:text-[100px]">5</div>
          <div className="h-[51px] md:h-[102px] leading-[51px] md:leading-[102px] text-[50px] md:text-[100px]">6</div>
          <div className="h-[51px] md:h-[102px] leading-[51px] md:leading-[102px] text-[50px] md:text-[100px]">7</div>
          <div className="h-[51px] md:h-[102px] leading-[51px] md:leading-[102px] text-[50px] md:text-[100px]">8</div>
          <div className="h-[51px] md:h-[102px] leading-[51px] md:leading-[102px] text-[50px] md:text-[100px]">9</div>
          <div className="h-[51px] md:h-[102px] leading-[51px] md:leading-[102px] text-[50px] md:text-[100px]">0</div>
        </div>
        <div ref={counter3Ref} className="relative top-[-7px] md:top-[-15px] digit"></div>
      </div>
    </div>
  );
};

export default Loader;