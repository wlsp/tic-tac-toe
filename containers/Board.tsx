import { useState, useEffect } from "react"
import Square from "../components/Square";

type Player = "X" | "O" | "BOTH" | null;

export default function Board() {

      const [squares, setSquares] = useState(Array(9).fill(null));
      const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">(
            Math.round(Math.random() * 1) === 1 ? "X" : "O"
      );
      const [winner, setWinner] = useState<Player>(null);

      function reset() {
            setSquares(Array(9).fill(null))
            setWinner(null);
            setCurrentPlayer(Math.round(Math.random() * 1) === 1 ? "X" : "O");
      }

      function setSquareValue(index: number) {
            const newDate = squares.map((val, i) => {
                  if (i === index) {
                        return currentPlayer
                  }
                  return val;
            });
            setSquares(newDate);
            setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
      }

      function calculateWinner(squares: Player[]) {
            const lines = [
                  [0, 1, 2],
                  [3, 4, 5],
                  [6, 7, 8],
                  [0, 3, 6],
                  [1, 4, 7],
                  [2, 5, 8],
                  [0, 4, 8],
                  [2, 4, 6],
            ];
            for (let i = 0; i < lines.length; i++) {
                  const [a, b, c] = lines[i];
                  if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                        return squares[a];
                  }
            }
            return null;
      }

      useEffect(() => {
            const w = calculateWinner(squares);
            if (w) {
                  setWinner(w)

            }
            if (!w && !squares.filter((squares) => !squares).length) {
                  setWinner("BOTH");
            }

      }, [squares]);

      return (
            <>
                  <h1>WHO LOSE HAVE TO DRINK!</h1>
                  <div>
                        {!winner && <h1>{currentPlayer}, it`s your turn</h1>}
                        {winner && winner !== "BOTH" && <h1>Congrats {winner}, you win</h1>}
                        {winner && winner === "BOTH" && <h1> DRAW, play again!</h1>}
                        <div className="grid">
                              {Array(9).fill(null).map((_, i) => {
                                    return <Square
                                          winner={winner}
                                          key={i}
                                          onClick={() => setSquareValue(i)}
                                          value={squares[i]}
                                    />
                              })}
                        </div>
                        <button className="reset" onClick={reset}>RESET</button>
                  </div>
            </>
      );
}