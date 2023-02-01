import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { LayoutMain } from '@/components/layouts';
import { marvelApi } from '@/api';
import { Character, ComicListResult, MarvelListResponse } from '@/interfaces';
import { Button, Card, Container, Grid, Text } from '@nextui-org/react';
import { useAppDispatch, useAppSelector } from '@/store';
import { addFavorite, delFavorite } from '@/store/slices/favorites';
import confetti from 'canvas-confetti';

interface Props {
  character: Character;
}

const CharacterPage: NextPage<Props> = ({ character }) => {
  const dispatch = useAppDispatch();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const { favorites } = useAppSelector((state) => state.favorites);

  useEffect(() => {
    const chartItem = favorites.find(({ id }) => id === character.id);
    setIsFavorite(chartItem !== undefined);
  }, [character]);

  const handleClickFavorite = () => {
    setIsFavorite((fav) => !fav);
    if (!isFavorite) {
      dispatch(addFavorite({ character }));
      bombCofety();
    } else {
      dispatch(delFavorite({ character }));
    }

    if (!isFavorite) return;
  };

  const bombCofety = () =>
    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0,
      },
    });

  return (
    <LayoutMain title={character.name}>
      <Grid.Container css={{ marginTop: '$2' }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card isHoverable css={{ padding: '$2' }}>
            <Grid.Container gap={2}>
              <Grid xs={6} sm={12} md={12}>
                <Image src={character.image} alt={character.name} width={300} height={300} />
              </Grid>
              <Grid xs={6} sm={12} md={12} css={{ display: 'flex', flexDirection: 'column' }}>
                <Text h5 css={{ display: 'block', m: '0', p: 0 }}>
                  Description:
                </Text>
                <Text h6 css={{ m: 0 }}>
                  {character.description}
                </Text>
                <Text h6>Date: {character.modified}</Text>
              </Grid>
            </Grid.Container>
          </Card>
        </Grid>

        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text h1 transform="capitalize">
                {character.name}
              </Text>
              <Button ghost color={'gradient'} onPress={handleClickFavorite}>
                {!isFavorite ? 'Guardar en favorito' : 'Remover de favorito'}
              </Button>
            </Card.Header>
            <Card.Body>
              <Container fluid direction="row" display="flex" gap={0}>
                {character.comicResult?.map(({ id, image, title }) => (
                  <div key={id} style={{ margin: '6px 0px', padding: '0px 6px' }}>
                    <Image src={image} width={120} height={180} alt={title} />
                    <Text>{title.length > 18 ? title.slice(0, 17) + '...' : title}</Text>
                  </div>
                ))}
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </LayoutMain>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const limit = 100;
  const offset = 1;
  const { data } = await marvelApi.get<MarvelListResponse>(`/characters?limit=${limit}&offset=${offset}`);
  const marvel1001 = data.data.results.map((characterItem) => ({
    id: `${characterItem.id}`,
  }));
  return {
    paths: marvel1001.map(({ id }) => ({
      params: {
        id,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };
  const { data } = await marvelApi.get<MarvelListResponse>(`/characters?id=${id}`);
  const chactNoImage = data.data.results[0];
  const { data: comicListResult } = await marvelApi.get<ComicListResult>(`/characters/${id}/comics`);
  const character: Character = {
    id: chactNoImage.id,
    description: chactNoImage.description,
    name: chactNoImage.name,
    modified: chactNoImage.modified,
    image: `${chactNoImage.thumbnail.path}.${chactNoImage.thumbnail.extension}`,
    comicResult: comicListResult.data.results.map(
      ({ id, description, isbn, issueNumber, modified, pageCount, title, resourceURI, thumbnail }) => ({
        id,
        description,
        isbn,
        issueNumber,
        modified,
        pageCount,
        image: `${thumbnail.path}.${thumbnail.extension}`,
        thumbnail,
        title,
        resourceURI,
      })
    ),
  };

  return {
    props: {
      character,
    },
  };
};

export default CharacterPage;
