require('dotenv').config();
const express = require('express');
const axios = require('axios');
const querystring = require('querystring');

const app = express();
const port = 8888;

// Step 1: Redirect user to Spotify for authorization
app.get('/login', (req, res) => {
  const scope = 'user-read-currently-playing';
  const authQueryParams = querystring.stringify({
    response_type: 'code',
    client_id: process.env.SPOTIFY_CLIENT_ID,
    scope: scope,
    redirect_uri: process.env.REDIRECT_URI,
  });

  res.redirect(`https://accounts.spotify.com/authorize?${authQueryParams}`);
});

// Step 2: Handle callback and exchange code for token

app.get('/', (req, res) => {
  res.send(`
    <h1>Spotify OAuth App</h1>
    <a href="/login">Login with Spotify</a>
  `);
});


app.get('/callback', async (req, res) => {
  const code = req.query.code;

  try {
    const tokenRes = await axios.post(
      'https://accounts.spotify.com/api/token',
      querystring.stringify({
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.REDIRECT_URI,
      }),
      {
        headers: {
          Authorization:
            'Basic ' +
            Buffer.from(
              process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
            ).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const accessToken = tokenRes.data.access_token;

    const nowPlaying = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!nowPlaying.data || !nowPlaying.data.item) {
      res.send('<h2>No song is currently playing.</h2>');
      return;
    }

    const song = nowPlaying.data.item;
    const songName = song.name;
    const artistName = song.artists.map(artist => artist.name).join(', ');
    const albumArt = song.album.images[0]?.url;

    let lyrics = '';
    try {
      const lyricsRes = await axios.get(`https://api.lyrics.ovh/v1/${encodeURIComponent(artistName)}/${encodeURIComponent(songName)}`);
      lyrics = lyricsRes.data.lyrics.replace(/\n/g, '<br>');
    } catch (lyricsErr) {
      lyrics = 'Lyrics not found.';
    }

    res.send(`
      <h2>Currently Playing:</h2>
      <p><strong>Song:</strong> ${songName}</p>
      <p><strong>Artist:</strong> ${artistName}</p>
      <img src="${albumArt}" alt="Album Art" width="300"/>
      <h3>Lyrics:</h3>
      <p>${lyrics}</p>
      <br>
      <a href="/" style="font-size:18px;">&#8592; Back to Home</a>
    `);
  } catch (err) {
    console.error('🔥 Error details:', err.response?.data || err.message);
    res.send('❌ Error retrieving token or now playing data.<br><pre>' +
      JSON.stringify(err.response?.data || err.message, null, 2) + '</pre>');
  }
});





app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});