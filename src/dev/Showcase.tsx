import React, {useEffect, useState} from 'react';
import {AbsoluteFill, continueRender, delayRender, staticFile} from 'remotion';

/** Dev helper: renders examples/showcase.html (copied into public/_shots by tools/shot.mjs) as a still. */
export const Showcase: React.FC<{src: string}> = ({src}) => {
  const [handle] = useState(() => delayRender('showcase'));
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (!loaded) return;
    const t = setTimeout(() => continueRender(handle), 2500); // let web fonts settle
    return () => clearTimeout(t);
  }, [loaded, handle]);
  return (
    <AbsoluteFill>
      <iframe src={staticFile(src)} onLoad={() => setLoaded(true)} style={{width: '100%', height: '100%', border: 0}} />
    </AbsoluteFill>
  );
};
