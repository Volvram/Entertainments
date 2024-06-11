import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ThemeType } from '@/models/ThemeType.ts';
import { getTheme } from '@/shared/getTheme.ts';

interface ThemeState {
  theme: ThemeType;
}

const initialState: ThemeState = {
  theme: getTheme(),
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    set(state, action: PayloadAction<ThemeType>) {
      state.theme = action.payload;
    },
  },
});

export default themeSlice.reducer;
