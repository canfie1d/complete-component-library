import { useState, useRef } from 'react';
import Image from './Image';

const ProgressiveImage = props => {
  const [highResImageLoaded, setHighResImageLoaded] = useState(false);
  const ref = useRef(null);

  return (
    <>
      <Image
        {...props}
        onLoad={() => {
          setHighResImageLoaded(true);
        }}
        ref={ref}
        src={props.src}
        alt=''
      />
      <Image
        {...props}
        fluid
        style={{
          position: 'absolute',
          filter: 'blur(1px)',
          clipPath: 'inset(0)',
          ...(!highResImageLoaded && { transition: 'opacity ease-in 500ms' }),
          ...(highResImageLoaded && { opacity: 0 }),
        }}
        src={props.placeholderSrc}
        alt=''
      />
    </>
  );
};

export default ProgressiveImage;
