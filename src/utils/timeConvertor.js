export function convertTimeFromSecondToHourMinuteSecond(second = 0) {
  if (second < 0) {
    second = 0;
  }

  let time = second;
  const s = time % 60;
  time = Math.trunc(time / 60);
  const m = time % 60;
  time = Math.trunc(time / 60);
  const h = time;

  return {
    hour: h,
    minute: m,
    second: s,
  };
}
