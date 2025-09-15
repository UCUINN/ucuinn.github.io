import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Performance utilities
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate?: boolean
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };

    const callNow = immediate && !timeout;

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) func(...args);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Image preloading utilities
export function preloadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export function preloadImages(sources: string[]): Promise<HTMLImageElement[]> {
  return Promise.all(sources.map(preloadImage));
}

export async function preloadImagesWithCallback(
  sources: string[],
  onProgress?: (loaded: number, total: number) => void
): Promise<HTMLImageElement[]> {
  const total = sources.length;
  let loaded = 0;

  const promises = sources.map(async (src) => {
    try {
      const img = await preloadImage(src);
      loaded++;
      onProgress?.(loaded, total);
      return img;
    } catch (error) {
      loaded++;
      onProgress?.(loaded, total);
      throw error;
    }
  });

  return Promise.all(promises);
}

// Lazy image loading utility
export function createLazyImage(
  src: string,
  placeholder?: string
): {
  currentSrc: string;
  load: () => Promise<void>;
  isLoaded: boolean;
} {
  let isLoaded = false;
  let currentSrc = placeholder || '';

  const load = async (): Promise<void> => {
    if (isLoaded) return;

    try {
      await preloadImage(src);
      currentSrc = src;
      isLoaded = true;
    } catch (error) {
      console.error('Failed to load image:', src, error);
      throw error;
    }
  };

  return { currentSrc, load, isLoaded };
}