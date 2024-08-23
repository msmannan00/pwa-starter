import { GoogleImage } from "../Assets";
import { useGoogleLogin } from "@react-oauth/google";
import { googleLogin, setToken, getUserPhone } from "../Lib";
import { useNavigate } from "react-router-dom";

// ===== GOOGLE SIGN IN BUTTON COMPONENT =====
export default function GoogleSignIn() {
  const navigate = useNavigate();

  const isLogin = async () => await getUserPhone();

  const handleGoogleSignIn = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      // Extract the access token from the response
      const accessToken = tokenResponse.access_token;
      // Call the loginWithGoogle function
      const response = await googleLogin(accessToken);
      // Check if the login was successful
      if (response.success) {
        // Update the userAuth atom with the new token and set isAuth to true
        sessionStorage.setItem("isAuthenticated", true);
        // Set the token in local storage
        setToken(response.token);
        if (!(await isLogin()))
          // Redirect to the profile page
          return navigate("/phonenumber");
        navigate("/profile");
      } else {
        console.error("Login failed:", response.message);
        alert(response.message);
      }
    },
    onError: (error) => console.log("Google Login failed:", error),
  });

  return (
    <div className="flex items-center justify-center mt-5">
      <button
        type="button"
        className="flex items-center text-black bg-white opacity-80 border-gray-300 px-4 py-2 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        onClick={handleGoogleSignIn}
      >
        <img src={GoogleImage} alt="Google sign-in" className="w-6 h-6 mr-2" />
        <span>Sign in with Google</span>
      </button>
    </div>
  );
}
