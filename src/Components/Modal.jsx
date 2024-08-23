import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";

const _Modal = (props) => {
  return (
    <Modal
      {...props}
      className="text-black"
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
      <Modal.Footer>
        <Button
          className="text-black !border-[#ABD6CF] !bg-[#ABD6CF]"
          onClick={props?.onHide}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default _Modal;

// Props validation
_Modal.propTypes = {
  title: PropTypes.string.isRequired,
  onHide: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
