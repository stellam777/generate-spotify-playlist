const router = require('express').Router();
const querystring = require('querystring');
const axios = require('axios');
const jwt = require('jsonwebtoken');

router.get('/', async (req, res) => {
  const grant_type = 'client_credentials';
  const clientId = process.env.SPOTIFY_CLIENT_ID_NOAUTH;
  const secret = process.env.SPOTIFY_CLIENT_SECRET_NOAUTH;
  const basicHeader = Buffer.from(`${clientId}:${secret}`).toString('base64');

  const { data } = await axios.post(
    'https://accounts.spotify.com/api/token',
    querystring.stringify({
      grant_type,
    }),
    {
      headers: {
        Authorization: `Basic ${basicHeader}`,
      },
    }
  );
  res.json(data);
});

// router.get('/current-session', (req, res) => {
//   jwt.verify(
//     req.session.jwt,
//     process.env.JWT_SECRET_KEY_TWO,
//     (err, decodedToken) => {
//       if (err || !decodedToken) {
//         res.send(false);
//       } else {
//         res.send(decodedToken);
//       }
//     }
//   );
// });

module.exports = router;
