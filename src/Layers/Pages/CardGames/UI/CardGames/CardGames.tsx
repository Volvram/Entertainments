import React from 'react';

import { Link, Outlet, useLocation } from 'react-router-dom';

import { Card } from '@/Layers/Shared/UI/Card';

import styles from './styles.module.scss';
import { CARD_GAMES } from '../../lib/consts/cardGames.ts';
import { TCardGame } from '../../UI/CardGames/Types.ts';

export const CardGames: React.FC = () => {
  const { pathname } = useLocation();

  const defineHref = (cardGame: TCardGame<TCardGame<any>>) => {
    if (cardGame.href) {
      if (cardGame.element) {
        return cardGame.href.slice(1);
      } else if (cardGame.nestedPages) {
        return `${cardGame.href.slice(1)}${cardGame.nestedPages[0].href ?? ''}`;
      }
    }

    return '/';
  };

  return (
    <div className={styles.cards}>
      {pathname === '/cards' ? (
        <div>
          <h2 className={styles.cards_h}>Выберите карточную игру</h2>
          <div className={styles.cards_sections}>
            {CARD_GAMES.map((cardGame) => {
              return (
                <Link
                  key={cardGame.id}
                  to={defineHref(cardGame)}
                  className={styles.cards_sections_section}
                >
                  <Card
                    title={cardGame.name}
                    image={cardGame.image}
                    className={styles.cards_sections_section_card}
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
