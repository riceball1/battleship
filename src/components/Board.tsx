import styles from '@/styles/Board.module.css';
import Cell from '@/components/Cell';
import { useState } from 'react';
import { getShipColor, Coordinates, Ships, Color } from '@/utils/helper';
import { generateShipCoordinates } from '@/utils/shipHelper';
import useInitializeShips from '@/utils/useInitializeShips';

interface Props {
  rows?: number;
  columns?: number;
  totalShips?: number;
}

const generateBoardState = (rows: number, columns: number) => {
  const rowArr = Array(rows).fill(null);
  const columnArr = Array(columns).fill(null);
  return rowArr.map((_, rowIndex) => {
    return columnArr.map((_, columnIndex) => ({
      id: `${rowIndex}-${columnIndex}`,
      color: '',
      isHit: false,
    }));
  });
};

const Board = ({ rows = 10, columns = 10, totalShips = 3 }: Props) => {
  const rowArr = Array(rows).fill(null);
  const columnArr = Array(columns).fill(null);
  const [gridState, setGridState] = useState(generateBoardState(rows, columns));

  const [ships, setShips] = useState<Ships[]>([]);
  const [toastMessage, setToastMessage] = useState('');
  const [shipSunkState, setShipSunkState] = useState(0);
  const [score, setScore] = useState(rows * 2); // default turns

  // first initialize ships
  useInitializeShips(setShips);

  // reset board
  const handleResetBoard = () => {
    setGridState(generateBoardState(rows, columns));
    const newShipsCoordinates = generateShipCoordinates();
    // @ts-ignore
    setShips(newShipsCoordinates);
    setScore(rows * 2)
  };
  const handleMakeTurn = ({
    coordinates,
  }: {
    cellId: string;
    coordinates: Coordinates;
  }) => {
    if (score === 0) return; // prevent making further turns if game is lost
    const { x, y } = coordinates;

    const shipColor = getShipColor({
      ships: ships,
      coordinates: { x, y },
    });

    // if missed - deduct score
    if (shipColor === Color.NONE) {
      let currScore = score - 1;
      if (currScore === 0) {
        setScore(currScore);
        // lose the game
        // send a notification with a button to reset the game
      } else {
        setScore(currScore);
      }
    } else {
      let currScore = score + 1;
      setScore(currScore);
      // check if the ship is sunk - toast message - add score
      // check if ship hit what type it is -- toast message
    }

    // update grid state
    setGridState((prevState) => {
      let newState = [...prevState];
      newState[x][y] = {
        ...newState[x][y],
        isHit: true,
        color: shipColor,
      };

      return newState;
    });
  };

  if (ships.length < 0) return null;

  return (
    <>
      <h2>{score}</h2>
      {score === 0 ? <p>Oh noes! You lost the game!</p> : null}
      <div className={styles.board}>
        {rowArr.map((_, rowIndex) => {
          return columnArr.map((_, columnIndex) => {
            return (
              <Cell
                key={`${rowIndex}-${columnIndex}`}
                shipColor={gridState[rowIndex][columnIndex].color}
                isHit={gridState[rowIndex][columnIndex].isHit}
                onHandleClick={() =>
                  handleMakeTurn({
                    cellId: `${rowIndex}-${columnIndex}`,
                    coordinates: { x: rowIndex, y: columnIndex },
                  })
                }
              />
            );
          });
        })}
      </div>
      <button className={styles.resetButton} onClick={handleResetBoard}>
        Reset
      </button>
    </>
  );
};

export default Board;
