import React from 'react';
import { Link } from 'react-router-dom';

const Home = (props) => {
  return (
    <div className="container">
      <h1>Welcome to Spotify Playlist Generator</h1>
      <h2>Click the button below to login with Spotify</h2>
      <a href={'/auth/login'}><button className="btn custom-btn" type='click'>Login Here</button></a>
    </div>
  )
}

export default Home;
