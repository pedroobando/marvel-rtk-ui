import { Character } from '@/interfaces';
import { Grid } from '@nextui-org/react';
import React, { FC } from 'react';
import { MarvelCard } from '.';

interface Props {
  favorites: Character[];
}

export const FavoritesChart: FC<Props> = ({ favorites }) => {
  return (
    <Grid.Container gap={2} direction="row" justify="flex-start">
      {favorites.map((item) => (
        <MarvelCard key={item.id} character={item} />
        // <Grid xs={6} sm={3} key={item.id}>

        // </Grid>
      ))}
    </Grid.Container>
  );
};
