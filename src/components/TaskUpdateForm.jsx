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

export default function TaskUpdateForm({ onSubmit, defaultValues }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({ defaultValues });

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Flex direction="column" rowGap={4} py={4}>
        <FormControl isRequired isInvalid={Boolean(errors[taskUpdateFormFieldName.NAME])}>
          <FormLabel>할 일</FormLabel>
          <Input
            type="text"
            placeholder="할 일을 수정하세요."
            {...register(taskUpdateFormFieldName.NAME, validation[taskUpdateFormFieldName.NAME])}
          />
          <FormErrorMessage>{errors[taskUpdateFormFieldName.NAME]?.message}</FormErrorMessage>
        </FormControl>
        <fieldset>
          <Text as="legend" fontWeight="medium" mb={2}>
            계획 시간
          </Text>
          <VStack space={2}>
            <TimeUnitFormControl
              control={control}
              labelText="시간"
              name={taskUpdateFormFieldName.HOUR}
              min={validation[taskUpdateFormFieldName.HOUR].min.value}
              max={validation[taskUpdateFormFieldName.HOUR].max.value}
              errorMessage={errors[taskUpdateFormFieldName.HOUR]?.message}
              validation={validation[taskUpdateFormFieldName.HOUR]}
            />
            <TimeUnitFormControl
              control={control}
              labelText="분"
              name={taskUpdateFormFieldName.MINUTE}
              min={validation[taskUpdateFormFieldName.MINUTE].min.value}
              max={validation[taskUpdateFormFieldName.MINUTE].max.value}
              errorMessage={errors[taskUpdateFormFieldName.MINUTE]?.message}
              validation={validation[taskUpdateFormFieldName.MINUTE]}
            />
            <TimeUnitFormControl
              control={control}
              labelText="초"
              name={taskUpdateFormFieldName.SECOND}
              min={validation[taskUpdateFormFieldName.SECOND].min.value}
              max={validation[taskUpdateFormFieldName.SECOND].max.value}
              errorMessage={errors[taskUpdateFormFieldName.SECOND]?.message}
              validation={validation[taskUpdateFormFieldName.SECOND]}
            />
          </VStack>
        </fieldset>
        <Button type="submit" colorScheme="main" variant="outline">
          수정하기
        </Button>
      </Flex>
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
      message: "할 일의 새 이름을 입력해주세요.",
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
