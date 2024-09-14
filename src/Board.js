import Confetti from "react-confetti";
import Box from "./Box";
import { useEffect, useState } from "react";
function Board() {
  const [boxes, setBoxes] = useState(Array(9).fill(""));
  const [curSign, setCurSign] = useState("X");
  const [winner, setWinner] = useState("");
  const [isMatchDraw, setisMatchDraw] = useState(false);
  const checkWinner = () => {
    const winnerPos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 5, 8],
    ];
    for (let i = 0; i < winnerPos.length; i++) {
      const [pos1, pos2, pos3] = winnerPos[i];
      if (
        boxes[pos1] !== "" &&
        boxes[pos1] === boxes[pos2] &&
        boxes[pos2] === boxes[pos3]
      ) {
        setWinner(boxes[pos1]);
      }
    }
  };
  const addSign = (idx) => {
    if (boxes[idx] != "" || winner !== "") {
      return;
    }
    const newboxes = boxes.slice();
    newboxes[idx] = curSign;
    setBoxes(newboxes);
    checkWinner();
    checkforDraw();
    setCurSign(curSign === "O" ? "X" : "O");
  };

  const checkforDraw = () => {
    const allChecked = boxes.filter((box) => box === "").length === 0;
    if (winner === "" && allChecked) {
      setisMatchDraw(true);
    }
    console.log("match draw");
  };

  useEffect(() => {
    checkWinner();
    checkforDraw();
  }, [boxes]);

  const restartGame = () => {
    setBoxes(Array(9).fill(""));
    setCurSign("");
    setWinner("");
    setisMatchDraw(false);
  };
  return (
    <>
      {winner !== "" && <Confetti />}
      {winner !== "" && <h1>Winner is {winner}!!</h1>}
      {isMatchDraw && <h1>Match Draw!!</h1>}
      <div className="board">
        {boxes.map((boxValue, idx) => (
          <Box sign={boxValue} addSign={() => addSign(idx)} />
        ))}
      </div>
      <button onClick={restartGame} id="button" style={{ margin: 10 }}>
        Restart
      </button>
    </>
  );
}

export default Board;
