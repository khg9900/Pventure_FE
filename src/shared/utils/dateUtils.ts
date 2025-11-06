/**
 * ✅ 문자열(YYYY-MM-DD)을 로컬 기준 Date 객체로 변환
 *  - new Date("2025-09-10") 시 UTC 보정 문제를 방지
 *
 * @param dateStr 변환할 날짜 문자열
 * @returns 로컬 시간 기준 Date 객체
 *
 * @example
 * parseLocalDate("2025-09-10")
 * // → 2025년 9월 10일 00:00:00 (로컬)
 */
export function parseLocalDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day); // month는 0부터 시작
}

/**
 * ✅ Date → YYYY-MM-DD 문자열 변환
 *  - 서버 전송 또는 UI 표시용 포맷
 *
 * @param date 변환할 Date 객체
 * @returns YYYY-MM-DD 형식의 문자열
 *
 * @example
 * formatDateToString(new Date(2025, 8, 10))
 * // → "2025-09-10"
 */
export function formatDateToString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/**
 * ✅ 두 날짜가 같은지(연/월/일 기준) 비교
 *
 * @param a 첫 번째 날짜
 * @param b 두 번째 날짜
 * @returns 동일한 날짜면 true
 */
export function isSameDate(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/**
 * ✅ 여행 시작일~종료일 구간의 day 배열 생성
 *  - Trip의 day별 스케줄 구성 시 사용
 *
 * @param startDate 여행 시작일
 * @param endDate 여행 종료일
 * @returns { day: number; date: string }[] 형태의 배열
 *
 * @example
 * getTripDays(new Date("2025-09-10"), new Date("2025-09-12"))
 * // → [
 * //   { day: 1, date: "2025-09-10" },
 * //   { day: 2, date: "2025-09-11" },
 * //   { day: 3, date: "2025-09-12" }
 * // ]
 */
export function getTripDays(startDate: Date, endDate: Date) {
  const days: { day: number; date: string }[] = [];
  const diff =
    Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

  for (let i = 0; i < diff; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    days.push({
      day: i + 1,
      date: formatDateToString(date),
    });
  }

  return days;
}

/**
 * ✅ 특정 day 인덱스의 실제 날짜(Date) 반환
 *  - Trip 시작일 + (day - 1)
 *
 * @param startDate 여행 시작일
 * @param day 1부터 시작하는 day 번호
 * @returns 계산된 날짜(Date)
 */
export function getDateByDay(startDate: Date, day: number): Date {
  const date = new Date(startDate);
  date.setDate(startDate.getDate() + (day - 1));
  return date;
}
