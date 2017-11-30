const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLList, GraphQLInt } = require("graphql");
const { API_URL } = require('../config');

const ExternalUrls = new GraphQLObjectType({
  name: "ArtistExternalUrls",
  description: "...",

  fields: () => ({
    spotify: { type: GraphQLString },
  }),
});

const Image = new GraphQLObjectType({
  name: "ArtistImage",
  description: "Artist image",

  fields: () => ({
    height: { type: GraphQLInt },
    url: { type: GraphQLString },
    width: { type: GraphQLInt },
  }),
});

const Artist = new GraphQLObjectType({
  name: "Artist",
  description: "Artist fetched from the Spotify API",

  fields: () => ({
    external_urls: { type: ExternalUrls },
    genres: { type: new GraphQLList(GraphQLString) },
    href: { type: GraphQLString },
    id: { type: GraphQLString },
    images: { type: new GraphQLList(Image) },
    name: { type: GraphQLString },
    popularity: { type: GraphQLInt },
    related: {
      type: new GraphQLList(Artist),
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
    type: { type: GraphQLString },
    uri: { type: GraphQLString },
  })
});

module.exports = Artist;
