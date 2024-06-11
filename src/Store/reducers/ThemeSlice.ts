import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ThemeType } from '@/models/ThemeType.ts';

interface ThemeState {
  theme: ThemeType;
}

const initialState: ThemeState = {
  theme: 'light'
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    set(state, action: PayloadAction<ThemeType>) {
      state.theme = action.payload;
    }
  }
});

export default themeSlice.reducer;
