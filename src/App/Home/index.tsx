import React from 'react';
import { Container } from '@material-ui/core';


const useScreenCaptureStream = async () => {
  const captureStream = await navigator.mediaDevices.getDisplayMedia({ audio: false, video: true });

}

const Home = () => {
  return (
    <main>
      <p>App Spacer</p>
      <p>App Spacer</p>
      <Container>

      </Container>
    </main>
  )
}

export default Home;
