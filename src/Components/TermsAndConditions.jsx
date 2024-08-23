import { useState } from "react";
import PropTypes from 'prop-types'; // Import PropTypes
import { Modal } from "."; 

function TermsAndConditions(props) {
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    props.setChecked(e.target.checked);
  };

  return (
    <>
      <label className="flex items-center justify-center space-x-2 cursor-pointer text-white">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="form-checkbox text-[#26725e] rounded"
            onChange={handleChange}
          />
          <span className="underline" onClick={() => setShowModal(true)}>
            Terms and conditions
          </span>
        </div>
      </label>
      <Modal
        title="Terms and Conditions"
        show={showModal}
        onHide={() => setShowModal(false)}
      >
        {props.children}
      </Modal>
    </>
  );
}

// Define PropTypes
TermsAndConditions.propTypes = {
  setChecked: PropTypes.func.isRequired, //this is required
  children: PropTypes.node // Children might not be required, depends on your use case
};

export default TermsAndConditions;
