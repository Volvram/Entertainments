import React from 'react';

import { useIntl } from 'react-intl';

import styles from './styles.module.scss';

export const Main: React.FC = () => {
  const intl = useIntl();

  return (
    <div className={styles.main}>
      <h1>{`${intl.messages['welcomeToCenterOfAllThings']}!`}</h1>
    </div>
  );
};
