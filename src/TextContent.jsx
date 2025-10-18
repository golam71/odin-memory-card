export default function TextContent({ score, highScore }) {
  return (
    <>
      <div className="flex">
        <h2>Memory Game</h2>
        <h4>
          Score : <span>{score}</span>
        </h4>
        <p>
          High Score : <span>{highScore}</span>
        </p>
      </div>
      <p>Click images to get points but dont click an image twice.</p>
    </>
  );
}
