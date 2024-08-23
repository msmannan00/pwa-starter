/*
============================================
User Authentication Functions
============================================
*/

import { getUserInfo, getToken } from "./jwt";
import { getUserPhone } from "./UserProfile";

// ---------- LOG A USER IN ----------
async function authenticateUser(userCredentials) {
  // Make a POST request to the backend
  const response = await fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userCredentials),
  });

  const data = await response.json(); // Parsing the JSON response body

  sessionStorage.setItem("token", data.access_token);

  // Check if the login was successful
  if (response.ok) {
    return { success: true, token: data.access_token };
  } else {
    return { success: false, message: data.message };
  }
}

// ---------- GOOGLE LOGIN ----------
async function googleLogin(accessToken) {
  // Fetch user info using the access token
  const userInfoResponse = await fetch(
    "https://www.googleapis.com/oauth2/v3/userinfo",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  // Parse the JSON response body
  const userInfo = await userInfoResponse.json();

  // Make a POST request to the backend with all details that we fetched
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/google`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      profile_name: userInfo.name,
      email: userInfo.email,
      profile_picture: userInfo.picture,
      referral_code: sessionStorage.getItem("code") || null,
    }),
  });

  const data = await response.json();

  // Check if the registration was successful
  if (response.ok) {
    return { success: true, token: data.access_token };
  } else {
    return { success: false, message: data.message };
  }
}

// ---------- REGISTER A NEW USER ----------
async function registerUser(userData) {
  // Make a POST request to the backend
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/users/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }
  );

  const data = await response.json(); // Parsing the JSON response body

  sessionStorage.setItem("token", data.access_token);

  // Check if the registration was successful
  if (response.ok) {
    return { success: true };
  } else {
    return { success: false, message: data.message };
  }
}

// ---------- VERIFY OTP ----------
async function verifyOTP(otp, isResend) {
  const phoneNumber = await getUserPhone();
  const token = getToken();

  let response = null;

  if (isResend) {
    // Make a POST request to the backend to resend the OTP
    response = await fetch(`${import.meta.env.VITE_API_URL}/users/resend-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        phone_number: phoneNumber,
      }),
    });
  } else {
    // Make a POST request to the backend
    response = await fetch(`${import.meta.env.VITE_API_URL}/users/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        otp: otp,
        phone_number: phoneNumber,
      }),
    });
  }
  const data = await response.json(); // Parsing the JSON response body

  // Check if the OTP verification was successful
  if (response.ok) {
    return { success: true, message: data.message, token: data.access_token };
  } else {
    return { success: false, message: data.message };
  }
}

export { authenticateUser, registerUser, googleLogin, verifyOTP };
