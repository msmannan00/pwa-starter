import { useState, useEffect } from "react";
import { Button } from "../Components";
import { useCamera } from "../Hook";
import { useNavigate } from "react-router-dom";
import { verifyUser } from "../Lib";
import { Profile } from "../Assets";
import { Snackbar, Alert } from "@mui/material";
import { styled } from '@mui/system';

// Custom styled component for the list
const StyledList = styled('ol')({
  listStyleType: 'decimal',
  padding: '0 1em',
  margin: '10px 0',
  color: 'white',
  fontSize: '0.875rem', // Decreased font size
  '& li': {
    marginBottom: '8px',
  }
});

const StyledAlert = styled(Alert)({
  backgroundColor: 'rgba(0, 255, 255, 0.2)', 
  color: 'white', 
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', 
  backdropFilter: 'blur(5px)', 
  borderRadius: '8px',
  border: '1px solid #00cccc',
  fontSize: '0.875rem', // Decreased font size
  padding: '10px 15px', // Adjusted padding
  '& .MuiAlert-message': {
    padding: '0',
    margin: '0',
  },
  '& ol': {
    counterReset: 'step-counter',
  },
});

export default function Verify() {
  // Store the user data for verification.
  const [image, setImage, Camera] = useCamera(Profile);
  const [document, setDocument] = useState(null);
  const authentication = sessionStorage.getItem("isAuthenticated");
  const navigate = useNavigate();

  // State for managing the Snackbar visibility.
  const [open, setOpen] = useState(true);

  // Automatically close the Snackbar after 5 seconds.
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleDocumentUpload = (event) => {
    setDocument(event.target.files[0]);
  };

  // Call the API function and pass all the user data to verify the user.
  const _verifyUser = async () => {
    // Make sure user uploaded all the required data before proceeding.
    if (!image || !document)
      return alert(
        "Please click your image as well as upload a valid government id"
      );

    const userDocuments = new FormData();
    userDocuments.append("id", document);
    userDocuments.append("picture", image);

    // Call the function by passing the data.
    console.log("Verifying the user");
    const result = await verifyUser(userDocuments);

    if (result.success) {
      // Reset the data.
      setImage(null);
      setDocument(null);
      // Redirect the user to the profile page.
      navigate("/profile");
    } else {
      console.error(result.message);
      alert(result.message);
    }
  };

  return (
    authentication && (
      <div className="flex flex-col justify-center items-center py-20 mb-10">
        <h1>Verify Self</h1>
        <Camera image={[image, setImage]} />
        <h2 className="text-xl mt-3">Upload Identity</h2>
        <input type="file" className="my-4" onChange={handleDocumentUpload} />
        <Button onClick={_verifyUser}>Verify Me</Button>

        <Snackbar open={open} autoHideDuration={5000} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          <StyledAlert onClose={() => setOpen(false)} severity="info">
            Instructions for iPhone users:
            <StyledList>
              <li>Click the camera icon</li>
              <li>When your face is visible on the screen tap anywhere on the screen, and the image will freeze.</li>
              <li>Click the X in the top left hand corner to save the image and return to the previous screen</li>
              <li>Click the circle ⭕ icon below the image, to submit your photo for verification</li>
            </StyledList>
          </StyledAlert>
        </Snackbar>
      </div>
    )
  );
}
