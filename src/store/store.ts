import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { favoritesSlice } from './slices/favorites';
// import { listenerMiddleware } from './slices/favorites/middleware';

// import { todosApi } from './apis';
// import { counterSlice } from './slices/counter';
// import { pokemonSlice } from './slices/pokemon';

// try {
//   favState = window && JSON.parse(localStorage.getItem('marvelfav') || 'null');
// } catch (error) {}
//const favStore = { count: 0, favorites: [], isLoading: false };

// import counterReducer from './features/counter/counterSlice';

const persistConfig = {
  key: 'marvel',
  storage,
  version: 0,
  whitelist: ['favorites'],
  // blacklist: ['counter'],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({ favorites: favoritesSlice.reducer })
);

const makeStore = () =>
  configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });

const store = makeStore();
const persistor = persistStore(store);

// const makerStore = configureStore({
//   // preloadedState: {
//   //   favorites: typeof window === 'undefined' ? favStore : lSFavorite.lRead(),
//   // },
//   reducer: {
//     favorites: favoritesSlice.reducer,
//     // posts: postsSlice.reducer,
//     // users: usersSlice.reducer,
//     // counter: counterSlice.reducer,
//     // pokemons: pokemonSlice.reducer,
//     // [todosApi.reducerPath]: todosApi.reducer,
//   },
//   // devTools: false,
//   middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), listenerMiddleware.middleware],
//   // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todosApi.middleware),
// });

// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

// export default store;
export { store, persistor };
