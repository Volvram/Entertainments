export type TSection = {
  id: string;
  name: string;
  image?: string;
  href?: string;
};

export type TSectionItem = {
  section: TSection;
  onClick?: () => void;
  className?: string;
};
