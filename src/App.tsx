import './App.css';
import React from 'react';

import { Button } from '@/Entities/Button';
import ThemeSwitch from '@/Entities/ThemeSwitch/ThemeSwitch.tsx';
import { useAppSelector } from '@/hooks/redux.ts';

function App() {
  const { theme } = useAppSelector((state) => state.themeReducer);

  React.useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <>
      <ThemeSwitch />
      <div>Hello world!</div>
      <Button onClick={() => {}}>Кнопка</Button>
    </>
  );
}

export default App;
