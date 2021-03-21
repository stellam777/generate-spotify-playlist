import React from 'react';
import SingleTrack from './SingleTrack';

const Playlist = ({ recResults, auth, deviceId, playerState }) => {
  return (
    <div className='col-lg-9'>
      <div className='row m-4'>
        <div className='col'>
          <h2>Your Playlist:</h2>
        </div>
        <div className='col'>
          <p className='text-right track-count'>
            <strong>Track count: {recResults.length}</strong>
          </p>
        </div>
      </div>
      {recResults.map((track) => {
        return (
          <SingleTrack
            key={track.id}
            trackName={track.name}
            duration={track.duration_ms}
            artistName={track.artists[0].name}
            imageUrl={track.album.images[1].url}
            uri={track.uri}
            auth={auth}
            deviceId={deviceId}
            playerState={playerState}
          />
        );
      })}
    </div>
  );
};

export default Playlist;
