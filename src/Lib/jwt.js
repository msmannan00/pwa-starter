/*
===============================
  JWT Token Handling Functions
===============================
*/

import { jwtDecode } from "jwt-decode";

// ----- Set Token to Local Storage -----
export const setToken = (token) => {
  sessionStorage.setItem("token", token);
};

// ----- Get Token from Local Storage -----
export const getToken = () => {
  return sessionStorage.getItem("token") || "";
};

// ----- Remove Token from Local Storage -----
export const removeToken = () => {
  return sessionStorage.removeItem("token");
};

// ----- Decode the JWT Token -----
export const decodeToken = (token) => {
  return jwtDecode(token);
};

// ----- Fetch User Info from JWT Token -----
export const getUserInfo = async (token) => {
  const decodedToken = await decodeToken(token);
  return decodedToken.sub;
};
