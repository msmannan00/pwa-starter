import { Icon } from "../Assets";

export default function Home() {
  return (
    <div className="text-center flex flex-col justify-center items-center h-screen bg-dark-blue">
      <img src={Icon} alt="3oC Logo" className="mb-6" width={250} />
      <h1 className="text-lg text-white mb-4">
        Welcome to 3oC. We are a digital trust system.
      </h1>
      <h2 className="text-3xl text-white mb-6">
        Trust, when online connections move IRL
      </h2>
      <div className="flex flex-row justify-center">
        <a
          className="hover:cursor-pointer my-2"
          href="/join3oc"
          style={{
            backgroundColor: "#1a4850",
            color: "white",
            padding: "12px 24px",
            borderRadius: "8px",
            marginRight: "10px",
            textDecoration: "none",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
            transition: "background-color 0.3s ease-in-out",
          }}
        >
          Join 3oC
        </a>
        <a
          className="hover:cursor-pointer my-2"
          href="/enter3oc"
          style={{
            backgroundColor: "#720072",
            color: "white",
            padding: "12px 24px",
            borderRadius: "8px",
            textDecoration: "none",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
            transition: "background-color 0.3s ease-in-out",
          }}
        >
          Enter 3oC
        </a>
      </div>
      <div className="absolute bottom-4 text-white text-xs">
        *This is a test version. The full version will be available soon.
      </div>
    </div>
  );
}
