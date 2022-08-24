import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import TimeUnitFormControl from "./TimeUnitFormControl";

export default function TaskAddForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      [taskAddFormFieldName.NAME]: "",
      [taskAddFormFieldName.HOUR]: "0",
      [taskAddFormFieldName.MINUTE]: "0",
      [taskAddFormFieldName.SECOND]: "0",
    },
  });

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Flex direction="column" rowGap={4} py={4}>
        <FormControl isRequired isInvalid={Boolean(errors[taskAddFormFieldName.NAME])}>
          <FormLabel>할 일</FormLabel>
          <Input
            type="text"
            placeholder="할 일을 추가하세요."
            {...register(taskAddFormFieldName.NAME, validation[taskAddFormFieldName.NAME])}
          />
          <FormErrorMessage>{errors[taskAddFormFieldName.NAME]?.message}</FormErrorMessage>
        </FormControl>
        <fieldset>
          <Text as="legend" fontWeight="medium" mb="2">
            계획 시간
          </Text>
          <VStack space={2}>
            <TimeUnitFormControl
              control={control}
              labelText="시간"
              name={taskAddFormFieldName.HOUR}
              min={validation[taskAddFormFieldName.HOUR].min.value}
              max={validation[taskAddFormFieldName.HOUR].max.value}
              errorMessage={errors[taskAddFormFieldName.HOUR]?.message}
              validation={validation[taskAddFormFieldName.HOUR]}
            />
            <TimeUnitFormControl
              control={control}
              labelText="분"
              name={taskAddFormFieldName.MINUTE}
              min={validation[taskAddFormFieldName.MINUTE].min.value}
              max={validation[taskAddFormFieldName.MINUTE].max.value}
              errorMessage={errors[taskAddFormFieldName.MINUTE]?.message}
              validation={validation[taskAddFormFieldName.MINUTE]}
            />
            <TimeUnitFormControl
              control={control}
              labelText="초"
              name={taskAddFormFieldName.SECOND}
              min={validation[taskAddFormFieldName.SECOND].min.value}
              max={validation[taskAddFormFieldName.SECOND].max.value}
              errorMessage={errors[taskAddFormFieldName.SECOND]?.message}
              validation={validation[taskAddFormFieldName.SECOND]}
            />
          </VStack>
        </fieldset>
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
