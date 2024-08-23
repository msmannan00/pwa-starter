import { getToken } from "./jwt";
import { getUserId } from "./UserProfile";

export const getConnections = async () => {
  const token = getToken();
  const id = await getUserId();

  // Make a POST request to the backend
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/friends/${id}`,
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
    return { success: true, friends: data.friends };
  } else {
    return { success: false, message: data.message };
  }
};

export const removeConnection = async (connectionId) => {
  const token = getToken();
  const id = await getUserId();

  // Make a POST request to the backend
  const response = await fetch(
    `${
      import.meta.env.VITE_API_URL
    }/friends/${id}/remove-friend/${connectionId}`,
    {
      method: "DELETE",
      headers: {
        "ngrok-skip-browser-warning": `${import.meta.env.VITE_ISDEVELOPMENT}`,
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (response.ok) {
    return { success: true, message: data.message };
  } else {
    return { success: false, message: data.message };
  }
};
