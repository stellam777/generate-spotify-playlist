# Trax Web App

A playlist generator web app utilizing Spotify’s API that allows users to completely customize recommended playlists based on artists and genre seeds. Developed in 14 days with React, Node.js, Express, OAuth, JWToken, Bootstrap, and Spotify’s API.

### Getting Started

Git clone "master":
https://github.com/stellam777/generate-spotify-playlist.git

Install the dependencies:
- `$ yarn install` or `$ npm install`

API Keys:
- Vist Spotify Developer Dashboard and create two new projects to retrieve two sets of client IDs and secrets: https://developer.spotify.com/dashboard/login
- One client ID/secret pair is needed for users' to login with Spotify, save playlists to their own Spotify account, pull user metrics, and play tracks directly from the app
- The other client ID/secret pair is so non-logged in users can still generate playlists (search by artist)
- See .env-sample in root folder for secret placement and what's all needed

### Questions or Suggestions?
Email Stella: stellam777@gmail.com
