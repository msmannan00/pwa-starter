import useTypewriter from "react-typewriter-hook";

// ========== TypewriterEffect Component ==========
export default function TypewriterEffect(props) {
  const typing = useTypewriter(props.word);
  return typing;
}
