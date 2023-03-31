export type ToDo = {
  id: string;
  name: string;
  scheduledTimeInSecond: number;
  remainingTimeInSecond: number;
};

export type SelectedToDo = ToDo & {
  deadlineTimeStampInSecond: number | null;
};
