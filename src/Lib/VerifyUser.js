import { getToken, setToken } from "./jwt";
import { getUserId } from "./UserProfile";

const verifyUser = async (userDocument) => {
  const token = getToken();
  const id = await getUserId();

  // Make a POST request to the backend
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/users/${id}/verification`,
    {
      method: "PUT",
      headers: {
        "ngrok-skip-browser-warning": `${import.meta.env.VITE_ISDEVELOPMENT}`,
        Authorization: `Bearer ${token}`,
      },
      // Send form data that we fetched from the form
      body: userDocument,
    }
  );

  const data = await response.json();

  setToken(data.access_token);

  if (response.ok) {
    return { success: true, message: data.message };
  } else {
    return { success: false, message: data.message };
  }
};

export { verifyUser };
