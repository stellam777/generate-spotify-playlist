import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserInfo = ({ auth }) => {

  const [topArtists, setTopArtists] = useState([]);

  useEffect(async () => {
    let mounted = true;
    const token = auth.token;
    const { data } = await axios.get('https://api.spotify.com/v1/me/top/artists', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if(mounted) {
      setTopArtists(data.items.slice(0,4));
    }
    return () => (mounted = false);
  },[]);

  return (
    <div className="container">
      <div className="mt-4">
        <p>Your top artists:</p>
      </div>
      <ul className="row m-0 p-0">
      {topArtists.length && topArtists.map((artist) => {
        return ( <div key={artist.id} className="col-3">
          <img className="artist-img" src={artist.images[1].url} />
          <li>{artist.name}</li>
        </div>
        )
      })}
      </ul>
    </div>
  )
}

export default UserInfo;
