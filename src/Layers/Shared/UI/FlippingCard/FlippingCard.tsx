import { forwardRef, useEffect, useState } from 'react';

import cn from 'classnames';
import ReactCardFlip from 'react-card-flip';

import styles from './styles.module.scss';
import { TFlippingCard } from './Types';

export const FlippingCard = forwardRef<HTMLDivElement, TFlippingCard>(function FlippingCard(
  {
    frontComponent,
    backComponent,
    isFlipped = false,
    onChange,
    onClick,
    flipDirection = 'horizontal',
    className,
  },
  ref
) {
  const [_isFlipped, setIsFlipped] = useState(isFlipped);

  // Триггернуть переворот карточки
  useEffect(() => {
    setIsFlipped(isFlipped);
  }, [isFlipped]);

  // Активировать действие при изменении стороны
  useEffect(() => {
    onChange?.(!_isFlipped);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_isFlipped]);

  return (
    <div ref={ref} className={cn(styles.flippingCard, className)} onClick={onClick}>
      <ReactCardFlip isFlipped={_isFlipped} flipDirection={flipDirection}>
        {frontComponent}
        {backComponent}
      </ReactCardFlip>
    </div>
  );
});
