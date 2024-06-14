import React, { PropsWithChildren } from 'react';

import cn from 'classnames';

import styles from './styles.module.scss';

type BlockProps = PropsWithChildren<{
  className?: string;
}>;
const Block: React.FC<BlockProps> = ({ className, children }) => {
  return <div className={cn(styles.root, className)}>{children}</div>;
};

export default Block;
