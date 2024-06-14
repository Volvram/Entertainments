import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { randomJokeApi } from '@/pages/RandomJokes/api/RandomJokeService.ts';

import themeReducer from './reducers/ThemeSlice.ts';

const rootReducer = combineReducers({
  themeReducer,
  [randomJokeApi.reducerPath]: randomJokeApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(randomJokeApi.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
