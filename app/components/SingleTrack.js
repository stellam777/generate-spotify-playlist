import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlay, FaPause } from 'react-icons/fa';

const SingleTrack = ({
  imageUrl,
  artistName,
  trackName,
  duration,
  auth,
  deviceId,
  uri,
  playerState,
  externalUrl
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerData, setPlayerData] = useState(null);
  const [isHovered, setIsHovered] = useState(null);
  const token = auth.token;

  const millisToMinutesAndSeconds = (duration) => {
    let minutes = Math.floor(duration / 60000);
    let seconds = ((duration % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  };

  const play = async (uri, externalUrl, e) => {
    //if playerState is paused
    if(auth) {
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
      }
    } else {
        window.open(externalUrl);
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
    }
  };

  return (
    <div
      className='row mt-4 ml-0 mr-4 flex-nowrap'
      onClick={isPlaying ? pause : (e) => play(uri, externalUrl, e)}
    >
      <div
        className='col-lg-2 col-md-2 col-sm-4 play-img-parent'
        onMouseEnter={() => setIsHovered(!isHovered)}
        onMouseLeave={() => setIsHovered(!isHovered)}
        >
        <span>
          {isHovered && !isPlaying && <FaPlay size={50} style={{ position: 'absolute', left: '40', top: '30' }}/>}
          {isPlaying && <FaPause size={50} style={{ position: 'absolute', left: '40', top: '30' }}/>}
        </span>
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
