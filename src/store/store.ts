import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { ipApi } from '@/pages/Ip/api/IpService.ts';
import { ownIpApi } from '@/pages/Ip/api/OwnIpService.ts';
import { randomJokeApi } from '@/pages/RandomJokes/api/RandomJokeService.ts';

import themeReducer from './reducers/ThemeSlice.ts';

const rootReducer = combineReducers({
  themeReducer,
  [randomJokeApi.reducerPath]: randomJokeApi.reducer,
  [ownIpApi.reducerPath]: ownIpApi.reducer,
  [ipApi.reducerPath]: ipApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(randomJokeApi.middleware)
        .concat(ownIpApi.middleware)
        .concat(ipApi.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
