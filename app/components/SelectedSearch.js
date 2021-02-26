import React, { useEffect, useCallback } from 'react';

//if search artist is deleted we want the tracklist to re-render to what is currently in the selectedSearchStrings array so need to fire another get request here
//so basically anytime selectedSearchStrings list is updated, need to fire a re-render

const SelectedSearch = ({ setSelectedSearchStrings, selectedSearchStrings, recResults }) => {

  const removeArtist = (e) => {
    if(e.target.parentElement.parentElement.classList.contains("iTag")) {
      e.target.parentElement.remove();

      let justArtist = selectedSearchStrings.map(artist => artist.name);
      let itemToDeleteIndex = justArtist.indexOf(e.target.parentElement.innerText);
      if(itemToDeleteIndex !== -1) {
        selectedSearchStrings.splice(itemToDeleteIndex, 1);
      }
    }
  }

  return (
    <div className="row">
      {selectedSearchStrings.map(artist => <ul className="iTag row" key={artist.id}><li>{artist.name}<i onClick={removeArtist} className="fas fa-times ml-2"></i></li></ul>)}
    </div>
  )
}

export default SelectedSearch;
