import { AppState } from '@/store/store';
import { lSFavorite } from '@/utils';
import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { addFavorite, delFavorite } from './favoritesSlice';

export const listenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening({
  matcher: isAnyOf(addFavorite, delFavorite),
  effect: (action, listenerApi) => lSFavorite.lSave((listenerApi.getState() as AppState).favorites),
});
