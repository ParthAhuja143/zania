import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';

const ImageLoader = ({ src, alt, className, circle, height, width }: {src: string, alt: string, className?: string, circle: boolean, height?: string | number | undefined, width?: string | number | undefined }) => {
  const loadedImages: Record<string, boolean> = {};
  const [loaded, setLoaded] = useState(false);

  const onLoad = () => {
    loadedImages[src] = true;
    setLoaded(true);
  }

  return (
    <>
      {!loaded && (
        <Skeleton
        circle={circle}
        height={height}
        width={width}
        className={`${className}`}
        />
      )}
      <img
        alt={alt || ''}
        className={`${className || ''} ${loaded ? 'is-img-loaded' : 'is-img-loading'}`}
        onLoad={onLoad}
        style={{ display: !loaded ? 'none' : undefined }}
        src={src}
      />
    </>
  );
};

export default ImageLoader;
