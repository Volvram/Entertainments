import './App.css';
import React from 'react';

import { Button } from '@/Entities/Button';
import { Toggle } from '@/Entities/Toggle';
import { useAppDispatch, useAppSelector } from '@/hooks/redux.ts';
import { themeSlice } from '@/Store/reducers/ThemeSlice.ts';
import {themes} from "@/shared/themes.ts";

function App() {
  const { theme } = useAppSelector((state) => state.themeReducer);
  const { set } = themeSlice.actions;
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <>
      <Toggle
        onChange={() => {
          if (theme === themes.light) dispatch(set(themes.dark));
          if (theme === themes.dark) dispatch(set(themes.light));
        }}
        value={theme === themes.dark}
      />
      <div>Hello world!</div>
      <Button onClick={() => {}}>Кнопка</Button>
    </>
  );
}

export default App;
