import React, { useState, useEffect } from 'react';
import axios from "axios";

const SingleTrack = ({ imageUrl, artistName, trackName, duration, auth, deviceId, uri }) => {

  const [isPlaying, setIsPlaying] = useState(false);
  const [playerData, setPlayerData] = useState(null);
  const token = auth.token;

  const millisToMinutesAndSeconds = (duration) => {
    let minutes = Math.floor(duration / 60000);
    let seconds = ((duration % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  // useEffect(async () => {
  //   let mounted = true;
  //   const token = auth.token;
  //   const { data } = await axios.get('https://api.spotify.com/v1/me/player', {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  //   if(mounted) {
  //     if(data) {
  //       setPlayerData(data)
  //     }
  //   }
  //   return () => (mounted = false);

  // }, []);

  const play = async (uri) => {
    const selectedUri = JSON.stringify({ uris: [uri] });
    const { data } = await axios.put(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, selectedUri, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setIsPlaying(true);
  }

  const pause = async () => {
    const { data } = await axios.put(`https://api.spotify.com/v1/me/player/pause`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    setIsPlaying(false);
    console.log("PAUSE", data)
  }

  console.log("isPlaying?", isPlaying)

  return (
    <div className='row m-4' onClick={isPlaying ? pause : () => play(uri)}>
      <div className='col-2'>
        <img src={imageUrl}/>
      </div>
      <div className='col-8'>
        <h4>{trackName}</h4>
        <p>{artistName}</p>
      </div>
      <div className='col-2'>
        <p className='text-right'>{millisToMinutesAndSeconds(duration)}</p>
      </div>
    </div>
  );
};

export default SingleTrack;
