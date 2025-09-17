import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';

interface LazySectionProps {
  id?: string;
  children: ReactNode;
  fallback: ReactNode;
  rootMargin?: string;
}

const LazySection = ({ id, children, fallback, rootMargin = '200px' }: LazySectionProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const margin = useMemo(() => rootMargin, [rootMargin]);

  useEffect(() => {
    if (isVisible) {
      return;
    }

    const node = containerRef.current;
    if (!node) {
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: margin }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [isVisible, margin]);

  return (
    <div ref={containerRef} id={!isVisible ? id : undefined}>
      {isVisible ? children : fallback}
    </div>
  );
};

export default LazySection;
