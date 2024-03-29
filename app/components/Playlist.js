import React from 'react';
import SingleTrack from './SingleTrack';

const Playlist = ({ recResults, auth, deviceId, playerState, setSongCount, songCount }) => {
  localStorage.setItem('tracks', JSON.stringify(recResults));
  return (
    <div className='col-lg-9'>
      <div className='d-flex justify-content-between align-items-center mt-4'>
        <div>
          <h2>Your Playlist:</h2>
        </div>
        <div>
          <div className="dropdown">
            <button className="btn btn-sm count-btn dropdown-toggle float-right" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Track Count: {songCount}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item" onClick={() => setSongCount(25)}>25</a>
              <a className="dropdown-item" onClick={() => setSongCount(50)}>50</a>
              <a className="dropdown-item" onClick={() => setSongCount(100)}>100</a>
            </div>
          </div>
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
            externalUrl={track.external_urls.spotify}
          />
        );
      })}
    </div>
  );
};

export default Playlist;
