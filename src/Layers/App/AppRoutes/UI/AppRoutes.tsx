import React from 'react';

import { Navigate, Route, Routes } from 'react-router';

import { PAGES } from '@/Layers/App/AppRoutes/lib/consts/pages.ts';

import { TPage } from './Types.ts';
import { useAppSelector } from '../../ConfigureRTK/hooks';

export const AppRoutes = () => {
  const { theme } = useAppSelector((state) => state.themeReducer);

  React.useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Рекурсивная функция формирования роутов с учетом вложения
  const renderRoutes = (pages: TPage<TPage<never>>[], basePath = '') => {
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
      <Routes>
        {renderRoutes(PAGES)}
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </>
  );
};
