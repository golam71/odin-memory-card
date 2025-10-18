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
        const encodedKey =
          "bGl2ZV80eGNBQ3VtOFFmM1VNaHI4TzREdzlrZDBtOG11c2gzYmlmcnBOM0JrNW5kT29IZEpPN3U3alJtdmp1RXNJZ01E";

        const decodeBase64 = (str) => {
          if (typeof atob === "function") return atob(str);
          if (
            typeof globalThis !== "undefined" &&
            globalThis.Buffer &&
            typeof globalThis.Buffer.from === "function"
          ) {
            return globalThis.Buffer.from(str, "base64").toString("utf-8");
          }

          return str;
        };

        const apiKey = decodeBase64(encodedKey);

        const url = `https://api.thecatapi.com/v1/images/search?limit=30&size=med&mime_types=jpg&order=RANDOM&api_key=${encodeURIComponent(
          apiKey
        )}`;

        const res = await fetch(url);
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
