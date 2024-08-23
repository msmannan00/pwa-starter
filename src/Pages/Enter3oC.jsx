import { useForm } from "react-hook-form";
import { authenticateUser, newSession } from "../Lib";
import { GoogleSignIn } from "../Components";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../Hook";
import { useEffect } from "react";
import { useState } from "react";
import { Alert } from "@mui/material";

export default function Enter3oC() {
  const navigate = useNavigate();
  const [loading, setLoading, Loading] = useLoading();
  const { register, handleSubmit } = useForm();
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("error");

  useEffect(() => {
    newSession();
  }, []);

  const handleCloseAlert = () => {
    setAlertMessage("");
  };

  const submitForm = async (data) => {
    if (!data.phoneNumber || !data.password) {
      setAlertSeverity("error");
      setAlertMessage("Please fill in all the required fields.");
      return;
    }

    const phoneRegex = /^\d{1,14}$/;

    if (!phoneRegex.test(data.phoneNumber)) {
      setAlertSeverity("error");
      setAlertMessage(
        "Invalid phone number format. Please enter a valid phone number."
      );
      return;
    }

    setLoading(true);

    console.log("Fields verified");

    const response = await authenticateUser({
      //Manually add +1 to the number
      phone_number: "+1" + data.phoneNumber,
      password: data.password,
      referral_code: sessionStorage.getItem("code") || null,
    });

    setAlertSeverity("success");

    if (response.success) {
      console.log("Logging User");
      setAlertMessage("Authentication successful. Redirecting to OTP page...");
      navigate("/otp");
      return;
    }

    setAlertSeverity("error");
    setAlertMessage(
      "Authentication failed. Please check your credentials and try again."
    );
    setLoading(false);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-opacity-90 backdrop-filter backdrop-blur-lg">
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full max-w-md p-8 bg-purple-900 bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg border border-gray-300">
          <h1
            className="font-serif font-bold text-3xl text-center mb-6 text-blue-200 bg-clip-text"
            style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.5)" }}
          >
            Welcome to 3oC
          </h1>

          <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
            <div className="mb-2">
              <label className="block text-base font-medium text-beige my-1">
                Phone Number*
              </label>
              <div className="w-full h-10 px-4 text-base bg-white text-black rounded-lg border focus:outline-none focus:border-[#26725e] transition-colors duration-300  opacity-70 flex flex-row items-center">
                <span>+1&nbsp;</span>
                <input
                  placeholder="XXX XXX XXXX"
                  className="focus:outline-none"
                  {...register("phoneNumber")}
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="block text-base font-medium text-white my-1">
                Password*
              </label>
              <input
                type="password"
                className="w-full h-10 px-4 text-base text-black rounded-lg border focus:outline-none focus:border-[#26725e] transition-colors duration-300  opacity-70"
                {...register("password")}
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-[#720072] text-white rounded-lg hover:bg-opacity-90 transition duration-300"
            >
              Enter
            </button>
          </form>
          <div className="mt-6 text-center text-black">
            <GoogleSignIn />
            <p className="mt-4 text-base">
              <a href="/join3oc" className=" underline text-blue-100">
                Need to join 3oC?
              </a>
            </p>
          </div>
        </div>
      )}
      <div style={{ position: "fixed", top: 20, right: 20 }}>
        {alertMessage && (
          <Alert severity={alertSeverity} onClose={handleCloseAlert}>
            {alertMessage}
          </Alert>
        )}
      </div>
    </div>
  );
}
