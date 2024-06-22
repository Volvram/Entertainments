import './App.scss';
import React, { useRef } from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import { Navigate, Route, Routes } from 'react-router';

import { ImgButton } from '@/entities/ImgButton';
import { pages, PageType } from '@/pages/config/pages.ts';
import { useAppSelector } from '@/shared/lib/hooks/redux.ts';
import { CustomDrawerRefType } from '@/shared/ui/Drawer/types.ts';
import { NavDrawer } from '@/widgets/NavDrawer';

function App() {
  const { theme } = useAppSelector((state) => state.themeReducer);
  const menuDrawerRef = useRef<CustomDrawerRefType | null>(null);

  React.useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Рекурсивная функция формирования роутов с учетом вложения
  const renderRoutes = (pages: PageType<PageType<never>>[], basePath = '') => {
    return pages.map((page) => {
      const fullPath = `${basePath}${page.href}`.replace(/\/+/g, '/'); // Удаляем дублирующиеся слэши

      if (page.nestedPages) {
        return (
          <Route key={page.id} path={fullPath} element={page.element && <page.element />}>
            {renderRoutes(page.nestedPages, `${fullPath}`)}
            <Route path='*' element={<Navigate to={fullPath} replace />} />
          </Route>
        );
      }

      return <Route key={page.id} path={fullPath} element={page.element && <page.element />} />;
    });
  };

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
        {renderRoutes(pages)}
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </>
  );
}

export default App;
