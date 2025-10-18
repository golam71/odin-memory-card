import { useState } from "react";
import TextContent from "./TextContent";
import Cards from "./Cards";

export default function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  return (
    <>
      <TextContent score={score} highScore={highScore} />
      <Cards
        setScore={setScore}
        score={score}
        highScore={highScore}
        setHighScore={setHighScore}
      />
    </>
  );
}
