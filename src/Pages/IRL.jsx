import { useState, useEffect } from "react";
import { getScheduleIRLs, getUserId } from "../Lib";
import { IRLProfile } from "../Components";
import { useLoading } from "../Hook";
import { useNavigate } from "react-router-dom";

export default function IRL() {
  const authentication = sessionStorage.getItem("isAuthenticated");
  const [irlData, setIRLData] = useState([]); // Initialize as an empty array
  const [irlDataToDisplay, setIRLDataToDisplay] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading, Loading] = useLoading(true);
  const irlFilters = [
    "Upcoming IRLs",
    "All IRLs",
    "Organizer",
    "Participant",
    "Backup Bud",
  ];
  const [irlFilter, setIRLFilter] = useState(irlFilters[0]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const user_id = await getUserId();
        setUserId(user_id);
        const data = await getScheduleIRLs();
        setIRLData(data.irls || []); // Ensure irls is an array even if data fetch fails
      } catch (error) {
        console.error("Error loading IRL data:", error);
        setIRLData([]); // Ensure irlData is still an array on error
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const filterData = () => {
      if (!irlData.length) return []; // Make sure irlData is not empty
      switch (irlFilter) {
        case "Upcoming IRLs":
          return irlData.filter((irl) => irl.irl_status !== "completed");
        case "All IRLs":
          return irlData;
        case "Organizer":
          return irlData.filter((irl) => irl.organizer.id === userId);
        case "Participant":
          return irlData.filter((irl) =>
            irl.participants.some((participant) => participant.id === userId)
          );
        case "Backup Bud":
          return irlData.filter((irl) =>
            irl.contacts.some((contact) => contact.id === userId)
          );
        default:
          return [];
      }
    };
    setIRLDataToDisplay(filterData());
  }, [irlData, irlFilter, userId]);

  if (!authentication) return null;

  return (
    <div className="my-4 pb-4 text-center">
      {loading ? (
        <div className="flex flex-col justify-center items-center h-screen">
          <Loading />
        </div>
      ) : (
        <>
          <h1>IRL</h1>
          <div className="flex flex-wrap justify-center">
            {irlFilters.map((label) => (
              <span
                key={label}
                className={`px-3 py-2 mx-1 my-1 text-sm font-medium rounded-full transition-all duration-300 ease-in-out cursor-pointer
        ${
          irlFilter === label
            ? "bg-gradient-to-br from-blue-900 to-blue-700 shadow-lg text-white"
            : "bg-gradient-to-br from-gray-800 to-gray-700 text-gray-300 hover:from-gray-700 hover:to-gray-600 hover:text-white"
        }`}
                onClick={() => setIRLFilter(label)}
              >
                {label}
              </span>
            ))}
          </div>
          <a href="/scheduleirl/0">
            <button className="w-full py-2 bg-[#1f6254] text-white rounded-lg hover:bg-opacity-90 rounded-full transition duration-300 mb-3 mt-4">
              Schedule IRL
            </button>
          </a>

          <div className="my-4">
            {irlDataToDisplay.length ? (
              irlDataToDisplay.map((irl) => (
                <IRLProfile key={irl.irl_id} irl={irl} />
              ))
            ) : (
              <p>No IRLs scheduled.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
