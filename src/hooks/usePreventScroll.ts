import { useEffect } from 'react';

export const usePreventScroll = () => {
  useEffect(() => {
    // Prevent scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Force scroll to top on page load
    window.scrollTo(0, 0);

    // Prevent default scroll behavior
    const preventDefault = (e: Event) => {
      e.preventDefault();
    };

    // Add event listener for a brief moment
    window.addEventListener('scroll', preventDefault, { passive: false });

    // Remove the event listener after a short delay
    const timeoutId = setTimeout(() => {
      window.removeEventListener('scroll', preventDefault);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', preventDefault);
    };
  }, []);
};
