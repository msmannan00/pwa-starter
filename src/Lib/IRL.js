import { getToken } from "./jwt";
import { getUserId } from "./UserProfile";

const scheduleIRL = async (IRLdata) => {
  const token = getToken();
  const id = await getUserId();

  // Make a POST request to the backend
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/users/${id}/scheduleIRL`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": `${import.meta.env.VITE_ISDEVELOPMENT}`,
        Authorization: `Bearer ${token}`,
      },
      // Send form data that we fetched from the form
      body: JSON.stringify(IRLdata),
    }
  );

  const data = await response.json();

  console.log("data", data);

  if (response.ok) {
    return { success: true, message: data.message };
  } else {
    return { success: false, message: data.message };
  }
};

const updateIRL = async (irlId, irlData) => {
  const token = getToken();

  // Make a POST request to the backend
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/users/updateIRL/${irlId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": `${import.meta.env.VITE_ISDEVELOPMENT}`,
        Authorization: `Bearer ${token}`,
      },
      // Send form data that we fetched from the form
      body: JSON.stringify(irlData),
    }
  );

  const data = await response.json();

  if (response.ok) {
    return { success: true, message: data.message };
  } else {
    return { success: false, message: data.message };
  }
};

const withdrawParticipant = async (irlId) => {
  const token = getToken();
  const userId = await getUserId();

  // Make a POST request to the backend
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/users/withdrawparticipant/${irlId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": `${import.meta.env.VITE_ISDEVELOPMENT}`,
        Authorization: `Bearer ${token}`,
      },
      // Send form data that we fetched from the form
      body: JSON.stringify({ participant_id: userId }),
    }
  );

  const data = await response.json();

  if (response.ok) {
    return { success: true, message: data.message };
  } else {
    return { success: false, message: data.message };
  }
};

const startIRL = async (irlId) => {
  const token = getToken();

  // Make a PUT request to the backend
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/users/startIRL/${irlId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": `${import.meta.env.VITE_ISDEVELOPMENT}`,
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();
  console.log(data);

  if (response.ok) {
    return { success: true, message: data.message };
  } else {
    return { success: false, message: data.message };
  }
};

const endIRL = async (irlId) => {
  const token = getToken();

  // Make a PUT request to the backend
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/users/endIRL/${irlId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": `${import.meta.env.VITE_ISDEVELOPMENT}`,
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();
  console.log(data);

  if (response.ok) {
    return { success: true, message: data.message };
  } else {
    return { success: false, message: data.message };
  }
};

const cancelIRL = async (irlId) => {
  const token = getToken();

  // Make a POST request to the backend
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/users/cancelIRL/${irlId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": `${import.meta.env.VITE_ISDEVELOPMENT}`,
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();
  console.log(data);

  if (response.ok) {
    return { success: true, message: data.message };
  } else {
    return { success: false, message: data.message };
  }
};

const getScheduleIRLs = async () => {
  const token = getToken();
  const id = await getUserId();

  // Make a POST request to the backend
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/users/${id}/scheduleIRL`,
    {
      method: "GET",
      headers: {
        "ngrok-skip-browser-warning": `${import.meta.env.VITE_ISDEVELOPMENT}`,
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (response.ok) {
    return { success: true, message: data.message, irls: data.irls };
  } else {
    return { success: false, message: data.message };
  }
};

const getScheduleIRL = async (irlId) => {
  const token = getToken();
  const id = await getUserId();

  // Make a POST request to the backend
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/users/${id}/scheduleIRL/${irlId}`,
    {
      method: "GET",
      headers: {
        "ngrok-skip-browser-warning": `${import.meta.env.VITE_ISDEVELOPMENT}`,
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (response.ok) {
    return { success: true, message: data.message, irl: data.irls[0] };
  } else {
    return { success: false, message: data.message };
  }
};

export {
  scheduleIRL,
  updateIRL,
  withdrawParticipant,
  getScheduleIRLs,
  getScheduleIRL,
  startIRL,
  endIRL,
  cancelIRL,
};
