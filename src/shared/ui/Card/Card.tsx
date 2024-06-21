import React, { PropsWithChildren } from 'react';

import cn from 'classnames';

import styles from './styles.module.scss';

type CardProps = PropsWithChildren<{
  title?: string;
  image?: string;
  description?: string;
  className?: string;
  imageClassName?: string;
}>;

export const Card: React.FC<CardProps> = ({
  title,
  image,
  description,
  className,
  imageClassName,
  children,
}) => {
  return (
    <div className={cn(styles.card, className)}>
      <div className={styles.card_common}>
        {image && (
          <img
            src={image}
            className={cn(styles.card_common_img, imageClassName)}
            alt={title ?? ''}
          />
        )}
        {title && <span className={styles.card_common_title}>{title}</span>}
        {description && <p>{description}</p>}
      </div>
      {children}
    </div>
  );
};
