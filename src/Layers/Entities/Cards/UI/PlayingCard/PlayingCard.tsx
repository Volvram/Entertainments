import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

import cn from 'classnames';


import styles from './styles.module.scss';
import { CARD_BACK_IMAGE } from '../../consts/cardBackImage.ts';
import { CustomPlayingCardRefType, TPlayingCard } from '../../UI/PlayingCard/Types.ts';
import { FlippingCard } from '@/Layers/Shared/UI/FlippingCard';

export const PlayingCard = forwardRef<CustomPlayingCardRefType, TPlayingCard>(function PlayingCard(
  { card, flipping = true, isFlipped = false, onClick, className },
  ref
) {
  const cardRef = useRef<HTMLImageElement | null>(null);
  const [_isFlipped, setIsFlipped] = useState(isFlipped);

  useImperativeHandle(
    ref,
    () => ({
      flip: () => {
        setIsFlipped(!_isFlipped);
      },
    }),
    []
  );

  useEffect(() => {
    setIsFlipped(isFlipped);
  }, [isFlipped]);

  const handleOnClick = () => {
    onClick?.(cardRef);

    if (flipping) {
      setIsFlipped(!_isFlipped);
    }
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
    <FlippingCard
      ref={cardRef}
      isFlipped={_isFlipped}
      onClick={handleOnClick}
      frontComponent={
        <img
          key={card.code}
          src={card.image}
          onLoad={receiveCard}
          onMouseOver={hoverCard}
          onMouseOut={unhoverCard}
          className={cn(styles.playingCard, className)}
          alt={card.code}
        />
      }
      backComponent={
        <img
          key={card.code}
          src={CARD_BACK_IMAGE}
          onLoad={receiveCard}
          onMouseOver={hoverCard}
          onMouseOut={unhoverCard}
          className={cn(styles.playingCard, className)}
          alt={card.code}
        />
      }
    />
  );
});
