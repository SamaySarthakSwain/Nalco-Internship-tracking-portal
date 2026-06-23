import React, { useEffect, useRef } from 'react';

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  customSize?: boolean;
}

const GlowCard: React.FC<GlowCardProps> = ({ children, className = '', customSize = false }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cardRef.current && innerRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        cardRef.current.style.setProperty('--mouse-x', `${x}px`);
        cardRef.current.style.setProperty('--mouse-y', `${y}px`);
        innerRef.current.style.setProperty('--mouse-x', `${x}px`);
        innerRef.current.style.setProperty('--mouse-y', `${y}px`);
      }
    };
    const element = cardRef.current;
    if (element) {
      element.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      if (element) {
        element.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  const getInlineStyles = () => {
    const baseColors = {
      light: '#e0e0e0',
      dark: '#1a1a1a',
      accent1: '#4a90e2',
      accent2: '#50e3c2'
    };
    return {
      '--backdrop': baseColors.light,
      '--radius': '14px',
      '--border-size': '2px',
      '--base': 80,
      '--spread': 500,
      '--outer': 50,
      '--base-color': baseColors.dark,
      '--accent-1': baseColors.accent1,
      '--accent-2': baseColors.accent2
    } as React.CSSProperties;
  };

  const getSizeClasses = () => {
    if (customSize) return '';
    return 'w-64 h-80 max-w-[280px] max-h-[360px] md:w-72 md:h-96 md:max-w-[320px] md:max-h-[400px]';
  };

  const beforeAfterStyles = `
    [data-glow] {
      --mouse-x: 50%;
      --mouse-y: 50%;
    }
    [data-glow]::before, [data-glow]::after {
      content: "";
      position: absolute;
      inset: calc(var(--border-size) * -1);
      border-radius: calc(var(--radius) * 1.5);
      background: radial-gradient(
        calc(var(--base) * 1px) circle at var(--mouse-x) var(--mouse-y),
        var(--base-color),
        transparent 80%
      ), radial-gradient(
        calc(var(--spread) * 1px) circle at var(--mouse-x) var(--mouse-y),
        var(--accent-1),
        transparent 80%
      ), radial-gradient(
        calc(var(--outer) * 1px) circle at var(--mouse-x) var(--mouse-y),
        var(--accent-2),
        transparent 80%
      );
      opacity: 0;
      transition: opacity 0.5s ease;
      z-index: -1;
    }
    [data-glow]:hover::before, [data-glow]:hover::after {
      opacity: 1;
    }
    [data-glow]::after {
      filter: blur(calc(var(--border-size) * 10));
      background: none;
      pointer-events: none;
      border: none;
    }
    [data-glow] > [data-glow]::before {
      inset: -10px;
      border-width: 10px;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: beforeAfterStyles }} />
      <div
        ref={cardRef}
        data-glow
        style={getInlineStyles()}
        className={`
          ${getSizeClasses()}
          ${!customSize ? 'aspect-[3/4]' : ''}
          rounded-2xl relative grid grid-rows-[1fr_auto] 
          shadow-[0_1rem_2rem_-1rem_black] p-4 gap-4 
          backdrop-blur-[5px]
          ${className}
        `}
      >
        <div ref={innerRef} data-glow></div>
        {children}
      </div>
    </>
  );
};

export { GlowCard };
