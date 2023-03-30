export type Task = {
  id: string;
  name: string;
  scheduledTimeInSecond: number;
  remainingTimeInSecond: number;
};

export type SelectedTask = Task & {
  deadlineTimeStampInSecond: number | null;
};
