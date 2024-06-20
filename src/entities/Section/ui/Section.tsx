import React from 'react';

import cn from 'classnames';
import { Link } from 'react-router-dom';

import { SectionType } from '@/entities/Section/types.ts';

import styles from './styles.module.scss';

type SectionProps = {
  section: SectionType;
  onClick?: () => void;
  className?: string;
};
const Section: React.FC<SectionProps> = ({ section, onClick, className }) => {
  return (
    <div>
      {section.href ? (
        <Link
          to={section.href}
          key={section.id}
          onClick={onClick}
          className={cn(styles.root, className)}
        >
          {section.name}
        </Link>
      ) : (
        <div key={section.id} onClick={onClick} className={cn(styles.root, className)}>
          {section.name}
        </div>
      )}
    </div>
  );
};

export default Section;
