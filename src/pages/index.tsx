import { NextPage } from 'next';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { Grid } from '@nextui-org/react';

import { Character, MarvelListResponse } from '@/interfaces';

import { marvelApi } from '@/api';
import { MarvelCard } from '@/components/marvel';
import { LayoutMain } from '@/components/layouts';
import { urlSlugify } from '@/utils';

// import { Inter } from '@next/font/google';

// const inter = Inter({ subsets: ['latin'] });

interface Props {
  characters: Character[];
}

const HomePage: NextPage<Props> = ({ characters }) => {
  return (
    <LayoutMain title="Listado Personajes">
      <Grid.Container gap={2} justify="flex-start">
        {characters.map((character, idx) => (
          <MarvelCard key={idx} character={character} />
        ))}
      </Grid.Container>
    </LayoutMain>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const limit = 100;
  const offset = 1;
  const { data } = await marvelApi.get<MarvelListResponse>(`/characters?limit=${limit}&offset=${offset}`);

  const characters: Character[] = data.data.results.map(({ id, description, name, thumbnail, modified }) => ({
    id,
    description,
    name,
    slug: urlSlugify(name),
    thumbnail,
    modified,
    image: `${thumbnail.path}.${thumbnail.extension}`,
  }));
  return {
    props: { characters },
  };
};

export default HomePage;
