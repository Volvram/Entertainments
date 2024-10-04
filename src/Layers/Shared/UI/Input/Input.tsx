import React, { forwardRef, useCallback, useEffect, useRef } from 'react';

import cn from 'classnames';

import styles from './styles.module.scss';

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
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

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    value = '',
    onChange,
    onEnterClick,
    className,
    containerClassName,
    disabled = false,
    icon,
    iconAlt = '',
    onIconClick,
    ...attributes
  },
  ref
) {
  const [currentValue, setValue] = React.useState<string | string[]>(value);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const enterClick = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        onEnterClick && onEnterClick(currentValue);
      }
    },
    [onEnterClick, currentValue]
  );

  useEffect(() => {
    const container = containerRef.current;

    container && container.addEventListener('keydown', enterClick);

    return () => {
      container && container.removeEventListener('keydown', enterClick);
    };
  }, [containerRef, enterClick]);

  React.useEffect(() => {
    setValue(value);
  }, [value]);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    setValue(target.value);
    onChange(target.value);
  };

  return (
    <div ref={containerRef} className={cn(containerClassName, styles.container)}>
      <input
        ref={ref}
        type='text'
        className={cn(className, styles.input, disabled && styles.input_disabled)}
        value={currentValue}
        onInput={handleInput}
        disabled={disabled}
        {...attributes}
      />
      {icon && (
        <img
          src={icon}
          onClick={onIconClick}
          alt={iconAlt}
          className={cn(
            styles.input_icon,
            !disabled && onIconClick && styles.input_icon__clickable
          )}
        />
      )}
    </div>
  );
});
