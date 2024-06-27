import React, { useRef } from 'react';

import cn from 'classnames';

import { CardType } from '@/shared/types/CardType.ts';

import styles from './styles.module.scss';

type PlayingCardProps = {
  card: CardType;
  onClick?: (ref: React.MutableRefObject<HTMLImageElement | null>) => void;
  className?: string;
};
const PlayingCard: React.FC<PlayingCardProps> = ({ card, onClick, className }) => {
  const cardRef = useRef<HTMLImageElement | null>(null);

  const handleOnClick = () => {
    onClick?.(cardRef);
  };
  const receiveCard = () => {
    cardRef.current?.animate(
      [
        {
          transform: 'translate(-300%, -300%)',
        },
        {
          transform: 'translate(0, 0)',
        },
      ],
      {
        duration: 500,
        fill: 'forwards',
      }
    );
  };

  const hoverCard = () => {
    cardRef.current?.animate(
      [
        {
          transform: 'translate(0, 0)',
        },
        {
          transform: 'translate(5px, -5px)',
        },
      ],
      {
        duration: 400,
        fill: 'forwards',
      }
    );
  };

  const unhoverCard = () => {
    cardRef.current?.animate(
      [
        {
          transform: 'translate(5px, -5px)',
        },
        {
          transform: 'translate(0, 0)',
        },
      ],
      {
        duration: 400,
        fill: 'forwards',
      }
    );
  };

  return (
    <img
      ref={cardRef}
      key={card.code}
      src={card.image}
      onClick={handleOnClick}
      onLoad={receiveCard}
      onMouseOver={hoverCard}
      onMouseOut={unhoverCard}
      className={cn(styles.playingCard, className)}
      alt={card.code}
    />
  );
};

export default PlayingCard;
