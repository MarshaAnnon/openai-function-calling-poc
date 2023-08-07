import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const artistData: Prisma.ArtistCreateInput[] = [
  {
    name: 'Miley Cyrus',
    songs: {
      create: [
        {
          title: 'Flowers',
          lyrics:
            'We were good, we were gold. Kinda dream that can"t be sold. We were right "til we weren"t. Built a home and watched it burn',
        },
        {
          title: 'Angels Like You',
          lyrics:
            'Mmm, mmm, mmm Flowers in hand, waiting for me. Every word in poetry. Won"t call me by name, only "baby". The more that you give, the less that I need',
        },
        {
          title: 'Wrecking Ball',
          lyrics:
            'We clawed, we chained, our hearts in vain. We jumped, never asking why. We kissed, I fell under your spell. A love no one could deny',
        },
      ],
    },
  },
  {
    name: 'Ed Sheeran',
    songs: {
      create: [
        {
          title: 'Eyes Closed',
          lyrics:
            'I know it"s a bad idea. But how can I help myself? Been inside for most this year. And I thought a few drinks, they might help. It"s been a while, my dear. Dealin" with the cards life dealt. I"m still holdin" back these tears. While my friends are somewhere else',
        },
        {
          title: 'Perfect',
          lyrics:
            'I found a love, for me. Darling, just dive right in and follow my lead. Well, I found a girl, beautiful and sweet. Oh, I never knew you were the someone waiting for me',
        },
      ],
    },
  },
  {
    name: 'Taylor Swift',
    songs: {
      create: [
        {
          title: 'Anti-Hero',
          lyrics:
            'I have this thing where I get older but just never wiser. Midnights become my afternoons. When my depression works the graveyard shift. All of the people I"ve ghosted stand there in the room',
        },
      ],
    },
  },
  {
    name: 'Morgan Wellan',
    songs: {
      create: [
        {
          title: 'Last Night',
          lyrics:
            'Last night, we let the liquor talk. I can"t remember everything we said, but we said it all. You told me that you wish I was somebody you never met. But baby, baby, something"s tellin" me this ain"t over yet. No way it was our last night.',
        },
      ],
    },
  },
  {
    name: 'Luke Combs',
    songs: {
      create: [
        {
          title: 'Fast Car',
          lyrics:
            'You got a fast car. I want a ticket to anywhere. Maybe we make a deal. Maybe together we can get somewhere. Any place is better. Starting from zero, got nothing to lose. Maybe we"ll make something. Me, myself, I got nothing to prove',
        },
      ],
    },
  },
];

async function main() {
  console.log('Start seeding...');

  for (const a of artistData) {
    const artist = await prisma.artist.create({
      data: a,
    });
    console.log(`Created artist with with id: ${artist.id}`);
  }
  console.log('Seeding finished.');
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
