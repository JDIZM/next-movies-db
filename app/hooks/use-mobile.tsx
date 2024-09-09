import { useEffect, useState } from 'react';

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
      return;
    }

    setIsMobile(false);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      setIsMobile(false);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { isMobile };
}
