import { TSection } from '../SectionItem/Types';

export type TSectionsList = {
  sections: TSection[];
  onSectionClick?: () => void;
};
