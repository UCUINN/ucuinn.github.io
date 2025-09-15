import { useEffect, useRef, useState } from 'react';
import { useIntersectionObserver } from './useIntersectionObserver';

export function useScrollAnimation(threshold = 0.1, rootMargin = '0px') {
  const { ref, isVisible } = useIntersectionObserver({
    threshold,
    rootMargin,
    freezeOnceVisible: true
  });

  return { ref, isVisible };
}

export function useStaggeredAnimation(
  itemCount: number,
  delay = 100,
  threshold = 0.1
) {
  const [visibleItems, setVisibleItems] = useState<boolean[]>(
    new Array(itemCount).fill(false)
  );
  const { ref, isVisible } = useIntersectionObserver({
    threshold,
    freezeOnceVisible: true
  });

  useEffect(() => {
    if (isVisible) {
      const timeouts: NodeJS.Timeout[] = [];

      for (let i = 0; i < itemCount; i++) {
        const timeout = setTimeout(() => {
          setVisibleItems(prev => {
            const newState = [...prev];
            newState[i] = true;
            return newState;
          });
        }, i * delay);

        timeouts.push(timeout);
      }

      return () => {
        timeouts.forEach(clearTimeout);
      };
    }
  }, [isVisible, itemCount, delay]);

  return { ref, visibleItems, isVisible };
}

export function useParallax(speed = 0.5) {
  const [offset, setOffset] = useState(0);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        const elementTop = rect.top + scrolled;
        const elementHeight = rect.height;
        const windowHeight = window.innerHeight;

        // Calculate when element is in view
        if (scrolled + windowHeight > elementTop && scrolled < elementTop + elementHeight) {
          const parallaxOffset = (scrolled - elementTop) * speed;
          setOffset(parallaxOffset);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return { ref: elementRef, offset };
}