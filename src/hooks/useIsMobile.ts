import { useEffect, useState } from 'react';

const QUERY = '(max-width: 760px)';

/** True when the scroll should render as a plain vertical page. Must match the CSS breakpoint. */
export function useIsMobile() {
  const [mobile, setMobile] = useState(() => matchMedia(QUERY).matches);

  useEffect(() => {
    const mq = matchMedia(QUERY);
    const onChange = () => setMobile(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return mobile;
}
