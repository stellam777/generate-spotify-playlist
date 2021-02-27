import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SelectedSearch from './SelectedSearch';
import Playlist from './Playlist';

const PlaylistGenerator = (props) => {
  const auth = props.auth;
  const token = auth.token;

  //the value of the input string, what initiates our search
  const [searchString, setSearchString] = useState('');

  //the array of string(s) selected by user from dropdown, can be max of 3 - ideally we'll be querying the recs endpoint with this array so NEED ARTIST ID
  const [selectedSearchStrings, setSelectedSearchStrings] = useState([]);
  const [isSelected, setIsSelected] = useState(false); //used to as conditional for rendering SelectedSearch component

  //initial data we get back from search get call
  const [searchResults, setSearchResults] = useState([]);

  //The sorted/filtered list that autopopulates when user keys in search bar, they select from this list
  const [autoCompleteText, setAutoCompleteText] = useState([]);

  //Track data from recommendations get request (includes artist info)
  const [recResults, setRecResults] = useState([]);

  //Logged in user info, will probs move to own component
  const [username, setUsername] = useState('');

  const searchSpotify = async () => {
    const url = 'https://api.spotify.com/v1/search';
    const searchQuery = encodeURIComponent(searchString);
    const typeQuery = `type=artist`;
    const { data } = await axios.get(`${url}?q=${searchQuery}&${typeQuery}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data && data.artists) {
      setSearchResults(data.artists.items);
      orderDropdownResults();
    }
  };

  const orderDropdownResults = () => {
    let copiedSearchResults = [...searchResults].map(({ name, id }) => ({
      name,
      id,
    }));
    const regex = new RegExp(`^${searchString}`, 'i');
    copiedSearchResults = copiedSearchResults
      .sort()
      .filter((artist) => regex.test(artist.name));
    setAutoCompleteText(copiedSearchResults);
  };

  const selectArtist = (artist) => {
    if (selectedSearchStrings.length < 3) {
      setSelectedSearchStrings([...selectedSearchStrings, artist]);
    }
    setAutoCompleteText([]);
    setIsSelected(true);
    setSearchString('');
  };

  const changeHandler = (e) => {
    setSearchString(e.target.value);
    if (e.target.value.length > 2) {
      searchSpotify();
    }
  };

  // const getRecommendations = async () => {
  //   const url = 'https://api.spotify.com/v1/recommendations';
  //   let requestString;
  //   if(selectedSearchStrings.length > 0) {
  //     let justArtists = selectedSearchStrings.map(artist => artist.id);
  //     requestString = `seed_artists=${justArtists.join(',')}`;
  //   }
  //   const { data } = await axios.get(`${url}?${requestString}`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     }
  //   })
  //   setRecResults(data.tracks)
  // }

  useEffect(async () => {
    let mounted = true;
    const { data } = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (mounted) {
      if (data) {
        setUsername(data.display_name);
      }
    }
    return () => (mounted = false);
  }, []);

  useEffect(async () => {
    let mounted = true;

    const url = 'https://api.spotify.com/v1/recommendations';
    let requestString;
    if (selectedSearchStrings.length > 0) {
      let justArtists = selectedSearchStrings.map((artist) => artist.id);
      requestString = `seed_artists=${justArtists.join(',')}`;
    //}
    const { data } = await axios.get(`${url}?${requestString}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if(mounted) {
      setRecResults(data.tracks);
      }
    }
    return () => (mounted = false);
  }, [selectedSearchStrings]);

  return (
    <div className='container'>
      <h1>Hi, {username}</h1>
      <div>
        <div className='form-group'>
          <label>
            Enter an artist below to generate a new recommended playlist
          </label>
          <input
            autoComplete='off'
            type='text'
            name='search'
            className='form-control'
            onChange={changeHandler}
            value={searchString}
          />
          {isSelected && (
            <SelectedSearch
              recResults={recResults}
              selectedSearchStrings={selectedSearchStrings}
              setSelectedSearchStrings={setSelectedSearchStrings}
            />
          )}
          <ul className='list-group'>
            {searchString &&
              autoCompleteText.map((artist) => (
                <li
                  className='list-group-item'
                  key={artist.id}
                  onClick={() => selectArtist(artist)}
                >
                  {artist.name}
                </li>
              ))}
          </ul>
          {selectedSearchStrings.length ? (
            <Playlist recResults={recResults} />
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaylistGenerator;
