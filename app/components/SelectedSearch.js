import React, { useEffect, useCallback } from 'react';

//if search artist is deleted we want the tracklist to re-render to what is currently in the selectedSearchStrings array so need to fire another get request here
//so basically anytime selectedSearchStrings list is updated, need to fire a re-render
//pass getRecommendations function through props to SelectedSearch and run it in the removeArtist func
//Back in PlaylistGen, make getRec... func a stand alone func and call it in useEffect

const SelectedSearch = ({ setSelectedSearchStrings, selectedSearchStrings, recResults }) => {

  const removeArtist = (e) => {
    e.preventDefault();
    if(e.target.classList.contains('fas')) {
      e.target.parentElement.remove();

    let justArtist = selectedSearchStrings.map(artist => artist.name);
    let itemToDeleteIndex = justArtist.indexOf(e.target.parentElement.innerText);
      if(itemToDeleteIndex !== -1) {
        //if the e.target artist string is in the justArtist array then filter selectedSearchStrings array to NOT include artist, and then setState on that filtered array
        setSelectedSearchStrings(selectedSearchStrings.filter((artist, i) => i !== itemToDeleteIndex));
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
