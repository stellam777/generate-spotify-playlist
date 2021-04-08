import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserInfo = ({ auth, username }) => {
  const [topArtists, setTopArtists] = useState([]);

  useEffect(async () => {
    let mounted = true;
    const token = auth.token;
    const { data } = await axios.get(
      'https://api.spotify.com/v1/me/top/artists',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (mounted) {
      setTopArtists(data.items.slice(0, 4));
    }
    return () => (mounted = false);
  }, []);

  return (
    <div>
      <div className='mt-2 mb-2 user-info-greeting d-flex justify-content-between'>
        <p>Your top artists on Spotify:</p>
        <p>Hi, {username}!</p>
      </div>
      <ul className='d-flex justify-content-around'>
        {topArtists.length &&
          topArtists.map((artist) => {
            return (
              <div key={artist.id} className="artist-img-container">
                <li className="artist-name">{artist.name}</li>
                <div className="overlay"><img className='artist-img' src={artist.images[1].url}/></div>
              </div>
            );
          })}
      </ul>
    </div>
  );
};

export default UserInfo;
