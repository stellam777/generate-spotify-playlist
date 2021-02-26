import React, { useState, useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import axios from 'axios';

import Home from './Home';
import PlaylistGenerator from './PlaylistGenerator';

function App() {
  const [auth, setAuth] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(async () => {
    const { data } = await axios.get('/auth/current-session');
    setAuth(data);
  }, []);

  if(!auth) {
    return (
      <div className="container mt-4">
        <Home />
      </div>
    )
  } else {
    return (
      <div className='container mt-4'>
        <div className="row float-right">
          <a href={'/auth/logout'}><button className="btn-info">Log Out</button></a>
        </div>
        <PlaylistGenerator auth={auth}/>
      </div>
    )
  }
}

export default App;
