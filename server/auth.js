const router = require('express').Router();
const querystring = require('querystring');
const jwt = require('jsonwebtoken');
const axios = require('axios');

//Step 1: request authorization. This get request is requesting authorization for our app, and prompts the user to login via Spotify's auth flow
router.get('/login', (req, res) => {
  res.redirect(
    `https://accounts.spotify.com/authorize?${querystring.stringify({
      response_type: 'code',
      client_id: process.env.SPOTIFY_CLIENT_ID,
      show_dialog: true,
      scope:
        'playlist-modify-public playlist-modify-private streaming user-read-email user-read-private user-top-read user-modify-playback-state user-read-currently-playing user-read-playback-state streaming',
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
    })}`
  );
});

//Step 2: After we receive response back from authentication, we can then grab the access and refresh token. The token will allow us to get data from the spotify web API (so we can use the recs endpoint!)
router.get('/callback', async (req, res) => {
  const { code } = req.query;
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const secret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;
  const grant_type = 'authorization_code';

  const basicHeader = Buffer.from(`${clientId}:${secret}`).toString('base64');

  const { data } = await axios.post(
    'https://accounts.spotify.com/api/token',
    querystring.stringify({
      grant_type,
      code,
      redirect_uri,
    }),
    {
      headers: {
        Authorization: `Basic ${basicHeader}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );

  const sessionJWTObject = {
    token: data.access_token,
  };

  req.session.jwt = jwt.sign(sessionJWTObject, process.env.JWT_SECRET_KEY);
  return res.redirect('/');
});

router.get('/current-session', (req, res) => {
  jwt.verify(
    req.session.jwt,
    process.env.JWT_SECRET_KEY,
    (err, decodedToken) => {
      if (err || !decodedToken) {
        res.send(false);
      } else {
        res.send(decodedToken);
      }
    }
  );
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect(`/`);
});

module.exports = router;
