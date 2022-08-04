import PropTypes from "prop-types";

export default function FormErrorMessage({ errorMessage }) {
  if (!errorMessage) {
    return null;
  }

  return <div className="text-red-500 text-sm">{errorMessage}</div>;
}

FormErrorMessage.propTypes = {
  errorMessage: PropTypes.string,
};
