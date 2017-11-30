const fetch = require('node-fetch');
const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require("graphql");
const { API_URL } = require('../config');
const grabToken = require('../grabToken');

const ExternalUrls = require('./ExternalUrls');
const Image = require('./Image');
const SimplifiedAlbum = require('./SimplifiedAlbum');
const Track = require('./Track');

const Followers = new GraphQLObjectType({
  name: "Followers",
  description: "...",

  fields: () => ({
    href: { type: GraphQLString },
    total: { type: GraphQLInt },
  })
})

const Artist = new GraphQLObjectType({
  name: "Artist",
  description: "Artist fetched from the Spotify API, can also return related artists",

  fields: () => ({
    albums: {
      type: new GraphQLList(SimplifiedAlbum),
      description: '...',

      resolve: (root, args, context) => {
        return grabToken()
        .then(token => {
          return fetch(`${API_URL}/artists/${root.id}/albums`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          })
            .then(response => response.json())
            .then(json => json.items )
        });
      }
    },
    external_urls: { type: ExternalUrls },
    followers: { type: Followers },
    genres: { type: new GraphQLList(GraphQLString) },
    href: { type: GraphQLString },
    id: { type: GraphQLString },
    images: { type: new GraphQLList(Image) },
    name: { type: GraphQLString },
    popularity: { type: GraphQLInt },
    related: {
      type: new GraphQLList(Artist),
      description: 'Related artists for the current artist',

      resolve: (root, args, context) => {
        return grabToken()
          .then(token => {
            return fetch(`${API_URL}/artists/${root.id}/related-artists`, {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            })
              .then(response => response.json())
              .then(json => json.artists)
          });
      }
    },
    tracks: {
      type: new GraphQLList(Track),
      description: '...',

      resolve: (root, args, context) => {
        const options = {
          country: root.country || 'GB',
        };

        return grabToken()
          .then(token => {
            return fetch(`${API_URL}/artists/${root.id}/top-tracks?country=${options.country}`, {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            })
              .then(response => response.json())
              .then(json => json.tracks)
          });
      }
    },
    type: { type: GraphQLString },
    uri: { type: GraphQLString },
  })
});

module.exports = Artist;
