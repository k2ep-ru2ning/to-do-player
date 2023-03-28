export type HourMinuteSecond = {
  hour: number;
  minute: number;
  second: number;
};

function isTimeUnitValid(timeUnit: number): boolean {
  return timeUnit >= 0 && Number.isInteger(timeUnit);
}

function isHourMinuteSecondValid({
  hour,
  minute,
  second,
}: HourMinuteSecond): boolean {
  return [hour, minute, second].every(isTimeUnitValid);
}

export function convertSecondIntoHourMinuteSecond(
  second: number
): HourMinuteSecond {
  if (!isTimeUnitValid(second)) {
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
  if (!isHourMinuteSecondValid({ hour, minute, second })) {
    throw new Error("hour, minute or second is invalid");
  }

  return 3600 * hour + 60 * minute + second;
}

export function convertMSIntoSecond(ms: number): number {
  if (!isTimeUnitValid(ms)) {
    throw new Error("ms is invalid");
  }

  return Math.floor(ms / 1000);
}

export function formatTimeUnit(timeUnit: number): string {
  if (!isTimeUnitValid(timeUnit)) {
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
  if (!isHourMinuteSecondValid({ hour, minute, second })) {
    throw new Error("hour, minute or second is invalid");
  }

  const hh = formatTimeUnit(hour);
  const mm = formatTimeUnit(minute);
  const ss = formatTimeUnit(second);

  return `${hh}:${mm}:${ss}`;
}
