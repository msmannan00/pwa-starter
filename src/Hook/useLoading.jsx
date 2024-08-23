import { useState } from "react";
import { LoadingLogo } from "../Assets";

export default function useLoading() {
  const [loading, setLoading] = useState(false);

  function Loading() {
    return <img src={LoadingLogo} width={350} />;
  }

  return [loading, setLoading, Loading];
}
