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
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";

export default function TimeUnitFormControl({
  control,
  name,
  labelText,
  min,
  max,
  errorMessage,
  validation = {},
}) {
  return (
    <FormControl isRequired isInvalid={Boolean(errorMessage)}>
      <Flex alignItems="center" columnGap={3}>
        <Controller
          control={control}
          name={name}
          rules={validation}
          render={({ field }) => (
            <NumberInput {...field} maxW={24} min={min} max={max}>
              <NumberInputField textAlign="end" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          )}
        />
        <FormLabel flexShrink={0}>{labelText}</FormLabel>
      </Flex>
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
}

TimeUnitFormControl.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  errorMessage: PropTypes.string,
  validation: PropTypes.object,
};
