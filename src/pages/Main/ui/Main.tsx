import React from 'react';

import styles from './styles.module.scss';

const Main: React.FC = () => {
  return (
    <div className={styles.main}>
      Главная
      <div>Hello world!</div>
    </div>
  );
};

export default Main;
