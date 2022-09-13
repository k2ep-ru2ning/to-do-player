import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import HourMinuteSecondTimeFieldArrayFormControl from "./HourMinuteSecondTimeFieldArrayFormControl";

export default function AddTaskForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    trigger,
  } = useForm({
    defaultValues: {
      name: "",
      time: ["0", "30", "0"],
    },
    mode: "onChange",
  });

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Flex direction="column" rowGap={4} py={4}>
        <FormControl isRequired isInvalid={Boolean(errors.name)}>
          <FormLabel>할 일</FormLabel>
          <Input
            type="text"
            placeholder="할 일을 추가하세요."
            {...register("name", {
              setValueAs: (nameInput) => nameInput.trim(),
              required: "할 일을 입력해주세요.",
              maxLength: {
                value: 30,
                message: "30자 이내로 간단히 입력해주세요.",
              },
            })}
          />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>
        <HourMinuteSecondTimeFieldArrayFormControl
          trigger={trigger}
          control={control}
          labelText="계획 시간"
          name="time"
          error={errors.time}
        />
        <Button colorScheme="main" variant="outline" type="submit">
          할 일 추가
        </Button>
      </Flex>
    </form>
  );
}

AddTaskForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
