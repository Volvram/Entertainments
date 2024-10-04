import React from 'react';

export type TInput = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  /** Значение поля */
  value?: string | string[];
  /** Callback, вызываемый при вводе данных в поле */
  onChange: ((value: string | string[]) => void) | ((value: string) => void);
  onEnterClick?: (value: string | string[]) => void;
  className?: string;
  containerClassName?: string;
  disabled?: boolean;
  icon?: string;
  iconAlt?: string;
  onIconClick?: () => void;
};
