import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

import cn from 'classnames';

import { CARD_BACK_IMAGE } from '@/Layers/Entities/Cards/lib/consts/cardBackImage.ts';
import { FlippingCard } from '@/Layers/Shared/UI/FlippingCard';

import styles from './styles.module.scss';
import { CustomPlayingCardRefType, TPlayingCard } from '../../UI/PlayingCard/Types.ts';

export const PlayingCard = forwardRef<CustomPlayingCardRefType, TPlayingCard>(function PlayingCard(
  { card, flipping = true, isFlipped = false, onClick, receiveCardAnimation, className },
  ref
) {
  const cardRef = useRef<HTMLImageElement | null>(null);
  const [_isFlipped, setIsFlipped] = useState(isFlipped);
  const [appeared, setAppeared] = useState<boolean>(false);

  useImperativeHandle(
    ref,
    () => ({
      flip: () => {
        setIsFlipped(!_isFlipped);
      },
    }),
    [_isFlipped]
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
          onLoad={() => {
            setAppeared(true);
            receiveCardAnimation && receiveCardAnimation(cardRef);
          }}
          onMouseOver={hoverCard}
          onMouseOut={unhoverCard}
          className={cn(styles.playingCard, className, appeared && styles.playingCard_appeared)}
          alt={card.code}
        />
      }
      backComponent={
        <img
          key={card.code}
          src={CARD_BACK_IMAGE}
          onMouseOver={hoverCard}
          onMouseOut={unhoverCard}
          className={cn(styles.playingCard, className, appeared && styles.playingCard_appeared)}
          alt={card.code}
        />
      }
    />
  );
});
