import { useEffect, useRef, useState } from 'react';

/**
 * useCountUp - animates a number from start (default 0) to end over duration.
 * @param {number} end - final value
 * @param {number} duration - ms duration (default 800)
 * @param {number} start - starting value (default 0)
 * @param {function} easing - optional easing function (t in [0,1])
 */
export default function useCountUp(end = 0, duration = 800, start = 0, easing) {
  const [value, setValue] = useState(start);
  const startRef = useRef(null);
  const prevEndRef = useRef(end);

  // Default easeOutCubic
  const ease = easing || ((t) => 1 - Math.pow(1 - t, 3));

  useEffect(() => {
    if (prevEndRef.current === end) return; // skip if unchanged
    prevEndRef.current = end;
    startRef.current = null;
    let frame;

    const step = (timestamp) => {
      if (!startRef.current) startRef.current = timestamp;
      const progress = Math.min((timestamp - startRef.current) / duration, 1);
      const eased = ease(progress);
      const current = start + (end - start) * eased;
      setValue(current);
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [end, duration, start, ease]);

  return value;
}
