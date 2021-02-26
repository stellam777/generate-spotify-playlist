import React, { useEffect, useCallback } from 'react';

//if search artist is deleted we want the tracklist to re-render to what is currently in the selectedSearchStrings array so need to fire another get request here
//so basically anytime selectedSearchStrings list is updated, need to fire a re-render

const SelectedSearch = ({ setSelectedSearchStrings, selectedSearchStrings, recResults }) => {

  const removeArtist = (e) => {
    if(e.target.parentElement.parentElement.classList.contains("iTag")) {
      e.target.parentElement.parentElement.remove();

      let justArtist = selectedSearchStrings.map(artist => artist.name);
      let itemToDeleteIndex = justArtist.indexOf(e.target.parentElement.innerText);
      if(itemToDeleteIndex !== -1) {
        selectedSearchStrings.splice(itemToDeleteIndex, 1);
      }
    }
    console.log("HI FROM SELECTED SEARCH", selectedSearchStrings)
  }

  return (
    <div className="container">
      <div className="row">
        {selectedSearchStrings.map(artist => <div className="iTag col-1 p-0" key={artist.id}><p>{artist.name}<i onClick={removeArtist} className="fas fa-times ml-2"></i></p></div>)}
      </div>
    </div>
  )
}

export default SelectedSearch;
