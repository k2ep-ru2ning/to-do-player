import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import HourMinuteSecondTimeFieldArrayFormControl from "./HourMinuteSecondTimeFieldArrayFormControl";

export default function TaskUpdateForm({ onSubmit, defaultValues }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    trigger,
  } = useForm({ defaultValues, mode: "onChange" });

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Flex direction="column" rowGap={4} py={4}>
        <FormControl isRequired isInvalid={Boolean(errors.name)}>
          <FormLabel>할 일</FormLabel>
          <Input
            type="text"
            placeholder="할 일을 수정하세요."
            {...register("name", { required: "할 일의 새 이름을 입력해주세요." })}
          />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>
        <HourMinuteSecondTimeFieldArrayFormControl
          control={control}
          labelText="계획 시간"
          name="time"
          trigger={trigger}
          error={errors.time}
        />
        <Button type="submit" colorScheme="main" variant="outline">
          수정하기
        </Button>
      </Flex>
    </form>
  );
}

TaskUpdateForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  defaultValues: PropTypes.shape({
    name: PropTypes.string.isRequired,
    time: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};
