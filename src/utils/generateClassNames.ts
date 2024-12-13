/**
 * 각 클래스 이름에 해당하는 스타일을 매핑하는 유틸 함수
 *
 * @param {string | string[]} classes - 클래스 이름 문자열 또는 문자열 배열
 * @param {Record<string, string>} styles - 클래스 이름에 대한 스타일을 매핑한 객체
 * @returns {string[]} 스타일을 매핑한 클래스 이름 배열
 *
 * - `classes`가 문자열일 경우 해당 클래스에 해당하는 스타일을 반환하고,
 * - `classes`가 배열일 경우 배열 내 각 클래스에 대해 스타일을 적용한 결과를 반환합니다.
 * - module.css에 해당 클래스가 없으면 원래의 클래스 이름을 그대로 반환합니다.
 */
const generateClassNames = (
  classes: string | string[],
  styles: Record<string, string>,
): string[] => {
  if (!classes) return [];
  return Array.isArray(classes)
    ? classes.map((className) => styles[className] || className)
    : [styles[classes] || classes];
};

export default generateClassNames;
