import React from 'react';
import SingleTrack from './SingleTrack';


const Playlist = ({ recResults, auth, deviceId }) => {

  return (
    <div className="col-lg-9">
      <div className="row m-4">
        <div className="col">
          <h2>Tracklist</h2>
        </div>
        <div className="col">
          <p className="text-right"><strong>Track count: {recResults.length}</strong></p>
        </div>
      </div>
      {recResults.map((track) => {
        return (
          <SingleTrack
            key={track.id}
            trackName={track.name}
            duration={track.duration_ms}
            artistName={track.artists[0].name}
            imageUrl={track.album.images[2].url}
            uri={track.uri}
            auth={auth}
            deviceId={deviceId}
          />
        )
      })}
    </div>
  )
}

export default Playlist;
