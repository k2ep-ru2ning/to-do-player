import PropTypes from "prop-types";
import { FormControl, FormErrorMessage, FormLabel, VStack } from "@chakra-ui/react";
import { useFieldArray, useWatch } from "react-hook-form";
import TimeUnitFormControl from "./TimeUnitFormControl";
import { useEffect } from "react";

export default function HourMinuteSecondTimeFieldArrayFormControl({
  trigger,
  error,
  name,
  control,
  labelText,
}) {
  const { fields: timeFields } = useFieldArray({
    control,
    name,
    rules: {
      validate: {
        notZeroTime: (time) =>
          time.some((timeUnit) => timeUnit != "0") || "계획 시간은 0시간 0분 0초 일 수 없습니다.",
      },
    },
  });

  const [hour, minute, second] = useWatch({
    control,
    name,
  });

  useEffect(() => {
    trigger(name);
  }, [hour, minute, second]);

  return (
    <FormControl as="fieldset" isInvalid={Boolean(error)}>
      <FormLabel as="legend">{labelText}</FormLabel>
      <VStack space={2}>
        {timeFields.map((field, index) => (
          <TimeUnitFormControl
            key={field.id}
            control={control}
            name={`${name}.${index}`}
            labelText={timeFieldLabels[index]}
            min={timeFieldValidations[index].min.value}
            max={timeFieldValidations[index].max.value}
            validation={timeFieldValidations[index]}
            errorMessage={error?.[index]?.message}
          />
        ))}
      </VStack>
      <FormErrorMessage>{error?.root?.message}</FormErrorMessage>
    </FormControl>
  );
}

HourMinuteSecondTimeFieldArrayFormControl.propTypes = {
  error: PropTypes.array,
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  labelText: PropTypes.string.isRequired,
  trigger: PropTypes.func.isRequired,
};

const timeFieldLabels = ["시간", "분", "초"];

const timeFieldValidations = [
  {
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
  {
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
  {
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
];
