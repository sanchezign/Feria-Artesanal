import PropTypes from 'prop-types';

const NumberFormatter = ({ number }) => {
  return <span>{number.toLocaleString('es-ES')}</span>;
};

NumberFormatter.propTypes = {
  number: PropTypes.number.isRequired,
};

export default NumberFormatter

