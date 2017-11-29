const fetch = require("node-fetch");
const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLList } = require("graphql");

const ArtistType = new GraphQLObjectType({
  name: "Artist",
  description: "Artist fetched from the Spotify API",

  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genres: { type: new GraphQLList(GraphQLString) },
    uri: { type: GraphQLString },
    related: {
      type: new GraphQLList(ArtistType),
      resolve: (root, args, context) => {
        return context.access_token
        .then(token => {
          return fetch(`https://api.spotify.com/v1/artists/${root.id}/related-artists`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          })
            .then(response => response.json())
            .then(json => json.artists)
        });
      }
    },
  })
});

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    description: "...",

    fields: () => ({
      artist: {
        type: ArtistType,
        args: {
          name: { type: GraphQLString }
        },
        resolve: (root, args, context) => {
          return context.access_token
            .then(token => {
              return fetch(`https://api.spotify.com/v1/search?q=${args.name}&type=artist`, {
                headers: {
                  'Authorization': `Bearer ${token}`,
                },
              })
                .then(response => response.json())
                .then(json => json.artists.items[0])
            });
        }
      }
    })
  })
});
