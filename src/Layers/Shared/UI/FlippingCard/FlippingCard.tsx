import { forwardRef, ReactNode, useEffect, useState } from 'react';

import cn from 'classnames';
import ReactCardFlip from 'react-card-flip';

import styles from './styles.module.scss';

type FlippingCardProps = {
  frontComponent: ReactNode;
  backComponent: ReactNode;
  isFlipped?: boolean;
  onChange?: (value: boolean) => void;
  onClick?: () => void;
  flipDirection?: 'vertical' | 'horizontal';
  className?: string;
};

export const FlippingCard = forwardRef<HTMLDivElement, FlippingCardProps>(function FlippingCard(
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
