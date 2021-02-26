import React from 'react';

const SingleTrack = ({ imageUrl, artistName, trackName, duration }) => {

  const millisToMinutesAndSeconds = (duration) => {
    var minutes = Math.floor(duration / 60000);
    var seconds = ((duration % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  return (
    <div className='row m-4'>
      <div className='col-2'>
        <img src={imageUrl} />
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
