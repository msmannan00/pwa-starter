import PropTypes from "prop-types";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { removeConnection, isVerified } from "../Lib";
import { UserProfileBadge } from ".";
import { useConnections } from "../Hook";
import { useEffect, useState } from "react";
import { FaUserMinus, FaCalendarAlt } from "react-icons/fa";

export default function ConnectionProfile(props) {
  const navigate = useNavigate();
  const { updateConnectionData } = useConnections();
  const [verified, setVerified] = useState(null);

  useEffect(() => {
    isVerified()
      .then((result) => setVerified(result))
      .catch((error) => console.log(error));
  }, []);

  const handleRemoveConnection = async () => {
    console.log("Remove connection");
    const result = await removeConnection(props?.connection?.id);

    if (result.success) {
      updateConnectionData();
      navigate("/cupbuds");
      window.location.reload();
      alert(result.message);
    } else {
      console.error(result.message);
      alert(result.message);
    }
  };

  const scheduleIRL = () => {
    navigate(`/scheduleirl/${props?.connection?.id}`);
  };

  return (
    <>
      <div className="my-2 px-3 py-2 text-left text-sm bg-gray-900 text-white rounded-lg flex items-center justify-between">
        <div className="flex-grow">
          <UserProfileBadge connection={props?.connection} />
        </div>
        <div className="ml-2">
          <DropdownButton variant="outline-secondary" drop="start" title="">
            <Dropdown.Item onClick={handleRemoveConnection}>
              <FaUserMinus className="mr-1" />
              Remove Bud
            </Dropdown.Item>
            {
              // (TEMPORARILY DISABLED) Checks that both users are verified before allowing to schedule IRL
              // props?.connection?.is_verified && verified &&
              (<Dropdown.Item onClick={scheduleIRL}>
                <FaCalendarAlt className="mr-1" />
                Schedule IRL
              </Dropdown.Item>)
            }
          </DropdownButton>
        </div>
      </div>
    </>
  );
}

ConnectionProfile.propTypes = {
  connection: PropTypes.object,
};
