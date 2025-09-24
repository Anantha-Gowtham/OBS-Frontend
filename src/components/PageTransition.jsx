import React from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Lightweight page transition wrapper using CSS classes.
 * Wrap the <Routes /> output so each location change animates.
 */
const PageTransition = ({ children }) => {
  const location = useLocation();
  const [displayed, setDisplayed] = React.useState(children);
  const [state, setState] = React.useState('enter'); // enter | exit

  React.useEffect(() => {
    // Trigger exit animation
    setState('exit');
    const timeout = setTimeout(() => {
      setDisplayed(children);
      setState('enter');
    }, 260); // exit duration
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <div
      key={location.pathname}
      className={
        state === 'enter'
          ? 'page-transition-enter page-transition-enter-active'
          : 'page-transition-exit page-transition-exit-active'
      }
      style={{ minHeight: '100%', width: '100%' }}
    >
      {displayed}
    </div>
  );
};

export default PageTransition;
