import './App.scss';
import React, { useRef } from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import { Navigate, Route, Routes } from 'react-router';

import { ImgButton } from '@/entities/ImgButton';
import { useAppSelector } from '@/hooks/redux.ts';
import { pages } from '@/pages/config/pages.ts';
import { CustomDrawerRefType } from '@/shared/ui/Drawer/types.ts';
import { NavDrawer } from '@/widgets/NavDrawer';

function App() {
  const { theme } = useAppSelector((state) => state.themeReducer);
  const menuDrawerRef = useRef<CustomDrawerRefType | null>(null);

  React.useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <>
      <NavDrawer forwardRef={menuDrawerRef} />
      <ImgButton
        icon={<MenuIcon />}
        onClick={() => {
          menuDrawerRef.current?.open();
        }}
        className='menu'
      />
      <Routes>
        {pages.map((page) => {
          if (page.nestedPages) {
            return (
              <Route key={page.id} path={page.href} element={<page.element />}>
                {page.nestedPages.map((nestedPage) => {
                  return (
                    <Route
                      key={nestedPage.id}
                      path={`${page.href}/${nestedPage.href}`}
                      element={<nestedPage.element />}
                    />
                  );
                })}
                <Route path='*' element={<Navigate to={page.href ?? '/'} replace />} />
              </Route>
            );
          }
          return <Route key={page.id} path={page.href} element={<page.element />} />;
        })}
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </>
  );
}

export default App;
