import PropTypes from "prop-types";
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  VStack,
} from "@chakra-ui/react";
import { Controller, useFieldArray, useWatch } from "react-hook-form";
import { useEffect } from "react";

export default function HourMinuteSecondTimeFieldArrayFormControl({
  trigger,
  error,
  name,
  control,
  labelText,
}) {
  const { fields } = useFieldArray({
    control,
    name,
    rules: {
      validate: {
        notZeroTime: (time) => {
          if (time.some((timeUnit) => timeUnit === "")) return true;

          return (
            time.some((timeUnit) => Number(timeUnit) !== 0) ||
            "계획 시간은 0시간 0분 0초 일 수 없습니다."
          );
        },
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

  const fieldArrayErrorMessage = error?.root?.message;

  return (
    <FormControl as="fieldset" isInvalid={Boolean(error)}>
      <FormLabel as="legend">{labelText}</FormLabel>
      <VStack space={2}>
        {fields.map(({ id }, index) => {
          const fieldName = `${name}.${index}`;
          const fieldLabelText = timeFieldLabels[index];
          const fieldValidation = timeFieldValidations[index];
          const fieldError = error?.[index];
          const fieldErrorMessage = fieldError?.message;

          return (
            <FormControl key={id} isRequired isInvalid={Boolean(fieldError)}>
              <Flex alignItems="center" columnGap={3}>
                <Controller
                  control={control}
                  name={fieldName}
                  rules={fieldValidation}
                  render={({ field }) => (
                    <NumberInput
                      {...field}
                      maxW={24}
                      min={fieldValidation.min.value}
                      max={fieldValidation.max.value}
                    >
                      <NumberInputField textAlign="end" />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  )}
                />
                <FormLabel flexShrink={0}>{fieldLabelText}</FormLabel>
              </Flex>
              <FormErrorMessage>{fieldErrorMessage}</FormErrorMessage>
            </FormControl>
          );
        })}
      </VStack>
      <FormErrorMessage>{fieldArrayErrorMessage}</FormErrorMessage>
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
      message:
        "시간을 0~2 사이로 입력해주세요. 3시간이 넘는 계획은 무리한 계획일 수 있습니다.",
    },
    max: {
      value: 2,
      message:
        "시간을 0~2 사이로 입력해주세요. 3시간이 넘는 계획은 무리한 계획일 수 있습니다.",
    },
    validate: {
      mustBeInteger: (hour) =>
        Number.isInteger(Number(hour)) || "시간을 정수 형태로 입력해주세요.",
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
    validate: {
      mustBeInteger: (minute) =>
        Number.isInteger(Number(minute)) || "분을 정수 형태로 입력해주세요.",
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
    validate: {
      mustBeInteger: (second) =>
        Number.isInteger(Number(second)) || "초를 정수 형태로 입력해주세요.",
    },
  },
];
