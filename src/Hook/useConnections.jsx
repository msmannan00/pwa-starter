import { useState, useEffect } from "react";
import { getConnections } from "../Lib";

export default function useConnections() {
  const [connectionData, setConnectionData] = useState(null);

  const updateConnectionData = () => {
    getConnections()
      .then((data) => setConnectionData(data.friends))
      .catch((error) => {
        alert(error);
        setConnectionData([]);
      });
  };

  useEffect(() => updateConnectionData(), []);

  return { connectionData, updateConnectionData };
}
