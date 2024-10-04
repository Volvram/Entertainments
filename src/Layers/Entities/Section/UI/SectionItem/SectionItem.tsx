import React from 'react';

import cn from 'classnames';
import { Link } from 'react-router-dom';

import { TSectionItem } from '@/Layers/Entities/Section/UI/SectionItem/Types.ts';

import styles from './styles.module.scss';

export const SectionItem: React.FC<TSectionItem> = ({ section, onClick, className }) => {
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
