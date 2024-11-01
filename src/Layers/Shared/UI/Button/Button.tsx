import React, { MouseEvent } from 'react';

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

  const _onClick = (event: MouseEvent<HTMLButtonElement>) => {
    !disabled && onClick && onClick(event);
  };

  return (
    <button type='button' className={classNames} onClick={_onClick} disabled={disabled} {...rest}>
      {children}
    </button>
  );
};
