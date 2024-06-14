import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getTheme } from '@/shared/lib/getTheme.ts';
import { ThemeType } from '@/store/models/ThemeType.ts';

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
