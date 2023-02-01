import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Character } from '@/interfaces';
import { AppState } from '@/store/store';

// interface IFavCharacter {
//   name: string;
//   url: string;
// }

export interface IFavoriteState {
  // count: number;
  favorites: Character[];
  // isLoading: boolean;
}

const initialState: IFavoriteState = {
  // count: 0,
  favorites: [],
  // isLoading: false,
};

export const favoritesSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    // starLoadingFavorite: (state) => {
    //   state.isLoading = true;
    // },
    addFavorite: (state, action: PayloadAction<{ character: Character }>) => {
      const { character } = action.payload;
      // state.isLoading = false;
      state.favorites.push(character);
      // state.count = state.favorites.length;
    },
    delFavorite: (state, action: PayloadAction<{ character: Character }>) => {
      const { character } = action.payload;
      // state.isLoading = false;
      state.favorites = state.favorites.filter(({ id }) => id !== character.id);
      // state.count = state.favorites.length;
    },
    // favorite: (state, action: PayloadAction<{ character: Character }>) => {
    //   const { character } = action.payload;
    //   const existingCht = state.favorites.find(({ id }) => id == character.id);
    //   console.log(existingCht?.id);
    //   if (existingCht === undefined) {
    //     console.log(character);
    //     state.favorites.push(character);
    //   } else {
    //     state.favorites = state.favorites.filter(({ id }) => id !== character.id);
    //   }
    //   state.count = state.favorites.length;
    // },
  },
});
export const selectAllFavorites = (state: AppState) => state.favorites;
export const selectCountFavorites = (state: AppState) => state.favorites.favorites.length || 0;

// export const findCharacter = (state: RootState, character: Character) =>
//   state.favorites.favorites.find((item) => item.id === character.id);

export const addFavoriteA = () => {};

export const { addFavorite, delFavorite } = favoritesSlice.actions;
