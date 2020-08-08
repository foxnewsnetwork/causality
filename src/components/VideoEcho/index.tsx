import React, { useContext } from 'react';
import useSuspense from 'hooks/use-suspense';
import Loading from 'components/Loading';
import StreamVideo, { StreamVideoContext } from 'components/StreamVideo';
import { Props } from './type';
import PictureEcho from 'components/PictureEcho';

const Suspense = (React.Suspense as unknown as React.ComponentClass<any>)

const screenMedia = () => (
  navigator.mediaDevices.getDisplayMedia({ audio: false, video: true })
)

const StreamToPic = () => {
  const api = useContext(StreamVideoContext);

  return <PictureEcho takePicture={api.takePicture} />
}

const EchoStream = (props: Props) => {
  const suspender = useSuspense(screenMedia);

  return (
    <StreamVideo stream={suspender.read()}>
      <StreamToPic />
    </StreamVideo>
  )
}

const VideoEcho = (props: Props) => {
  return (
    <Suspense fallback={<Loading />}>
      <EchoStream>
        {props.children}
      </EchoStream>
    </Suspense>
  )
}

export default VideoEcho;
