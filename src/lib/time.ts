// 유틸리티 함수: 숫자를 2자리로 패딩
export function pad2(value: number): string {
  return String(value).padStart(2, '0');
}

// 유틸리티 함수: 남은 시간 계산
export function getRemaining(targetAtMs: number, nowMs: number) {
  const totalMs = Math.max(0, targetAtMs - nowMs);
  const totalSeconds = Math.floor(totalMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    totalMs,
    days,
    hours,
    minutes,
    seconds,
    isComplete: targetAtMs <= nowMs,
  };
}
