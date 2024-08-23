import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

export default function CustomButton(props) {
  const { type, onClick, children } = props;
  return (
    <Button
      type={type}
      onClick={onClick}
      className={`${props.className} w-full my-4 text-white !rounded-3xl !border-[#1c5346] !bg-[#1c5346] transition duration-300 hover:bg-opacity-90 hover:shadow-md`}
    >
      {children}
    </Button>
  );
}

CustomButton.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node
};

CustomButton.defaultProps = {
  type: '',
  onClick: null
};
