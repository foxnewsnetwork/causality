import React, { useEffect, useRef } from 'react';

type Props = {
  stream: MediaStream;
  children: React.ReactNode;
}

export default function StreamVideo(props: Props) {
  const vRef: React.RefObject<HTMLVideoElement> = useRef(null);

  useEffect(() => {
    if (vRef?.current != null) {
      vRef.current.srcObject = props.stream
    }
  }, [vRef?.current]);

  return (
    <video ref={vRef}>
      {props.children}
    </video>
  )
}
