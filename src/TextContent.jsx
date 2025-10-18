export default function TextContent({ count }) {
  return (
    <>
      <div className="flex">
        <h2>Memory Game</h2>
        <p>
          Score : <span>{count}</span>
        </p>
      </div>
      <p>Click images to get points but dont click an image twice.</p>
    </>
  );
}
