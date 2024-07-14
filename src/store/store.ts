import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { ipApi } from '@/pages/Ip/api/IpService.ts';
import { ownIpApi } from '@/pages/Ip/api/OwnIpService.ts';
import { randomJokeApi } from '@/pages/RandomJokes/api/RandomJokeService.ts';
import { cardsApi } from '@/shared/api/CardsService.ts';
import { serverApi } from '@/shared/api/ServerService.ts';

import cardsReducer from './reducers/CardsSlice.ts';
import themeReducer from './reducers/ThemeSlice.ts';

const rootReducer = combineReducers({
  themeReducer,
  cardsReducer,
  [randomJokeApi.reducerPath]: randomJokeApi.reducer,
  [ownIpApi.reducerPath]: ownIpApi.reducer,
  [ipApi.reducerPath]: ipApi.reducer,
  [cardsApi.reducerPath]: cardsApi.reducer,
  [serverApi.reducerPath]: serverApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(randomJokeApi.middleware)
        .concat(ownIpApi.middleware)
        .concat(ipApi.middleware)
        .concat(cardsApi.middleware)
        .concat(serverApi.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
