import { useForm } from "react-hook-form";
import { registerUser, newSession } from "../Lib";
import { GoogleSignIn, TermsAndConditions, TNCContent } from "../Components";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLoading } from "../Hook";
import { Alert } from "@mui/material";

// ========== Signup Component ==========
export default function Join3oC() {
  // Initialize the navigate function
  const navigate = useNavigate();
  const { code } = useParams();

  const [tncChecked, setTncChecked] = useState(false);
  const [loading, setLoading, Loading] = useLoading();
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("error");

  useEffect(() => {
    newSession();
  }, []);

  useEffect(() => {
    if (code) console.log(code);
    sessionStorage.setItem("code", code);
  }, [code]);

  // Initialize the register and handleSubmit functions from react-hook-form
  const { register, handleSubmit } = useForm();

  // Validate the form data and submit the form
  const submitForm = async (data) => {
    if (!tncChecked) {
      setAlertSeverity("error");
      setAlertMessage("Please agree to terms & conditions to proceed");
      return;
    }

    console.log("TNC Checked");

    if (
      !data.profileName ||
      !data.phoneNumber ||
      !data.password ||
      !data.password2
    ) {
      setAlertSeverity("error");
      setAlertMessage("All the fields marked with (*) are required.");
      return;
    }

    console.log("All fields checked");

    //Does not validate country code
    const phoneRegex = /^\d{1,14}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!phoneRegex.test(data.phoneNumber)) {
      setAlertSeverity("error");
      setAlertMessage(
        "Invalid phone number format. Please enter a valid phone number."
      );
      return;
    }

    if (data.email && !emailRegex.test(data.email)) {
      setAlertSeverity("error");
      setAlertMessage(
        "Invalid email format. Please enter a valid email address."
      );
      return;
    }

    console.log("Phone number and email format checked");

    if (data.password !== data.password2) {
      setAlertSeverity("error");
      setAlertMessage("Passwords don't match. Please check.");
      return;
    }

    console.log("Both passwords match");

    setLoading(true);

    // Register the user in the database
    const response = await registerUser({
      profile_name: data.profileName,
      email: data.email,
      //Manually add +1 to the number
      phone_number: "+1" + data.phoneNumber,
      password: data.password,
      referral_code: sessionStorage.getItem("code") || null,
    });

    console.log("Response received");
    setAlertSeverity("Success");

    // Navigate to the OTP page if the registration is successful
    if (response.success) {
      return navigate("/otp");
    }

    setLoading(false);
    // Show the error message if the registration is unsuccessful
    setAlertSeverity("error");
    setAlertMessage(response.message);
  };

  const handleCloseAlert = () => {
    setAlertMessage("");
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
            Join 3oC
          </h1>
          <form className="text-xl" onSubmit={handleSubmit(submitForm)}>
            <label className="block text-base font-medium text-white mb-1">
              Profile Name*
            </label>
            <input
              className="w-full h-10 px-4 text-base text-black rounded-lg border focus:outline-none focus:border-[#26725e] transition-colors duration-300 mb-2 opacity-70"
              placeholder="John Doe"
              {...register("profileName")}
            />
            <label className="block text-base font-medium text-white mb-1">
              Phone Number*
            </label>
            {/* Takes input for a phone number. The country code is fixed to be +1 and is added manually when calling the registerUser function*/}
            <div className="w-full h-10 px-4 text-base bg-white text-black rounded-lg border focus:outline-none focus:border-[#26725e] transition-colors duration-300 mb-2 opacity-70 flex flex-row items-center">
              <span>+1&nbsp;</span>
              <input
                placeholder="XXX XXX XXXX"
                className="focus:outline-none"
                {...register("phoneNumber")}
              />
            </div>
            <label className="block text-base font-medium text-white mb-1">
              Email
            </label>
            <input
              placeholder="john@3oc.com"
              className="w-full h-10 px-4 text-base text-black rounded-lg border focus:outline-none focus:border-[#26725e] transition-colors duration-300 mb-2 opacity-70"
              {...register("email")}
            />
            <label className="block text-base font-medium text-white mb-1">
              Password*
            </label>
            <input
              type="password"
              className="w-full h-10 px-4 text-base text-black rounded-lg border focus:outline-none focus:border-[#26725e] transition-colors duration-300 mb-2 opacity-70"
              {...register("password")}
            />
            <label className="block text-base font-medium text-white mb-1">
              Confirm Password*
            </label>
            <input
              type="password"
              className="w-full h-10 px-4 text-base text-black rounded-lg border focus:outline-none focus:border-[#26725e] transition-colors duration-300 opacity-70"
              {...register("password2")}
            />
            <button
              type="submit"
              className="w-full py-2 bg-[#1a4850] text-white rounded-lg hover:bg-opacity-90 transition duration-300 mb-3 mt-4"
            >
              Join
            </button>
          </form>
          <TermsAndConditions setChecked={setTncChecked}>
            <TNCContent />
          </TermsAndConditions>
          <div className="mt-6 text-center text-white">
            <GoogleSignIn />
            <p className="mt-4 text-base">
              <a href="/enter3oc" className="underline text-blue-100">
                Already have an account?
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
