type HourMinuteSecond = {
  hour: number;
  minute: number;
  second: number;
};

export function convertSecondIntoHourMinuteSecond(
  second: number
): HourMinuteSecond {
  if (second < 0 || !Number.isInteger(second)) {
    throw new Error("second is invalid");
  }

  let time = second;
  const s = time % 60;
  time = Math.floor(time / 60);
  const m = time % 60;
  time = Math.floor(time / 60);
  const h = time;

  return {
    hour: h,
    minute: m,
    second: s,
  };
}

export function convertHourMinuteSecondIntoSecond({
  hour,
  minute,
  second,
}: HourMinuteSecond): number {
  if (
    [hour, minute, second].some((t) => t < 0) ||
    [hour, minute, second].some((t) => !Number.isInteger(t))
  ) {
    throw new Error("hour, minute or second is invalid");
  }

  return 3600 * hour + 60 * minute + second;
}

export function convertMSIntoSecond(ms: number): number {
  if (ms < 0 || !Number.isInteger(ms)) {
    throw new Error("ms is invalid");
  }

  return Math.floor(ms / 1000);
}
