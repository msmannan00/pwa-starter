import PropTypes from "prop-types";
import { UserProfileBadge, Button } from ".";
import { getUserId, getLocalTC, cancelIRL, withdrawParticipant } from "../Lib";
import { Accordion, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt, FaArrowLeft } from "react-icons/fa";

export default function IRLProfile(props) {
  const [date, timeFrom] = getLocalTC(props?.irl?.time_from);
  const [, timeTo] = getLocalTC(props?.irl?.time_to);
  const [, notificationTime] = getLocalTC(props?.irl?.notification_time);
  console.log(props?.irl?.notification_time);
  const [position, setPosition] = useState();
  const navigate = useNavigate();
  const positions = ["Organizer", "Participant", "Backup Bud"];

  // Functions to check roles
  const isParticipant = (id) =>
    props.irl.participants?.some((item) => item.id === Number(id));

  const isEmergencyPOC = (id) =>
    props.irl.contacts?.some((item) => item.id === Number(id));

  const _updateIRL = () => {
    navigate(`/updateirl/${props.irl.irl_id}`);
  };

  const _cancelIRL = async () => {
    const result = await cancelIRL(props.irl.irl_id);
    if (result.success) {
      window.location.reload();
      return;
    }
    alert(result.message);
  };

  const _withdrawFromIRL = async () => {
    const result = await withdrawParticipant(props.irl.irl_id);
    if (result.success) {
      window.location.reload();
      return;
    }
    alert(result.message);
  };

  useEffect(() => {
    getUserId()
      .then((id) => {
        if (id === props?.irl?.organizer?.id) {
          setPosition(positions[0]);
        } else if (isParticipant(id)) {
          setPosition(positions[1]);
        } else if (isEmergencyPOC(id)) {
          setPosition(positions[2]);
        }
      })
      .catch((error) => console.log(error));
  }, [
    props?.irl?.organizer?.id,
    props?.irl?.participants,
    props?.irl?.contacts,
  ]);

  return (
    <Accordion className="my-3 mx-auto max-w-4xl bg-gray-800 text-white shadow-lg rounded-2xl overflow-hidden">
      <Accordion.Header className="bg-gray-900 px-4 py-2 flex justify-between items-center rounded-t-2xl">
        <h2 className="text-sm mr-2 mt-1 font-semibold text-white">
          {props?.irl?.label}
        </h2>
        <div className="flex space-x-1 items-center">
          {[position, props?.irl?.irl_status].map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs font-medium text-white bg-gray-700 rounded-full"
            >
              #{tag?.toLowerCase()}
            </span>
          ))}
        </div>
      </Accordion.Header>
      <Accordion.Body className="px-4 py-3 transition-all duration-700 ease-in-out">
        <div className="text-xs space-y-1">
          <p>{date}</p>
          <p>
            {timeFrom} - {timeTo}
          </p>
          {position !== "Participant" && (
            <>
              <h3 className="font-semibold text-xs">Notification Time</h3>
              {notificationTime}
            </>
          )}
          <h3 className="font-semibold text-xs">Location</h3>
          <p>{props?.irl?.place}</p>
        </div>
        {position === positions[0] && (
          <div className="space-y-2 mt-2">
            <Row className="gap-2">
              <Col>
                <Button
                  onClick={_updateIRL}
                  className="bg-blue-600 text-white py-1 px-3 rounded text-xs"
                >
                  <FaEdit className="inline-block align-middle mr-1" />
                  Update
                </Button>
              </Col>
              <Col>
                <Button
                  onClick={_cancelIRL}
                  className="bg-red-600 text-white py-1 px-3 rounded text-xs"
                >
                  <FaTrashAlt className="inline-block align-middle mr-1" />
                  Cancel
                </Button>
              </Col>
            </Row>
          </div>
        )}
        {position === positions[1] && (
          <div className="mt-2">
            <Button
              onClick={_withdrawFromIRL}
              className="bg-yellow-600 text-white py-1 px-3 rounded text-xs"
            >
              <FaArrowLeft className="inline-block align-middle mr-1" />
              Withdraw Participation
            </Button>
          </div>
        )}
        <div className="space-y-2 mt-3">
          <h3 className="font-semibold text-xs">Organizer</h3>
          {props?.irl?.organizer && (
            <UserProfileBadge connection={props?.irl?.organizer} />
          )}
          {props?.irl?.participants.length > 0 && (
            <h3 className="font-semibold text-xs">Participants</h3>
          )}
          {props?.irl?.participants.map((user) => (
            <UserProfileBadge key={user.id} connection={user} />
          ))}
          {position !== "Participant" && (
            <>
              {props?.irl?.contacts.length > 0 && (
                <h3 className="font-semibold text-xs">Backup Bud</h3>
              )}
              {props?.irl?.contacts.map((user) => (
                <UserProfileBadge key={user.id} connection={user} />
              ))}
            </>
          )}
          {props?.irl?.notes &&
            (position === "Backup Bud" || position === "Organizer") && (
              <>
                <h3 className="font-semibold text-xs">Notes for Backup Bud</h3>
                <p className="text-xs">{props?.irl?.notes}</p>
              </>
            )}
        </div>
      </Accordion.Body>
    </Accordion>
  );
}

IRLProfile.propTypes = {
  irl: PropTypes.shape({
    time_from: PropTypes.string,
    time_to: PropTypes.string,
    label: PropTypes.string,
    place: PropTypes.string,
    organizer: PropTypes.object,
    participants: PropTypes.array,
    contacts: PropTypes.array,
    notes: PropTypes.string,
  }),
};
