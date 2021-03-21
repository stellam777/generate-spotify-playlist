import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SingleTrack = ({
  imageUrl,
  artistName,
  trackName,
  duration,
  auth,
  deviceId,
  uri,
  playerState
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerData, setPlayerData] = useState(null);
  const token = auth.token;

  const millisToMinutesAndSeconds = (duration) => {
    let minutes = Math.floor(duration / 60000);
    let seconds = ((duration % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  };

  const play = async (uri, e) => {
    //if playerState is paused
    if(playerState || playerState === null) {
      const selectedUri = JSON.stringify({ uris: [uri] });
      const { data } = await axios.put(
        `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
        selectedUri,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsPlaying(true);
      e.target.parentElement.classList.add("pause-img");
      e.target.parentElement.classList.remove("play-img");
    }
  };

  const pause = async (e) => {
    //if playerState is not paused
    if(!playerState) {
      const test = JSON.stringify({});
      const { data } = await axios.put(
        `https://api.spotify.com/v1/me/player/pause?device_id=${deviceId}`,
        test,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsPlaying(false);
      e.target.parentElement.classList.remove("pause-img");
      e.target.parentElement.classList.add("play-img");
    }
  };

  return (
    <div
      className='row m-4 flex-nowrap'
      onClick={isPlaying ? pause : (e) => play(uri, e)}
    >
      <div className='col-lg-2 col-md-2 col-sm-4 play-img'>
        <span></span>
        <img className='album-img' src={imageUrl} />
      </div>
      <div className='col-lg-10 col-md-10 col-sm-8 track-artist'>
        <div className='d-flex justify-content-between'>
          <h4 className="track-name">{trackName}</h4>
          <p className='text-right'>{millisToMinutesAndSeconds(duration)}</p>
        </div>
        <p className='track-line'>{artistName}</p>
      </div>
    </div>
  );
};

export default SingleTrack;
