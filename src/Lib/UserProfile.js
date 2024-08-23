/*
============================================
User Profile Functions
============================================
*/

import { getToken, getUserInfo, setToken } from "./jwt";

async function getUserId() {
  return (await getUserInfo(getToken())).id;
}

async function getUserPhone() {
  return (await getUserInfo(getToken())).phone_number;
}

async function isVerified() {
  return (await getUserInfo(getToken())).is_verified;
}

// ---------- FETCH A USER's PROFILE ----------
async function getUserProfile() {
  const token = getToken();
  const id = await getUserId();

  // Make a POST request to the backend
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/users/${id}/profile`,
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
    return { success: true, userData: data.user, message: data.message };
  } else {
    return { success: false, message: data.message };
  }
}

async function updateUserPhoneNumber(phoneNumber) {
  const token = getToken();
  const id = await getUserId();

  // Make a POST request to the backend
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/users/${id}/phone-number`,
    {
      method: "PUT",
      headers: {
        "ngrok-skip-browser-warning": `${import.meta.env.VITE_ISDEVELOPMENT}`,
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      // Send form data that we fetched from the form
      body: JSON.stringify({ phone_number: phoneNumber }),
    }
  );

  const data = await response.json();

  setToken(data.access_token);

  if (response.ok) {
    return { success: true, message: data.message };
  } else {
    return { success: false, message: data.message };
  }
}

// ---------- UPDATE USER's PROFILE ----------
async function updateUserProfile(formData) {
  const token = getToken();
  const id = await getUserId();

  // Make a POST request to the backend
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/users/${id}/profile`,
    {
      method: "PUT",
      headers: {
        "ngrok-skip-browser-warning": `${import.meta.env.VITE_ISDEVELOPMENT}`,
        Authorization: `Bearer ${token}`,
      },
      // Send form data that we fetched from the form
      body: formData,
    }
  );

  const data = await response.json();

  if (response.ok) {
    return { success: true, message: data.message };
  } else {
    return { success: false, message: data.message };
  }
}

export {
  getUserProfile,
  updateUserPhoneNumber,
  updateUserProfile,
  getUserId,
  getUserPhone,
  isVerified,
};
