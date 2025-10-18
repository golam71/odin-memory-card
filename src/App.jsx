import { useState } from "react";
import TextContent from "./TextContent";
import Cards from "./Cards";

export default function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <TextContent count={count} />
      <Cards setCount={setCount} count={count} />
    </>
  );
}
