import { FaCamera, FaRegCircle } from "react-icons/fa";
import { useState, useRef } from "react";

export default function useCamera(sampleImage) {
  const [image, setImage] = useState(null);

  function Camera() {
    const videoRef = useRef();
    const [cameraOn, setCameraOn] = useState(false);

    const startCamera = () => {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          setCameraOn(true);
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        })
        .catch((error) => {
          console.error("Error accessing the camera:", error);
        });
    };

    const captureImage = () => {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataURL = canvas.toDataURL("image/jpeg");

      // Set the captured image data
      setImage(dataURL);

      // Stop the camera
      videoRef.current.srcObject.getTracks().forEach((track) => {
        track.stop();
        setCameraOn(false);
      });
    };

    return (
      <>
        <video
          ref={videoRef}
          className={`h-40 w-40 my-4 mx-auto my-4 object-cover rounded-full ${
            !cameraOn && "hidden"
          }`}
        />
        <img
          src={image || sampleImage}
          className={`h-40 w-40 my-4 mx-auto object-cover rounded-full ${
            cameraOn && "hidden"
          }`}
          alt="Captured"
        />
        <div>
          {cameraOn ? (
            <FaRegCircle
              onClick={captureImage}
              size={20}
              className="hover:cursor-pointer"
            />
          ) : (
            <FaCamera
              onClick={startCamera}
              size={20}
              className="hover:cursor-pointer"
            />
          )}
        </div>
      </>
    );
  }

  return [image, setImage, Camera];
}
