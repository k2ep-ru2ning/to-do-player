import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import FormErrorMessage from "./FormErrorMessage";
import TimeUnitInput from "./TimeUnitInput";

export default function TaskAddForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      [taskAddFormFieldName.NAME]: "",
      [taskAddFormFieldName.HOUR]: "0",
      [taskAddFormFieldName.MINUTE]: "0",
      [taskAddFormFieldName.SECOND]: "0",
    },
  });

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
      <div className="space-y-1">
        <label className="flex flex-col gap-y-1">
          <span className="form-label-text">할 일</span>
          <input
            type="text"
            placeholder="할 일을 추가하세요."
            {...register(taskAddFormFieldName.NAME, validation[taskAddFormFieldName.NAME])}
            className="form-input"
          />
        </label>
        <FormErrorMessage errorMessage={errors[taskAddFormFieldName.NAME]?.message} />
      </div>
      <div className="space-y-1">
        <fieldset className="space-y-1">
          <legend className="form-label-text">계획 시간</legend>
          <div className="flex flex-col md:flex-row gap-2">
            <TimeUnitInput
              register={register}
              labelText="시간"
              name={taskAddFormFieldName.HOUR}
              min={validation[taskAddFormFieldName.HOUR].min.value}
              max={validation[taskAddFormFieldName.HOUR].max.value}
              validation={validation[taskAddFormFieldName.HOUR]}
            />
            <TimeUnitInput
              register={register}
              labelText="분"
              name={taskAddFormFieldName.MINUTE}
              min={validation[taskAddFormFieldName.MINUTE].min.value}
              max={validation[taskAddFormFieldName.MINUTE].max.value}
              validation={validation[taskAddFormFieldName.MINUTE]}
            />
            <TimeUnitInput
              register={register}
              labelText="초"
              name={taskAddFormFieldName.SECOND}
              min={validation[taskAddFormFieldName.SECOND].min.value}
              max={validation[taskAddFormFieldName.SECOND].max.value}
              validation={validation[taskAddFormFieldName.SECOND]}
            />
          </div>
        </fieldset>
        <FormErrorMessage errorMessage={errors[taskAddFormFieldName.HOUR]?.message} />
        <FormErrorMessage errorMessage={errors[taskAddFormFieldName.MINUTE]?.message} />
        <FormErrorMessage errorMessage={errors[taskAddFormFieldName.SECOND]?.message} />
      </div>
      <button type="submit" className="btn primary-btn">
        할 일 추가
      </button>
    </form>
  );
}

TaskAddForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export const taskAddFormFieldName = Object.freeze({
  NAME: "taskName",
  HOUR: "taskTimeHour",
  MINUTE: "taskTimeMinute",
  SECOND: "taskTimeSecond",
});

const validation = {
  [taskAddFormFieldName.NAME]: {
    required: {
      value: true,
      message: "할 일을 입력해주세요.",
    },
  },
  [taskAddFormFieldName.HOUR]: {
    required: {
      value: true,
      message: "시간을 입력해주세요.",
    },
    min: {
      value: 0,
      message: "시간을 0~2 사이로 입력해주세요. 3시간이 넘는 계획은 무리한 계획일 수 있습니다.",
    },
    max: {
      value: 2,
      message: "시간을 0~2 사이로 입력해주세요. 3시간이 넘는 계획은 무리한 계획일 수 있습니다.",
    },
  },
  [taskAddFormFieldName.MINUTE]: {
    required: {
      value: true,
      message: "분을 입력해주세요.",
    },
    min: {
      value: 0,
      message: "분은 0~59 사이 값이여야 합니다.",
    },
    max: {
      value: 59,
      message: "분은 0~59 사이 값이여야 합니다.",
    },
  },
  [taskAddFormFieldName.SECOND]: {
    required: {
      value: true,
      message: "초를 입력해주세요.",
    },
    min: {
      value: 0,
      message: "초는 0~59 사이 값이여야 합니다.",
    },
    max: {
      value: 59,
      message: "초는 0~59 사이 값이여야 합니다.",
    },
  },
};
