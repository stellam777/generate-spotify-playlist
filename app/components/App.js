import React, { useState, useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import axios from 'axios';
import Script from 'react-load-script';
import Home from './Home';
import querystring from 'query-string';
import PlaylistGenerator from './PlaylistGenerator';

function App() {
  const [auth, setAuth] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [scriptLoaded, setScriptLoaded] = useState(null);
  const [scriptError, setScriptError] = useState(null);
  const [deviceId, setDeviceId] = useState(null);
  const [playerState, setPlayerState] = useState(null);
  //const [clientToken, setClientToken] = useState(null);

  useEffect(async () => {
    const { data } = await axios.get('/auth/current-session');
    setAuth(data);
  }, []);

  useEffect(async () => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      handleLoadSuccess();
    };
  }, [auth]);

  const handleLoadSuccess = () => {
    setScriptLoaded(true);
    console.log('Script loaded');
    const token = auth.token;
    const player = new window.Spotify.Player({
      name: 'Web Playback SDK Quick Start Player',
      getOAuthToken: (cb) => {
        cb(token);
      },
    });
    console.log(player);

    // Error handling
    player.addListener('initialization_error', ({ message }) => {
      console.error(message);
    });
    player.addListener('authentication_error', ({ message }) => {
      console.error(message);
    });
    player.addListener('account_error', ({ message }) => {
      console.error(message);
    });
    player.addListener('playback_error', ({ message }) => {
      console.error(message);
    });

    // Playback status updates
    player.addListener('player_state_changed', (state) => {
      console.log(state);
      setPlayerState(state.paused);
    });

    // Ready
    player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id);
      setDeviceId(device_id);
    });

    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
    });

    // Connect to the player!
    player.connect();
  };

  const cb = (token) => {
    return token;
  };

  const handleScriptCreate = () => {
    setScriptLoaded(false);
    console.log('Script created');
  };

  const handleScriptError = () => {
    setScriptError(true);
    console.log('Script error');
  };

  const handleScriptLoad = () => {
    setScriptLoaded(true);
    console.log('Script loaded');
  };

  //when you have new token in place then can get rid of this!
  // if (!auth || auth === false) {
  //   return (
  //     <div className='container mt-4'>
  //       <Route to='/' component={Home} />
  //     </div>
  //   );
  // }

  if (auth) {
    return (
      <div>
        <header>
          <Script
            url='https://sdk.scdn.co/spotify-player.js'
            onCreate={handleScriptCreate}
            onError={handleScriptError}
            onLoad={handleScriptLoad}
          />
        </header>
        <PlaylistGenerator
          deviceId={deviceId}
          auth={auth}
          playerState={playerState}
        />
      </div>
    );
  }

  if (!auth || auth === false) {
    return (
      <div>
        <PlaylistGenerator />
      </div>
    );
  }
}

export default App;
