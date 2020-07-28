import React from 'react';
import useSuspense from 'hooks/use-suspense';
import Loading from 'components/Loading';
import StreamVideo from 'components/StreamVideo';

const screenMedia = () => (
  navigator.mediaDevices.getDisplayMedia({ audio: false, video: true })
)

const EchoStream = () => {
  const suspender = useSuspense(screenMedia);

  return (
    <StreamVideo stream={suspender.read()}>
      Uh-oh, video unavailable
    </StreamVideo>
  )
}

const VideoEcho = () => {
  return (
    <React.Suspense fallback={<Loading />}>
      <EchoStream />
    </React.Suspense>
  )
}

export default VideoEcho;
