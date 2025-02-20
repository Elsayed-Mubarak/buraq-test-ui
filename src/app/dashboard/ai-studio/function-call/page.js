import FunctionCallEmpty from "./FunctionCallEmpty";
export default function FunctionCall() {
  const functionCallList = [];
  if (!functionCallList.length > 0) return <FunctionCallEmpty />;
  return <p>test</p>;
}
