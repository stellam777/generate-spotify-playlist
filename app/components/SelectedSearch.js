import React, { useEffect, useCallback } from 'react';
import initialSeeds from './seeds'

//if search artist is deleted we want the tracklist to re-render to what is currently in the selectedSearchStrings array so need to fire another get request here
//so basically anytime selectedSearchStrings list is updated, need to fire a re-render
//pass getRecommendations function through props to SelectedSearch and run it in the removeArtist func
//Back in PlaylistGen, make getRec... func a stand alone func and call it in useEffect

const seeds = {
  acousticness: {
    min: 0,
    max: 1,
    value: [0, 1],
    step: .1,
    enabled: false,
    id: 1,
  },
  danceability: {
    min: 0,
    max: 1,
    value: [0, 1],
    step: .1,
    enabled: false,
    id: 2,
  },
  energy: {
    min: 0,
    max: 1,
    value: [0, 1],
    step: .1,
    enabled: false,
    id: 3,
  },
  loudness: {
    min: 0,
    max: 1,
    value: [0, 1],
    step: .1,
    enabled: false,
    id: 4
  },
  instrumentalness: {
    min: 0,
    max: 1,
    value: [0, 1],
    step: .1,
    enabled: false,
    id: 5
  },
  popularity: {
    min: 0,
    max: 100,
    value: [0, 100],
    step: 1,
    enabled: false,
    id: 6
  },
  tempo: {
    min: 0,
    max: 200,
    value: [0, 200],
    step: .1,
    enabled: false,
    id: 7
  },
}

const SelectedSearch = ({ setSelectedSearchStrings, selectedSearchStrings, recResults, setSeedValues, seedValues }) => {

  const removeArtist = (e) => {
    e.preventDefault();
    if(e.target.classList.contains('fas')) {
      e.target.parentElement.remove();

    let justArtist = selectedSearchStrings.map(artist => artist.name);
    let itemToDeleteIndex = justArtist.indexOf(e.target.parentElement.innerText);
      if(itemToDeleteIndex !== -1) {
        //if the e.target artist string is in the justArtist array then filter selectedSearchStrings array to NOT include artist, and then setState on that filtered array
        setSelectedSearchStrings(selectedSearchStrings.filter((artist, i) => i !== itemToDeleteIndex));
        setSeedValues(seeds);
      }
    }
  }

  return (
    <div className="container">
    <div onClick={removeArtist} className="row">
      {selectedSearchStrings.map(artist => <div className="iTag row m-1" key={artist.id}><li className="col">{artist.name}<i className="fas fa-times pl-1"></i></li></div>)}
    </div>
    </div>
  )
}

export default SelectedSearch;
