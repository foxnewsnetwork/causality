import React, { useContext } from 'react';
import useSuspense from 'hooks/use-suspense';
import Loading from 'components/Loading';
import StreamVideo, { StreamVideoContext } from 'components/StreamVideo';
import { Props } from './type';
import PictureEcho from 'components/PictureEcho';

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
    <React.Suspense fallback={<Loading />}>
      <EchoStream>
        {props.children}
      </EchoStream>
    </React.Suspense>
  )
}

export default VideoEcho;
