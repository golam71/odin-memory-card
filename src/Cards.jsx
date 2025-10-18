import "./css/cards.css";
import shuffleArray from "./shuffle";
import { useEffect, useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";

export default function Cards({ score, setScore, highScore, setHighScore }) {
  const [catData, setCatData] = useState([]);
  const [clicked, setClicked] = useState([]);

  useEffect(() => {
    async function getCatImageUrls() {
      const uniqueImages = new Map();

      while (uniqueImages.size < 16) {
        const res = await fetch(
          `https://api.thecatapi.com/v1/images/search?limit=30&size=med&mime_types=jpg&order=RANDOM&api_key=live_4xcACum8Qf3UMhr8O4Dw9kd0m8mush3bifrpN3Bk5ndOoHdJO7u7jRmvjuEsIgMD`
        );
        const data = await res.json();

        data.forEach((item) => {
          if (!uniqueImages.has(item.url) && uniqueImages.size < 16) {
            uniqueImages.set(item.url, item);
          }
        });
      }

      setCatData(Array.from(uniqueImages.values()));
    }

    getCatImageUrls();
  }, []);

  function handleClick(e) {
    const src = e.target.src;

    if (clicked.includes(src)) {
      alert(`Your score is ${score}`);
      setScore(0);
      setClicked([]);
      setCatData(shuffleArray(catData));
      return;
    }

    const updatedClicked = [...clicked, src];
    const updatedScore = score + 1;

    setClicked(updatedClicked);
    setScore(updatedScore);

    if (updatedScore > highScore) {
      setHighScore(updatedScore);
    }

    if (updatedClicked.length === 16) {
      alert("You Won the game! Click ok to play again :)");
      setClicked([]);
      setScore(0);
    }

    setCatData(shuffleArray(catData));
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
