import React, { useEffect, useRef } from 'react';
import './style.css';

type Props = {
  stream: MediaStream;
  children: React.ReactNode;
}

export default function StreamVideo(props: Props) {
  const vRef: React.RefObject<HTMLVideoElement> = useRef(null);

  useEffect(() => {
    if (vRef?.current != null) {
      vRef.current.srcObject = props.stream;
      vRef.current.play();
    }
  }, [vRef?.current]);

  return (
    <video className="stream-video" ref={vRef}>
      {props.children}
    </video>
  )
}
