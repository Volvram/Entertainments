import './App.css';
import React, { useRef } from 'react';

import { Drawer } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router';

import { Button } from '@/entities/Button';
import { CustomDrawerRef } from '@/entities/Drawer/Drawer.tsx';
import ThemeSwitch from '@/entities/ThemeSwitch/ThemeSwitch.tsx';
import { useAppSelector } from '@/hooks/redux.ts';
import Main from '@/pages/Main/Main.tsx';
import RandomJokes from '@/pages/RandomJokes/RandomJokes.tsx';

function App() {
  const { theme } = useAppSelector((state) => state.themeReducer);
  const drawerRef = useRef<CustomDrawerRef>();

  React.useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <>
      <Drawer ref={drawerRef}>Меню</Drawer>
      <ThemeSwitch />
      <Button
        onClick={() => {
          drawerRef.current?.open();
        }}>
        Кнопка
      </Button>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='random-jokes' element={<RandomJokes />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </>
  );
}

export default App;
