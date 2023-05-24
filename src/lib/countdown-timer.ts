type OnTick = (countInSecond: number) => void;
type OnFinish = () => void;
type Status = "idle" | "scheduled" | "running";

const DELAY_IN_MS = 1000;
const NOT_SCHEDULED_DURATION = -1;
const NOT_RUNNING_DEADLINE = -1;

export default class CountdownTimer {
  private scheduledDurationInSecond: number;
  private deadlineTimestampInMS: number;
  private intervalID?: number;
  private onTick?: OnTick;
  private onFinish?: OnFinish;

  constructor() {
    this.scheduledDurationInSecond = NOT_SCHEDULED_DURATION;
    this.deadlineTimestampInMS = NOT_RUNNING_DEADLINE;
  }

  setOnTick(onTick: OnTick): void {
    if (this.status === "running") {
      throw new Error("CountdownTimer is running now. Can't set onTick.");
    }

    this.onTick = onTick;
  }

  setOnFinish(onFinish: OnFinish): void {
    if (this.status === "running") {
      throw new Error("CountdownTimer is running now. Can't set onFinish.");
    }

    this.onFinish = onFinish;
  }

  schedule(scheduledDurationInSecond: number): void {
    if (this.status === "running") {
      throw new Error("CountdownTimer is running now. Can't schedule.");
    }

    if (
      !Number.isInteger(scheduledDurationInSecond) ||
      scheduledDurationInSecond <= 0
    ) {
      throw new Error("scheduledDurationInSecond must be positive integer.");
    }

    this.scheduledDurationInSecond = scheduledDurationInSecond;
  }

  start(): void {
    if (this.status !== "scheduled") {
      throw new Error("CountdownTimer is not scheduled. Can't start.");
    }

    this.deadlineTimestampInMS =
      Date.now() + this.scheduledDurationInSecond * 1000;

    this.intervalID = window.setInterval(() => {
      this.tick();
    }, DELAY_IN_MS);

    this.tick();
  }

  stop(): void {
    window.clearInterval(this.intervalID);
    this.scheduledDurationInSecond = NOT_SCHEDULED_DURATION;
    this.deadlineTimestampInMS = NOT_RUNNING_DEADLINE;
  }

  private tick(): void {
    if (this.status !== "running") {
      throw new Error("CountdownTimer is not running. Can't tick.");
    }

    const countInSecond = this.getCountInSecond();
    this.onTick?.(countInSecond);
    if (countInSecond === 0) {
      this.stop();
      this.onFinish?.();
    }
  }

  private getCountInSecond(): number {
    if (this.status !== "running") {
      throw new Error(
        "CountdownTimer is not running. Can't calculate current count in second."
      );
    }

    const countInMS = this.deadlineTimestampInMS - Date.now();
    return countInMS <= 0 ? 0 : Math.ceil(countInMS / 1000);
  }

  private get status(): Status {
    if (
      this.deadlineTimestampInMS === NOT_RUNNING_DEADLINE &&
      this.scheduledDurationInSecond === NOT_SCHEDULED_DURATION
    ) {
      return "idle";
    } else if (
      this.deadlineTimestampInMS === NOT_RUNNING_DEADLINE &&
      this.scheduledDurationInSecond !== NOT_SCHEDULED_DURATION
    ) {
      return "scheduled";
    } else if (
      this.deadlineTimestampInMS !== NOT_RUNNING_DEADLINE &&
      this.scheduledDurationInSecond !== NOT_SCHEDULED_DURATION
    ) {
      return "running";
    } else {
      throw new Error("CountdownTimer status is invalid.");
    }
  }
}
