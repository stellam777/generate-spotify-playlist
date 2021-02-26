import React from 'react';
import SingleTrack from './SingleTrack';

const Playlist = ({ recResults }) => {
//console.log("HI FROM PLAYLIST", selectedSearchStrings)
  return (
    <div className="container-fluid mt-4">
      <div className="row m-4">
        <div className="col">
          <h2>Tracklist</h2>
        </div>
        <div className="col">
          <p className="text-right">Track count:{recResults.length} </p>
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
          />
        )
      })}
    </div>
  )
}

export default Playlist;
