import { useEffect, useRef } from 'react';

function useIntersectionObserver(callback: IntersectionObserverCallback) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    observerRef.current = new IntersectionObserver(callback, {
      root: elementRef.current.parentNode as Element,
      threshold: 0.95,
    });

    observerRef.current.observe(elementRef.current);

    // eslint-disable-next-line consistent-return
    return () => observerRef.current?.disconnect();
  }, [callback]);

  return elementRef;
}

export default useIntersectionObserver;
