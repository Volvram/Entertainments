import { combineReducers, configureStore } from '@reduxjs/toolkit';

import themeReducer from './reducers/ThemeSlice.ts';

const rootReducer = combineReducers({
  themeReducer
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
