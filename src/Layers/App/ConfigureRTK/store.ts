import { combineReducers, configureStore } from '@reduxjs/toolkit';

import cardsReducer from '@/Layers/Entities/Cards/model/Cards/CardsSlice.ts';
import themeReducer from '@/Layers/Entities/Theme/model/ThemeSlice.ts';
import { ipApi } from '@/Layers/Pages/Ip/api/ip/IpService.ts';
import { ownIpApi } from '@/Layers/Pages/Ip/api/ownIp/OwnIpService.ts';
import { randomJokeApi } from '@/Layers/Pages/RandomJokes/api/RandomJokeService.ts';
import { cardsApi } from '@/Layers/Shared/api/cards/CardsService.ts';
import { serverApi } from '@/Layers/Shared/api/neural/ServerService.ts';

const rootReducer = combineReducers({
  themeReducer,
  cardsReducer,
  [randomJokeApi.reducerPath]: randomJokeApi.reducer,
  [ownIpApi.reducerPath]: ownIpApi.reducer,
  [ipApi.reducerPath]: ipApi.reducer,
  [cardsApi.reducerPath]: cardsApi.reducer,
  [serverApi.reducerPath]: serverApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(randomJokeApi.middleware)
      .concat(ownIpApi.middleware)
      .concat(ipApi.middleware)
      .concat(cardsApi.middleware)
      .concat(serverApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
