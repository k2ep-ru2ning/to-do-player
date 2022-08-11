import PropTypes from "prop-types";

export default function TimeUnitInput({ register, name, labelText, min, max, validation = {} }) {
  return (
    <label className="flex items-center gap-2">
      <input
        type="number"
        min={min}
        max={max}
        {...register(name, validation)}
        className="form-input text-right w-20"
      />
      <span className="form-label-text">{labelText}</span>
    </label>
  );
}

TimeUnitInput.propTypes = {
  register: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  validation: PropTypes.object,
};
