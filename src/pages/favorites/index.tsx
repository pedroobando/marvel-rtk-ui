import React from 'react';
import { NextPage } from 'next';
import { LayoutMain } from '@/components/layouts';

import { NoFavorites } from '@/components/ui';
import { useAppSelector } from '@/store';
import { selectAllFavorites, selectCountFavorites } from '@/store/slices/favorites';
import { FavoritesChart } from '@/components/marvel';

const FavoritesPage: NextPage = () => {
  const { favorites } = useAppSelector(selectAllFavorites);
  const totalFav = useAppSelector(selectCountFavorites);
  return (
    <LayoutMain title="Personaje - Favoritos">
      {totalFav <= 0 ? <NoFavorites /> : <FavoritesChart favorites={favorites} />}
    </LayoutMain>
  );
};

export default FavoritesPage;
