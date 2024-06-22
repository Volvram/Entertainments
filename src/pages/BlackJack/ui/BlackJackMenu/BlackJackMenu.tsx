import React from 'react';

import { Link } from 'react-router-dom';

import { Button } from '@/shared/ui/Button';

export const BlackJackMenu: React.FC = () => {
  return (
    <div>
      <h1>Блэк-Джек</h1>
      <h3>Меню</h3>
      <Link to='../game'>
        <Button>Начать игру</Button>
      </Link>
    </div>
  );
};
