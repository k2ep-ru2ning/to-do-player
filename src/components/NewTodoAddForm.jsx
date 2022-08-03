import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

export default function NewTodoAddForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      [newTodoAddFormFieldName.NAME]: "",
      [newTodoAddFormFieldName.HOUR]: "0",
      [newTodoAddFormFieldName.MINUTE]: "0",
      [newTodoAddFormFieldName.SECOND]: "0",
    },
  });

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="todo-name">할 일</label>
        <input
          id="todo-name"
          type="text"
          placeholder="할 일을 추가하세요. 예를 들면, 프로그래밍 공부하기"
          {...register(newTodoAddFormFieldName.NAME, {
            required: "할 일을 입력해주세요.",
          })}
        />
        {errors[newTodoAddFormFieldName.NAME] ? (
          <div>{errors[newTodoAddFormFieldName.NAME].message}</div>
        ) : null}
      </div>
      <fieldset>
        <legend>계획 시간</legend>
        <input
          id="todo-time-hour"
          type="number"
          min={0}
          max={2}
          {...register(newTodoAddFormFieldName.HOUR, {
            min: {
              value: 0,
              message:
                "시간을 0~2 사이로 입력해주세요. 3시간이 넘는 계획은 무리한 계획일 수 있습니다.",
            },
            max: {
              value: 2,
              message:
                "시간을 0~2 사이로 입력해주세요. 3시간이 넘는 계획은 무리한 계획일 수 있습니다.",
            },
          })}
        />
        <span>:</span>
        <input
          id="todo-time-minute"
          type="number"
          min={0}
          max={59}
          {...register(newTodoAddFormFieldName.MINUTE, {
            min: {
              value: 0,
              message: "분은 0~59 사이 값이여야 합니다.",
            },
            max: {
              value: 59,
              message: "분은 0~59 사이 값이여야 합니다.",
            },
          })}
        />
        <span>:</span>
        <input
          id="todo-time-second"
          type="number"
          min={0}
          max={59}
          {...register(newTodoAddFormFieldName.SECOND, {
            min: {
              value: 0,
              message: "초는 0~59 사이 값이여야 합니다.",
            },
            max: {
              value: 59,
              message: "초는 0~59 사이 값이여야 합니다.",
            },
          })}
        />
        {errors[newTodoAddFormFieldName.HOUR] ? (
          <div>{errors[newTodoAddFormFieldName.HOUR].message}</div>
        ) : null}
        {errors[newTodoAddFormFieldName.MINUTE] ? (
          <div>{errors[newTodoAddFormFieldName.MINUTE].message}</div>
        ) : null}
        {errors[newTodoAddFormFieldName.SECOND] ? (
          <div>{errors[newTodoAddFormFieldName.SECOND].message}</div>
        ) : null}
      </fieldset>
      <button type="submit">할 일 추가</button>
    </form>
  );
}

NewTodoAddForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

const newTodoAddFormFieldName = Object.freeze({
  NAME: "todoName",
  HOUR: "todoTimeHour",
  MINUTE: "todoTimeMinute",
  SECOND: "todoTimeSecond",
});
