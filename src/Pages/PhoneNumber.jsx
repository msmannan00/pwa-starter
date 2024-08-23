import { useNavigate } from "react-router-dom";
import { updateUserPhoneNumber } from "../Lib";
import { useForm } from "react-hook-form";

export default function OTP() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const storeUserNumber = async (data) => {
    const result = await updateUserPhoneNumber(data.phoneNumber);

    if (result.success) return navigate("/OTP");

    alert(result.message);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <form onSubmit={handleSubmit(storeUserNumber)}>
        <h1 className="text-xl my-3">Phone Number*</h1>
        <input
          placeholder="+1 XXX XXX XXXX"
          className="w-full h-8 px-4 text-base text-black rounded-lg border focus:outline-none focus:border-[#26725e] transition-colors duration-300 mb-2 opacity-70"
          {...register("phoneNumber")}
        />
        <button
          type="submit"
          className="w-full py-2 bg-[#1a4850] text-white rounded-lg hover:bg-opacity-90 transition duration-300 my-2"
        >
          Enter
        </button>
      </form>
    </div>
  );
}
