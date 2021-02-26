import React from 'react';

const SingleTrack = ({ imageUrl, artistName, trackName, duration }) => {

  return (
    <div className="row m-4">
        <div className="col-2">
          <img src={imageUrl}/>
        </div>
        <div className="col-8">
          <h4>{trackName}</h4>
          <p>{artistName}</p>
        </div>
        <div className='col-2'>
          <p>{duration}</p>
        </div>
      </div>
  )
}

export default SingleTrack;
