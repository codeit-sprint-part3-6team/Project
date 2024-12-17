// 연속되는 이벤트 발생 시 이벤트 핸들러가 자주 실행되는 것을 방지하는 함수
export default function debounce(
  func: (...args: any[]) => void,
  delay: number,
) {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
