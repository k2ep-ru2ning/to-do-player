import { useFieldArray, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import TimeUnitFormControl from "./TimeUnitFormControl";
import { useEffect } from "react";

export default function TaskAddForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    trigger,
  } = useForm({
    defaultValues: {
      name: "",
      time: ["0", "30", "0"],
    },
    mode: "onChange",
  });

  const { fields: timeFields } = useFieldArray({
    control,
    name: "time",
    rules: {
      validate: {
        notZeroTime: (time) =>
          time.some((timeUnit) => timeUnit != "0") || "계획 시간은 0시간 0분 0초 일 수 없습니다.",
      },
    },
  });

  useEffect(() => {
    trigger("time");
  }, [...watch("time")]);

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Flex direction="column" rowGap={4} py={4}>
        <FormControl isRequired isInvalid={Boolean(errors.name)}>
          <FormLabel>할 일</FormLabel>
          <Input
            type="text"
            placeholder="할 일을 추가하세요."
            {...register("name", fieldValidation.name)}
          />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>
        <FormControl as="fieldset" isInvalid={Boolean(errors.time)}>
          <FormLabel as="legend">계획 시간</FormLabel>
          <VStack space={2}>
            {timeFields.map((field, index) => (
              <TimeUnitFormControl
                key={field.id}
                control={control}
                name={`time.${index}`}
                labelText={timeFieldLabels[index]}
                min={fieldValidation.time[index].min.value}
                max={fieldValidation.time[index].max.value}
                validation={fieldValidation.time[index]}
                errorMessage={errors.time?.[index]?.message}
              />
            ))}
          </VStack>
          <FormErrorMessage>{errors.time?.root?.message}</FormErrorMessage>
        </FormControl>
        <Button colorScheme="main" variant="outline" type="submit">
          할 일 추가
        </Button>
      </Flex>
    </form>
  );
}

TaskAddForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

const timeFieldLabels = ["시간", "분", "초"];

const fieldValidation = {
  name: {
    required: {
      value: true,
      message: "할 일을 입력해주세요.",
    },
  },
  time: [
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
  ],
};
