import React from 'react';

import cn from 'classnames';

import styles from './styles.module.scss';
import { TButton } from './Types.ts';

export const Button: React.FC<TButton> = ({
  children,
  onClick,
  className,
  disabled = false,
  ...rest
}) => {
  const classNames = cn(className, styles.button, disabled && styles.button_disabled);

  return (
    <button type='button' className={classNames} onClick={onClick} disabled={disabled} {...rest}>
      {children}
    </button>
  );
};
