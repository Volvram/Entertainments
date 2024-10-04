import './App.scss';

import { useRef } from 'react';

import MenuIcon from '@mui/icons-material/Menu';

import { ImgButton } from '@/Layers/Entities/ImgButton';
import { CustomDrawerRefType } from '@/Layers/Shared/UI/Drawer/Types.ts';
import { NavDrawer } from '@/Layers/Widgets/NavDrawer';

import { AppRoutes } from './AppRoutes/UI/AppRoutes.tsx';

function App() {
  const menuDrawerRef = useRef<CustomDrawerRefType | null>(null);

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
      <AppRoutes />
    </>
  );
}

export default App;
