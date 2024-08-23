import { useForm } from "react-hook-form";
import { Row, Col, Button, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import {
  scheduleIRL,
  updateIRL,
  getUTC,
  getScheduleIRL,
  getLocalTimeInISO,
  getLocalTC,
} from "../Lib";
import { useConnections, useLoading } from "../Hook";
import { useEffect, useState } from "react";
import { FaCalendarAlt, FaClock, FaMapMarker } from "react-icons/fa";

export default function ScheduleIRL() {
  const authentication = sessionStorage.getItem("isAuthenticated");
  const { irlId, connectionId } = useParams();
  const navigate = useNavigate();
  const { connectionData } = useConnections([]);
  const todaysDate = new Date(new Date().toLocaleDateString())
    .toISOString()
    .split("T")[0];
  const [irlData, setIRLData] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading, Loading] = useLoading();

  console.log(todaysDate);

  useEffect(() => {
    if (!irlId) return;

    setLoading(true);

    const getScheduleData = async () => {
      const result = await getScheduleIRL(irlId);

      if (result.success) {
        setIRLData(result.irl);
        reset({
          labelIRL: irlData?.label,
          date: getDate(irlData?.time_from),
          timefrom: getTimeFormat(irlData?.time_from),
          timeto: getTimeFormat(irlData?.time_to),
          place: irlData?.place,
          notificationTime: getTimeFormat(irlData?.notification_time),
          irlNotes: irlData?.notes,
        });

        if (irlData?.participants) setLoading(false);

        return;
      }

      alert(result.message);
    };

    getScheduleData();
  }, [
    irlData?.label,
    irlData?.notes,
    irlData?.notification_time,
    irlData?.participants?.length,
    irlData?.place,
    irlData?.time_from,
    irlData?.time_to,
    irlId,
    reset,
    setLoading,
  ]);

  const isParticipantEmergencyPOC = (participants, emergencyPOC) => {
    return participants.some((participantID) =>
      emergencyPOC.includes(participantID)
    );
  };

  const verifyFormFields = (data) => {
    if (
      !data.labelIRL ||
      !data.date ||
      !data.timefrom ||
      !data.timeto ||
      !data.place ||
      !data.notificationTime
    ) {
      alert("Please fill all the fields properly");
      return false;
    }
    return true;
  };

  const _scheduleIRL = async (data) => {
    if (!connectionId && !irlId) {
      alert("Something is wrong. Please try again.");
      navigate("/cupbuds");
    }

    const _connectionId =
      connectionId && parseInt(connectionId) != 0 ? connectionId : null;

    if (!verifyFormFields) return;

    const connections = data.connections
      ? data.connections
          .map((value, index) => (value ? index : null))
          .filter((index) => index !== null)
      : [];

    const emergencyPOC = data.emergencyPOC
      ? data.emergencyPOC
          .map((value, index) => (value ? index : null))
          .filter((index) => index !== null)
      : [];

    const scheduleIRLData = {
      irl_label: data.labelIRL,
      time_from: getUTC(data.date, data.timefrom),
      time_from_iso: getLocalTimeInISO(data.date, data.timefrom),
      time_to: getUTC(data.date, data.timeto),
      time_to_iso: getLocalTimeInISO(data.date, data.timeto),
      place: data.place,
      connection_ids: [...connections],
      enable_notifications: data.enableNotifications,
      enable_live_location: data.enableLiveLocation,
      notification_time: getUTC(data.date, data.notificationTime),
      notes: data.irlNotes,
    };

    if (emergencyPOC) scheduleIRLData.contact_ids = [...emergencyPOC];

    let result = null;

    if (irlId && !connectionId) {
      if (
        isParticipantEmergencyPOC(
          scheduleIRLData.connection_ids,
          scheduleIRLData.contact_ids
        )
      )
        return alert("Participant cannot be a Backup Bud.");
      result = await updateIRL(irlId, scheduleIRLData);
    } else {
      if (_connectionId)
        scheduleIRLData.connection_ids = [
          _connectionId,
          ...scheduleIRLData.connection_ids,
        ];
      else scheduleIRLData.connection_ids = [...scheduleIRLData.connection_ids];
      if (
        isParticipantEmergencyPOC(
          scheduleIRLData.connection_ids,
          scheduleIRLData.contact_ids
        )
      )
        return alert("Participant cannot be a Backup Bud.");
      result = await scheduleIRL(scheduleIRLData);
    }

    console.log("Call the API by passing the data.", scheduleIRLData);

    if (result.success) return navigate("/irl");
    else {
      console.error(result.message);
      alert(result.message);
    }
  };

  const getDate = (timeFrom) => {
    if (!timeFrom) return;
    const [date] = getLocalTC(timeFrom);
    const _date = new Date(date);
    return _date.toISOString().split("T")[0];
  };

  const getTimeFormat = (timeStamp) => {
    if (!timeStamp) return;
    const [, time] = getLocalTC(timeStamp);
    const [_time, period] = time.split(" ");
    const [hours, minutes, seconds] = _time.split(":");
    let _hours = hours.padStart(2, 0);
    if (period == "PM") _hours = parseInt(_hours) + 12;
    return _hours + ":" + minutes + ":" + seconds;
  };

  const isEmergencyPOC = (id, contacts) => {
    if (!contacts) return false;
    return !!contacts.find((contact) => contact.id == id);
  };

  const isParticipant = (id, participants) => {
    if (!participants) return false;
    return !!participants.find((participant) => participant.id == id);
  };

  return authentication && loading ? (
    <div className="flex flex-col justify-center items-center h-screen">
      <Loading />
    </div>
  ) : (
    <div className="my-4 mx-2 flex flex-col space-y-4">
      <h1 className="text-center">Schedule IRL</h1>
      <div>
        <form onSubmit={handleSubmit(_scheduleIRL)} className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label className="text-base font-medium flex items-center">
              <FaCalendarAlt className="mr-2" />
              Label IRL
            </label>
            <input
              type="Text"
              placeholder={irlData?.label || "Weekend getaway with buddy."}
              className="w-full h-8 px-4 text-black text-base rounded-3xl opacity-70"
              {...register("labelIRL")}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-base font-medium flex items-center">
              <FaCalendarAlt className="mr-2" />
              Date
            </label>
            <input
              type="Date"
              min={todaysDate}
              className="w-full h-8 px-4 text-black text-base rounded-3xl opacity-70"
              {...register("date")}
            />
          </div>
          <Row className="my-1">
            {["Time From", "Time To"].map((label) => (
              <Col xs={6} key={label}>
                <div className="flex flex-col space-y-2">
                  <label className="text-base font-medium flex items-center">
                    <FaClock className="mr-2" />
                    {label}
                  </label>
                  <input
                    type="Time"
                    className="w-full h-8 px-4 text-black text-base rounded-3xl opacity-70"
                    {...register(label.replace(/\s/g, "").toLowerCase())}
                  />
                </div>
              </Col>
            ))}
          </Row>
          <div className="flex flex-col space-y-2">
            <label className="text-base font-medium flex items-center">
              <FaMapMarker className="mr-2" />
              Place
            </label>
            <input
              type="Text"
              placeholder="1234 Front st. E"
              className="w-full h-8 px-4 text-black text-base rounded-3xl opacity-70"
              {...register("place")}
            />
          </div>
          {connectionData?.length > 0 && (
            <>
              <label className="text-base font-medium">
                Who else is coming?
              </label>
              {connectionData?.map((connection) => (
                <div key={connection.id}>
                  {connectionId != connection.id && (
                    <Form.Check
                      type="checkbox"
                      defaultChecked={isParticipant(
                        connection.id,
                        irlData?.participants
                      )}
                      label={connection.profile_name}
                      {...register(`connections[${connection.id}]`)}
                    />
                  )}
                </div>
              ))}
            </>
          )}
          <label className="text-base font-medium">Backup Bud</label>
          {connectionData?.length > 0 &&
            connectionData?.map((connection) => (
              <div key={connection.id}>
                {connectionId != connection.id && (
                  <Form.Check
                    type="checkbox"
                    defaultChecked={isEmergencyPOC(
                      connection.id,
                      irlData?.contacts
                    )}
                    label={connection.profile_name}
                    {...register(`emergencyPOC[${connection.id}]`)}
                  />
                )}
              </div>
            ))}
          <Row>
            <Col>
              <Form.Check
                type="switch"
                label="Enable Notifications"
                defaultChecked={irlData && irlData["enable_notifications"]}
                {...register("enableNotifications")}
              />
            </Col>
            <Col>
              <Form.Check
                type="switch"
                label="Enable Live Location"
                defaultChecked={
                  (irlData && irlData["enable_live_location"]) || true
                }
                {...register("enableLiveLocation")}
              />
            </Col>
          </Row>
          <div className="flex flex-col space-y-2">
            <label className="text-base font-medium flex items-center">
              <FaClock className="mr-2" />
              Notification Time
            </label>
            <input
              type="Time"
              className="w-1/2 h-8 px-4 text-black text-base rounded-3xl opacity-70"
              {...register("notificationTime")}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-base font-medium flex items-center">
              Notes for Backup Bud
            </label>
            <input
              type="Textbox"
              placeholder={
                irlData?.notes || "Pick me up from Toronto Downtown."
              }
              className="w-full h-8 px-4 text-black text-base rounded-3xl opacity-70"
              {...register("irlNotes")}
            />
          </div>
          <Button
            type="submit"
            className="w-full my-4 text-white !rounded-3xl !border-[#1f6254] !bg-[#1f6254]"
          >
            Schedule
          </Button>
        </form>
      </div>
    </div>
  );
}
