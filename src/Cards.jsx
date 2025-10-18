import "./css/cards.css";
import shuffleArray from "./shuffle";
import { useEffect, useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";

export default function Cards({ count, setCount }) {
  const [catData, setCatData] = useState([]);
  const [clicked, setClicked] = useState([]);

  useEffect(() => {
    async function getCatImageUrls() {
      const img = await fetch(
        "https://api.thecatapi.com/v1/images/search?limit=16&size=med&mime_types=jpg&order=RANDOM&api_key=live_4xcACum8Qf3UMhr8O4Dw9kd0m8mush3bifrpN3Bk5ndOoHdJO7u7jRmvjuEsIgMD"
      );
      const data = await img.json();
      setCatData(data);
    }

    getCatImageUrls();
  }, []);

  function handleClick(e) {
    const src = e.target.src;
    setCatData(shuffleArray(catData));

    if (clicked.includes(src)) {
      alert(`Your score is ${count}`);
      setCount(0);
      setClicked([]);
      return;
    }

    const updatedClicked = [...clicked, src];
    setClicked(updatedClicked);
    setCount(count + 1);

    if (updatedClicked.length === 16) {
      alert("You Won the game! Click ok to play again :)");
      setClicked([]);
      setCount(0);
    }
  }

  return (
    <div className="grid">
      <AnimatePresence>
        {catData.map((data) => (
          <Motion.img
            key={data.url}
            src={data.url}
            alt=""
            height="300px"
            width="300px"
            className="img"
            onClick={handleClick}
            layout
            transition={{ duration: 0.4 }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
