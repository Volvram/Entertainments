import './App.css';
import React, { useRef } from 'react';

import { Drawer } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router';

import { useAppSelector } from '@/hooks/redux.ts';
import { pages } from '@/pages/config/pages.ts';
import { CustomDrawerRef } from '@/shared/ui/Drawer/Drawer.tsx';
import ThemeSwitch from '@/shared/ui/ThemeSwitch/ThemeSwitch.tsx';

import { Button } from './shared/ui/Button';

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
        {pages.map((page) => {
          return <Route key={page.id} path={page.href} element={<page.element />} />;
        })}
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </>
  );
}

export default App;
