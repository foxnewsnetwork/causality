import React from 'react';
import { Container } from '@material-ui/core';
import useSuspense from 'hooks/use-suspense';
import Loading from 'components/Loading';
import StreamVideo from 'components/StreamVideo';
import './style.css';

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

const Home = () => {
  return (
    <main className="home">
      <Container>
        <VideoEcho />
      </Container>
    </main>
  )
}

export default Home;
