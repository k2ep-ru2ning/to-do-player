import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import FormErrorMessage from "./FormErrorMessage";
import TimeUnitInput from "./TimeUnitInput";

export default function TaskUpdateForm({ onSubmit, defaultValues }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
      <div className="space-y-1">
        <label className="flex flex-col gap-y-1">
          <span className="form-label-text">할 일</span>
          <input
            type="text"
            placeholder="할 일을 수정하세요."
            {...register(taskUpdateFormFieldName.NAME, validation[taskUpdateFormFieldName.NAME])}
            className="form-input"
          />
        </label>
        <FormErrorMessage errorMessage={errors[taskUpdateFormFieldName.NAME]?.message} />
      </div>
      <div className="space-y-1">
        <fieldset className="space-y-1">
          <legend className="form-label-text">계획 시간</legend>
          <div className="flex flex-col md:flex-row gap-2">
            <TimeUnitInput
              register={register}
              labelText="시간"
              name={taskUpdateFormFieldName.HOUR}
              min={validation[taskUpdateFormFieldName.HOUR].min.value}
              max={validation[taskUpdateFormFieldName.HOUR].max.value}
              validation={validation[taskUpdateFormFieldName.HOUR]}
            />
            <TimeUnitInput
              register={register}
              labelText="분"
              name={taskUpdateFormFieldName.MINUTE}
              min={validation[taskUpdateFormFieldName.MINUTE].min.value}
              max={validation[taskUpdateFormFieldName.MINUTE].max.value}
              validation={validation[taskUpdateFormFieldName.MINUTE]}
            />
            <TimeUnitInput
              register={register}
              labelText="초"
              name={taskUpdateFormFieldName.SECOND}
              min={validation[taskUpdateFormFieldName.SECOND].min.value}
              max={validation[taskUpdateFormFieldName.SECOND].max.value}
              validation={validation[taskUpdateFormFieldName.SECOND]}
            />
          </div>
        </fieldset>
        <FormErrorMessage errorMessage={errors[taskUpdateFormFieldName.HOUR]?.message} />
        <FormErrorMessage errorMessage={errors[taskUpdateFormFieldName.MINUTE]?.message} />
        <FormErrorMessage errorMessage={errors[taskUpdateFormFieldName.SECOND]?.message} />
      </div>
      <button type="submit" className="btn primary-btn">
        수정하기
      </button>
    </form>
  );
}

export const taskUpdateFormFieldName = Object.freeze({
  NAME: "taskName",
  HOUR: "taskTimeHour",
  MINUTE: "taskTimeMinute",
  SECOND: "taskTimeSecond",
});

TaskUpdateForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  defaultValues: PropTypes.shape({
    [taskUpdateFormFieldName.NAME]: PropTypes.string.isRequired,
    [taskUpdateFormFieldName.HOUR]: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    [taskUpdateFormFieldName.MINUTE]: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    [taskUpdateFormFieldName.SECOND]: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
  }).isRequired,
};

const validation = {
  [taskUpdateFormFieldName.NAME]: {
    required: {
      value: true,
      message: "수정할 할 일 이름을 입력해주세요.",
    },
  },
  [taskUpdateFormFieldName.HOUR]: {
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
  [taskUpdateFormFieldName.MINUTE]: {
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
  [taskUpdateFormFieldName.SECOND]: {
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
