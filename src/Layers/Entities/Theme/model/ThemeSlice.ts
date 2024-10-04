import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getTheme } from '../lib/helpers/getTheme.ts';
import { TTheme } from '../UI/ThemeSwitch/Types';

interface ThemeState {
  theme: TTheme;
}

const initialState: ThemeState = {
  theme: getTheme(),
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    set(state, action: PayloadAction<TTheme>) {
      state.theme = action.payload;
    },
  },
});

export default themeSlice.reducer;
