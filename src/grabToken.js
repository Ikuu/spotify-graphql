require('dotenv').config();
const btoa = require('btoa');
const fetch = require("node-fetch");

const client = process.env.SPOTIFY_CLIENT;
const secret = process.env.SPOTIFY_SECRET;
const base64Encoded = btoa(`${client}:${secret}`);

function fetchToken() {
  const options =  {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Basic ${base64Encoded}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  };

  return fetch('https://accounts.spotify.com/api/token', options);
}

module.exports = async function () {
  let response = await fetchToken();
  let json = await response.json();

  return json.access_token;
}
