import React from 'react';
import { Container } from '@material-ui/core';
import VideoEcho from 'components/VideoEcho';
import './style.css';

const Home = () => {
  return (
    <main className="home">
      <Container>
        <VideoEcho>

        </VideoEcho>
      </Container>
    </main>
  )
}

export default Home;
