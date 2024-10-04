import React from 'react';

import styles from './styles.module.scss';
import { TSectionsList } from '../../UI/SectionsList/Types.ts';
import { SectionItem } from '../SectionItem/SectionItem.tsx';

export const SectionsList: React.FC<TSectionsList> = ({ sections, onSectionClick }) => {
  return (
    <div className={styles.root}>
      {sections.map((section) => {
        return (
          <SectionItem
            key={section.id}
            section={section}
            onClick={onSectionClick}
            className={styles.root_section}
          />
        );
      })}
    </div>
  );
};
