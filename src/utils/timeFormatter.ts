type HourMinuteSecond = {
  hour: number;
  minute: number;
  second: number;
};

export function formatTimeUnit(timeUnit: number): string {
  if (timeUnit < 0 || !Number.isInteger(timeUnit)) {
    throw new Error("timeUnit(hour, minute or second) is invalid");
  }

  const prefix = timeUnit < 10 ? "0" : "";
  return prefix + timeUnit;
}

export function formatHourMinuteSecond({
  hour,
  minute,
  second,
}: HourMinuteSecond): string {
  if (
    [hour, minute, second].some((t) => t < 0) ||
    [hour, minute, second].some((t) => !Number.isInteger(t))
  ) {
    throw new Error("hour, minute or second is invalid");
  }

  const hh = formatTimeUnit(hour);
  const mm = formatTimeUnit(minute);
  const ss = formatTimeUnit(second);

  return `${hh}:${mm}:${ss}`;
}
