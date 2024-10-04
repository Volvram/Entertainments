import React from 'react';

import { TSection } from '@/Layers/Entities/Section/UI/SectionItem/Types.ts';

export type TPage<Nested = any> = TSection & {
  element?: React.FC;
  nestedPages?: Nested[];
};
