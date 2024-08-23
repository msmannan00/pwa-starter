import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CiLinkedin } from "react-icons/ci";
import { FaRegCopy, FaFacebookSquare } from "react-icons/fa";
import { FaSnapchat, FaXTwitter, FaInstagram } from "react-icons/fa6";
import { getUserProfile, updateUserProfile, getReferalLink } from "../Lib";
import { MdOutlineVerified } from "react-icons/md";
import { useLoading } from "../Hook";
import { Button } from "../Components";
import copy from "copy-to-clipboard";
import { useNavigate } from "react-router-dom";

// ========== UserProfile Component ==========

export default function UserProfile() {
  const showInvitationDetails = () => {
    setAlertSeverity("info");
    setAlertMessage(
      "To invite someone to join 3oC, click the button below. A link will copy to your clipboard. The link will be valid for 15 minutes and can only be used by one person. Click here to invite anyone to join 3oC."
    );
    setOpen(true);
  };

  // Get the authentication status from the local storage
  const authentication = sessionStorage.getItem("isAuthenticated");

  // Set a state to store the user details that we get from the backend
  const [user, setUser] = useState(null);

  const [, , Loading] = useLoading();

  // Initialize the edit state
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();

  // Load the user data when the component is rendered
  useEffect(() => {
    const fetchUserData = async () => {
      const result = await getUserProfile();

      if (result.success) {
        setUser(result?.userData);
      } else {
        console.error(result.message);
        setAlertSeverity("error");
        setAlertMessage(result.message);
        setOpen(true);
      }
    };

    fetchUserData();
  }, []);

  const { register, handleSubmit } = useForm();
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("error");
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  // Set the edit state to true
  const editProfile = () => {
    setEdit(true);
  };

  const logout = () => {
    navigate("/");
  };

  const handleCopyReferalLink = async () => {
    const { referralCode } = await getReferalLink(),
      link = `https://${window.location.hostname}/invitation/${referralCode}`;

    copy(link);
    setAlertSeverity("success");
    setAlertMessage("Text copied to clipboard!");
    setOpen(true);
  };

  // Update the user profile
  const updateProfile = async (data) => {
    const formData = new FormData();
    formData.append("profile_name", data.profile_name);
    formData.append("phone_number", data.phone_number);
    formData.append("email", data.email);

    if (data.socials.Instagram != "")
      formData.append("socials[instagram]", data.socials.Instagram);
    if (data.socials.X != "") formData.append("socials[x]", data.socials.X);
    if (data.socials.Snapchat != "")
      formData.append("socials[snapchat]", data.socials.Snapchat);
    if (data.socials.Facebook != "")
      formData.append("socials[facebook]", data.socials.Facebook);
    if (data.socials.Linkedin != "")
      formData.append("socials[linkedin]", data.socials.Linkedin);
    if (data.profile_picture[0]) {
      formData.append("profile_picture", data.profile_picture[0]);
    }

    const result = await updateUserProfile(formData);

    if (result.success) {
      setEdit(false);
      const result = await getUserProfile();

      if (result.success) {
        await setUser(result?.userData);
      } else {
        console.error(result.message);
        setAlertSeverity("error");
        setAlertMessage(result.message);
        setOpen(true);
      }
    } else {
      console.error(result.message);
      setAlertSeverity("error");
      setAlertMessage(result.message);
      setOpen(true);
    }

    // Send formData to the backend
    setEdit(false);
  };

  // Map socials icons
  const socials_mapping = [
      { title: "Instagram", icon: FaInstagram },
      { title: "X", icon: FaXTwitter },
      { title: "Snapchat", icon: FaSnapchat },
      { title: "Linkedin", icon: CiLinkedin },
      { title: "Facebook", icon: FaFacebookSquare },
    ],
    form_information = [
      { label: "Profile Name*", variable: "profile_name" },
      { label: "Phone Number*", variable: "phone_number" },
      { label: "Email*", variable: "email" },
    ];

  const getIconByTitle = (title) => {
    const social = socials_mapping.find(
      (element) => element.title.toLowerCase() === title.toLowerCase()
    );
    return social ? social.icon : null;
  };

  const getURLBySocialTitle = (title) => {
    const social = user?.socials?.find(
      (element) => element.platform_name === title.toLowerCase()
    );
    return social ? social.url : null;
  };

  return (
    authentication && (
      <div
        className={`flex flex-col justify-center items-center ${
          !edit && "h-screen"
        } mb-16`}
      >
        <Snackbar
          open={open}
          autoHideDuration={4000}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={handleClose}
            severity={alertSeverity}
            sx={{ opacity: 0.2 }} // Adjust transparency here
          >
            {alertMessage}
          </MuiAlert>
        </Snackbar>
        {!user ? (
          <Loading />
        ) : (
          <div className="my-4 w-full flex flex-col items-center">
            <div className="flex justify-center items-center mb-4">
              <img
                className="rounded-full w-20 h-20 object-cover"
                src={user?.profile_picture}
                alt={`${user?.profile_name}'s avatar`}
              />
              {edit && (
                <input
                  type="file"
                  className="ml-4"
                  accept="image/*"
                  {...register("profile_picture")}
                />
              )}
            </div>
            <div className="flex flex-row justify-center items-center">
              <h1 className="flex mr-2">
                {user?.profile_name}
                {user?.is_verified && (
                  <MdOutlineVerified size={25} className="mx-2" />
                )}
              </h1>
              <p>#{user?.id}</p>
            </div>
            {edit ? (
              <>
                {!user?.is_verified && (
                  <a href="/verify" className="w-full">
                    <Button>Verify self</Button>
                  </a>
                )}
                <form
                  className="text-[1em]"
                  onSubmit={handleSubmit(updateProfile)}
                >
                  {form_information.map((field) => (
                    <div key={field.label} className=" mt-1 mb-2">
                      <label className="block text-base font-medium text-white mb-1 ">
                        {field.label}
                      </label>
                      <input
                        placeholder={user?.[field.variable]}
                        defaultValue={user?.[field.variable]}
                        className="w-full h-10 px-4 text-base text-black rounded-lg border focus:outline-none focus:border-[#26725e] transition-colors duration-300 opacity-70"
                        {...register(field.variable)}
                      />
                    </div>
                  ))}
                  <label className="block text-base font-medium text-white ">
                    Socials
                  </label>
                  <div className="flex flex-wrap">
                    {socials_mapping.map((item) => (
                      <div key={item.title} className="flex my-2 w-full">
                        <item.icon size={40} className="mr-2" />
                        <input
                          placeholder={getURLBySocialTitle(item.title)}
                          defaultValue={getURLBySocialTitle(item.title)}
                          className="w-full h-10 px-4 text-base text-black rounded-lg border focus:outline-none focus:border-[#26725e] transition-colors duration-300 opacity-70"
                          {...register(`socials[${item.title}]`)}
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 bg-[#1f6254] text-white rounded-lg hover:bg-opacity-90 transition duration-300 mb-3 mt-4"
                  >
                    Update
                  </button>
                </form>
              </>
            ) : (
              <div className="flex flex-col items-center">
                {user?.socials?.map((social) => {
                  const Icon = getIconByTitle(social.platform_name);
                  return (
                    <div key={Icon.toString()} className="m-2">
                      <a href={social.url} target="_blank">
                        {Icon && <Icon size={40} />}
                      </a>
                    </div>
                  );
                })}
                <button
                  onClick={editProfile}
                  className="w-full py-2 bg-[#1f6254] text-white rounded-lg hover:bg-opacity-90 transition duration-300 my-2"
                >
                  Edit Profile
                </button>
                <button
                  onClick={logout}
                  className="w-full py-2 bg-[#1f6254] text-white rounded-lg hover:bg-opacity-90 transition duration-300 my-2"
                >
                  Logout
                </button>
                <div className="text-center my-4">
                  <p className="inline-block mr-4">
                    Invite someone to join 3oC.
                  </p>
                  <button
                    onClick={handleCopyReferalLink}
                    className="inline-block"
                  >
                    <FaRegCopy size={25} />
                  </button>
                </div>
                <button
                  onClick={showInvitationDetails}
                  className="text-blue-500 underline"
                >
                  Learn More
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    )
  );
}
