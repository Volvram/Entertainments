import React from 'react';

import { Section } from '@/entities/Section';
import { SectionType } from '@/entities/Section/types.ts';

import styles from './styles.module.scss';

type SectionsListProps = {
  sections: SectionType[];
  onSectionClick?: () => void;
};
const SectionsList: React.FC<SectionsListProps> = ({ sections, onSectionClick }) => {
  return (
    <div className={styles.root}>
      {sections.map((section) => {
        return (
          <Section
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

export default SectionsList;
