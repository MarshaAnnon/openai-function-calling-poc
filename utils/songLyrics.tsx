import Prisma from '@prisma/client';

const { PrismaClient } = Prisma;
export const prisma = new PrismaClient();

export const getLyrics = async function main({ title }) {
  const song = await prisma.song.findFirst({
    where: {
      title: title,
    },
    include: {
      artist: true,
    },
  });

  if (!song && title) {
    return `Sorry, I couldn't find the lyrics for ${title}`;
  }

  return `Here are the lyrics to ${song.title} by ${song.artist.name}:-)
    ${song.lyrics}`;
};

export const getArtistsSongs = async function main({ name }) {
  const artist = await prisma.artist.findFirst({
    where: {
      name: name,
    },
    include: {
      songs: true,
    },
  });
  
  if (!artist && name) {
    return `Sorry, I couldn't find any songs by ${name}`;
  }

  const songList = artist.songs.map((s) => s.title)
    .join(', ');
    
  return `Here are all the songs by ${artist.name}:-)
    ${songList}`;
};
