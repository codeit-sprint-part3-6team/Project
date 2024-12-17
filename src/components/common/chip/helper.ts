import { bgTag } from '@/type/chip';

/**
 * 랜덤한 tag 클래스를 반환하는 함수
 * - bgTag 배열에서 랜덤하게 선택
 *
 * @param {Record<string, string>} styles - 스타일 객체
 * @returns {string} 랜덤 배경색 클래스 이름
 */
const getTagColor = (styles: Record<string, string>): string => {
  if (!bgTag || bgTag.length === 0) return '';
  const idx = Math.floor(Math.random() * bgTag.length);
  return styles[bgTag[idx]];
};

export default getTagColor;
