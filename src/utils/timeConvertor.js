export function convertSecondIntoHourMinuteSecond(second = -1) {
  if (second < 0) {
    throw new Error("second is invalid");
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

export function convertHourMinuteSecondIntoSecond({
  hour = -1,
  minute = -1,
  second = -1,
}) {
  if (hour < 0 || minute < 0 || second < 0) {
    throw new Error("hour, minute or second is invalid");
  }

  return 3600 * hour + 60 * minute + second;
}

export function convertMSIntoSecond(ms = -1) {
  if (ms < 0) {
    throw new Error("ms is invalid");
  }

  return Math.floor(ms / 1000);
}
