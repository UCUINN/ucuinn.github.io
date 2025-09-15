import { useState, useEffect } from 'react';
import { preloadImage, preloadImagesWithCallback } from '../utils/utils';

export function useImagePreload(src: string) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!src) return;

    setIsLoading(true);
    setError(null);

    preloadImage(src)
      .then(() => {
        setIsLoaded(true);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [src]);

  return { isLoaded, isLoading, error };
}

export function useImagesPreload(sources: string[]) {
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Error[]>([]);
  const [allLoaded, setAllLoaded] = useState(false);

  useEffect(() => {
    if (!sources.length) return;

    setIsLoading(true);
    setLoadedCount(0);
    setErrors([]);
    setAllLoaded(false);

    preloadImagesWithCallback(
      sources,
      (loaded, total) => {
        setLoadedCount(loaded);
        if (loaded === total) {
          setIsLoading(false);
          setAllLoaded(true);
        }
      }
    ).catch((error) => {
      setErrors(prev => [...prev, error]);
      setIsLoading(false);
    });
  }, [sources]);

  return {
    loadedCount,
    totalCount: sources.length,
    isLoading,
    allLoaded,
    errors,
    progress: sources.length > 0 ? (loadedCount / sources.length) * 100 : 0
  };
}