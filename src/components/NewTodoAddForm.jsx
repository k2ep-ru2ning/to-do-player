import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import FormErrorMessage from "./FormErrorMessage";
import TimeUnitInput from "./TimeUnitInput";

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
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
      <div className="space-y-1">
        <label className="flex flex-col gap-y-1">
          <span className="form-label-text">할 일</span>
          <input
            type="text"
            placeholder="할 일을 추가하세요."
            {...register(
              newTodoAddFormFieldName.NAME,
              newTodoAddFormFieldValidation[newTodoAddFormFieldName.NAME],
            )}
            className="form-input"
          />
        </label>
        <FormErrorMessage errorMessage={errors[newTodoAddFormFieldName.NAME]?.message} />
      </div>
      <div className="space-y-1">
        <fieldset className="space-y-1">
          <legend className="form-label-text">계획 시간</legend>
          <div className="flex flex-col md:flex-row gap-2">
            <TimeUnitInput
              register={register}
              labelText="시간"
              name={newTodoAddFormFieldName.HOUR}
              min={newTodoAddFormFieldValidation[newTodoAddFormFieldName.HOUR].min.value}
              max={newTodoAddFormFieldValidation[newTodoAddFormFieldName.HOUR].max.value}
              validation={newTodoAddFormFieldValidation[newTodoAddFormFieldName.HOUR]}
            />
            <TimeUnitInput
              register={register}
              labelText="분"
              name={newTodoAddFormFieldName.MINUTE}
              min={newTodoAddFormFieldValidation[newTodoAddFormFieldName.MINUTE].min.value}
              max={newTodoAddFormFieldValidation[newTodoAddFormFieldName.MINUTE].max.value}
              validation={newTodoAddFormFieldValidation[newTodoAddFormFieldName.MINUTE]}
            />
            <TimeUnitInput
              register={register}
              labelText="초"
              name={newTodoAddFormFieldName.SECOND}
              min={newTodoAddFormFieldValidation[newTodoAddFormFieldName.SECOND].min.value}
              max={newTodoAddFormFieldValidation[newTodoAddFormFieldName.SECOND].max.value}
              validation={newTodoAddFormFieldValidation[newTodoAddFormFieldName.SECOND]}
            />
          </div>
        </fieldset>
        <FormErrorMessage errorMessage={errors[newTodoAddFormFieldName.HOUR]?.message} />
        <FormErrorMessage errorMessage={errors[newTodoAddFormFieldName.MINUTE]?.message} />
        <FormErrorMessage errorMessage={errors[newTodoAddFormFieldName.SECOND]?.message} />
      </div>
      <button type="submit" className="btn primary-btn">
        할 일 추가
      </button>
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

const newTodoAddFormFieldValidation = {
  [newTodoAddFormFieldName.NAME]: {
    required: {
      value: true,
      message: "할 일을 입력해주세요.",
    },
  },
  [newTodoAddFormFieldName.HOUR]: {
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
  [newTodoAddFormFieldName.MINUTE]: {
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
  [newTodoAddFormFieldName.SECOND]: {
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
