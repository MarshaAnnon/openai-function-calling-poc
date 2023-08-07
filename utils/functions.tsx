import { getLyrics, getArtistsSongs } from './songLyrics';

export const availableFunctions = [
  {
    function: getLyrics,
    schema: {
      name: 'getLyrics',
      description:
        'Retrieve the song that is requested from the song database',
      parameters: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            description: 'This is the title of the song we want lyrics to',
          },
        },
      },
    },
  },
  {
    function: getArtistsSongs,
    schema: {
      name: 'getArtistsSongs',
      description:
        'Retrieve all the songs that are associated with an artist from the database',
      parameters: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'This is the name of the artist whose songs we want to retrieve',
          },
        },
      },
    },
  },
];
