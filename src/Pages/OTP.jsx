import { OTPInput } from "../Components";
import { useNavigate } from "react-router-dom";
import { setToken, verifyOTP } from "../Lib";
import { useState } from "react";
import { Alert } from "@mui/material";

export default function OTP() {
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("error");

  const onComplete = async (otp) => {
    const response = await verifyOTP(otp);

    // Check if the OTP verification was successful
    if (response.success) {
      // Update the userAuth atom with the new token and set isAuth to true
      sessionStorage.setItem("isAuthenticated", true);

      // Set the token in local storage and move to the profile page
      setToken(response.token);

      // Redirect to the home page
      navigate("/profile");
    } else {
      setAlertSeverity("error");
      setAlertMessage("Invalid OTP. Please try again.");
    }
  };

  const resendOTP = async () => {
    const response = await verifyOTP(null, true);

    if (response?.success) {
      alert("OTP Resent");
    } else {
      setAlertSeverity("error");
      setAlertMessage("Invalid OTP. Please try again.");
    }
  };

  const handleCloseAlert = () => {
    setAlertMessage("");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {alertMessage && (
        <div style={{ position: "fixed", top: 20, right: 20 }}>
          <Alert severity={alertSeverity} onClose={handleCloseAlert}>
            {alertMessage}
          </Alert>
        </div>
      )}
      <h1 className="mb-4">OTP</h1>
      <OTPInput length={6} onComplete={onComplete} />
      <p className="my-4 underline text-blue-100" onClick={resendOTP}>
        Resend OTP
      </p>
    </div>
  );
}
