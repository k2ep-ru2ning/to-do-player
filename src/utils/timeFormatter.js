export function formatTimeUnit(timeUnit = -1) {
  if (timeUnit < 0) {
    throw new Error("timeUnit(hour, minute or second) is invalid");
  }

  const prefix = timeUnit < 10 ? "0" : "";
  return prefix + timeUnit;
}

export function formatTime({ hour = -1, minute = -1, second = -1 }) {
  const hh = formatTimeUnit(hour);
  const mm = formatTimeUnit(minute);
  const ss = formatTimeUnit(second);

  return `${hh}:${mm}:${ss}`;
}
