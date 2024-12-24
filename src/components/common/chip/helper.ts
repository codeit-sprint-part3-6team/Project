import { bgTag } from '@/type/chip';

const getTagColor = (): string => {
  if (!bgTag || bgTag.length === 0) return '';
  const idx = Math.floor(Math.random() * bgTag.length);
  return bgTag[idx];
};

export default getTagColor;
