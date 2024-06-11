import React from 'react';

import styles from './styles.module.scss';

type ToggleProps = {
  value: boolean;
  onChange: () => void;
};
export const Toggle: React.FC<ToggleProps> = ({ value, onChange }) => (
  <label className={styles.switch} htmlFor='toggler'>
    <input id='toggler' type='checkbox' onClick={onChange} checked={value} readOnly />
    <span className={styles.slider} />
    <span className={styles.wave} />
  </label>
);
