import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import SelectedSearch from './SelectedSearch';
import Playlist from './Playlist';
import AddToSpotifyForm from './AddToSpotifyForm';
import SeedsForm from './SeedsForm';
import initialSeeds from './seeds';
import UserInfo from './UserInfo';
import Player from './Player';
import logo from './traxlogo.png';
import Footer from './Footer';

const PlaylistGenerator = (props) => {
  const auth = props.auth || '';
  //you use the token found on auth to make user specific API calls
  const token = auth.token || '';
  //you use clientToken to make non user specific API calls
  const clientToken = props.clientToken;
  const deviceId = props.deviceId;
  const playerState = props.playerState;

  //the value of the input string, what initiates our search
  const [searchString, setSearchString] = useState('');

  //the array of string(s) selected by user from dropdown, can be max of 3 - ideally we'll be querying the recs endpoint with this array so NEED ARTIST ID
  const [selectedSearchStrings, setSelectedSearchStrings] = useState([]);
  const [isSelected, setIsSelected] = useState(false); //used as conditional for rendering SelectedSearch component

  //initial data we get back from search get call
  const [searchResults, setSearchResults] = useState([]);

  //The sorted/filtered list that autopopulates when user keys in search bar, they select from this list
  const [autoCompleteText, setAutoCompleteText] = useState([]);

  //Track data from recommendations get request (includes artist info)
  const [recResults, setRecResults] = useState([]);

  //Seeds values obj
  const [seedValues, setSeedValues] = useState(initialSeeds);

  //Logged in user info, will probs move to own component
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');

  const [songCount, setSongCount] = useState(25);

  const isInitialMount = useRef(true);

  const searchSpotify = async () => {
    const url = 'https://api.spotify.com/v1/search';
    const searchQuery = encodeURIComponent(searchString);
    const typeQuery = `type=artist`;
    const { data } = await axios.get(`${url}?q=${searchQuery}&${typeQuery}`, {
      headers: {
        Authorization: `Bearer ${clientToken}`,
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

  const getRecs = async () => {
    const url = 'https://api.spotify.com/v1/recommendations';
    let requestString;
    if (selectedSearchStrings.length > 0) {
      let justArtists = selectedSearchStrings.map((artist) => artist.id);
      requestString = `seed_artists=${justArtists.join(',')}`;

      let seedsArr = [];
      Object.keys(seedValues).forEach((seed) => {
        if (seedValues[seed].enabled) {
          seedsArr.push(
            `min_${seed}=${seedValues[seed].value[0]}&max_${seed}=${seedValues[seed].value[1]}`
          );
        }
      });
      let seedString = seedsArr.join('&');
      let limit = `limit=${songCount}`;
      const { data } = await axios.get(`${url}?${limit}&${requestString}`, {
        headers: {
          Authorization: `Bearer ${clientToken}`,
        },
      });
      setRecResults(data.tracks);
    }
  };

  //if user auth then run this useEffect!
  useEffect(async () => {
    //get user
    if (auth) {
      let mounted = true;
      const { data } = await axios.get('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (mounted) {
        if (data) {
          setUsername(data.display_name);
          setUserId(data.id);
        }
      }
      return () => (mounted = false);
    }
  }, []);

  useEffect(async () => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      getRecs();
    }
  }, [selectedSearchStrings, seedValues, songCount]);

  useEffect(() => {
    if (localStorage.getItem('tracks') !== null) {
      setRecResults(JSON.parse(localStorage.getItem('tracks')));
      setSelectedSearchStrings(
        JSON.parse(localStorage.getItem('artistSearchTags'))
      );
      setIsSelected(true);

      if (localStorage.getItem('seeds') !== null) {
        setSeedValues(JSON.parse(localStorage.getItem('seeds')));
      }
    }
  }, []);

  return (
    <div className='container mt-4'>
      <div className='d-flex justify-content-between align-items-center'>
        <img className='logo' src={logo} />
        {auth ? (
          <a href={'/auth/logout'}>
            <button className='btn custom-btn btn-sm'>Log Out</button>
          </a>
        ) : (
          <a href={'/auth/login'}>
            <button className='btn custom-btn btn-sm' type='click'>
              Login with Spotify
            </button>
          </a>
        )}
      </div>
      <div className='mt-4'>
        <h1 className='mt-4'>Discover new music</h1>
      </div>
      <div className='functional-container'>
        <div className='form-group mb-0'>
          <input
            placeholder='Search by Artist'
            autoComplete='off'
            type='text'
            name='search'
            className='form-control'
            onChange={changeHandler}
            value={searchString}
          />
        </div>
        <ul className='list-group dropd'>
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
        {auth && <UserInfo username={username} auth={auth} />}
        {isSelected && (
          <SelectedSearch
            recResults={recResults}
            selectedSearchStrings={selectedSearchStrings}
            setSelectedSearchStrings={setSelectedSearchStrings}
            seedValues={seedValues}
            setSeedValues={setSeedValues}
          />
        )}
        <div className='row'>
          {selectedSearchStrings.length ? (
            <Playlist
              recResults={recResults}
              auth={auth}
              deviceId={deviceId}
              playerState={playerState}
              setSongCount={setSongCount}
              songCount={songCount}
            />
          ) : (
            ''
          )}
          {selectedSearchStrings.length ? (
            <div className='col-lg-3'>
              <AddToSpotifyForm
                auth={auth}
                userId={userId}
                recResults={recResults}
              />
              <SeedsForm
                seedValues={seedValues}
                setSeedValues={setSeedValues}
              />
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PlaylistGenerator;
