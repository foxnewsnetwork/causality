import React, { useEffect, useRef, createContext, useCallback, useMemo } from 'react';
import './style.css';
import { reject } from 'ramda';

type Props = {
  stream: MediaStream;
  children: React.ReactNode;
}

type API = {
  takePicture(): Promise<Blob>;
}
const ApiCtx: React.Context<API> = createContext({
  takePicture: () => Promise.reject(new Error("not ready"));
})

export default function StreamVideo(props: Props) {
  const vRef: React.RefObject<HTMLVideoElement> = useRef(null);
  const cRef: React.RefObject<HTMLCanvasElement> = useRef(null);
  const takePicture: API["takePicture"] = useCallback(() => {
    if (cRef.current != null && vRef.current != null) {
      const ctx = cRef.current.getContext('2d');
      ctx?.drawImage(vRef.current, 0, 0);
      return new Promise((resolve, reject) => {
        if (cRef.current != null) {
          cRef.current.toBlob((blob) => {
            if (blob != null) {
              resolve(blob);
            } else {
              reject(new Error("unable to capture blob"));
            }
          }, "image/png");
        } else {
          reject(new Error("canvas not available"));
        }
      })
    } else {
      return Promise.reject("Either canvas or the video element are unavailable");
    }
  }, [cRef, vRef]);

  const api = useMemo(() => ({
    takePicture
  }), [takePicture]);

  useEffect(() => {
    if (vRef?.current != null) {
      vRef.current.srcObject = props.stream;
      vRef.current.play();
    }
  }, [vRef?.current]);

  return (
    <>
      <canvas className="stream-video-canvas" ref={cRef} />
      <video className="stream-video" ref={vRef}>
        <ApiCtx.Provider value={api}>
          {props.children}
        </ApiCtx.Provider>
      </video>
    </>
  )
}
