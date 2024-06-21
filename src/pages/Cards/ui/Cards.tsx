import React from 'react';

import { Link, Outlet, useLocation } from 'react-router-dom';

import { cardGames } from '@/pages/config/cardGames.ts';
import { Card } from '@/shared/ui/Card';

import styles from './styles.module.scss';

const Cards: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <div className={styles.cards}>
      {pathname == '/cards' ? (
        <div>
          <h2 className={styles.cards_h}>Выберите карточную игру</h2>
          <div className={styles.cards_sections}>
            {cardGames.map((cardGame) => {
              return (
                <Link key={cardGame.id} to={cardGame.href?.slice(1) ?? '/'}>
                  <Card
                    title={cardGame.name}
                    image={cardGame.image}
                    className={styles.cards_sections_section}
                    imageClassName={styles.cards_sections_section_img}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default Cards;
