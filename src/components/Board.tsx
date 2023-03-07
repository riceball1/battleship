import styles from '@/styles/Board.module.css';
import Cell from '@/components/Cell';
import { useEffect, useState } from 'react';
import {
  getShipColor,
  Coordinates,
  Ships,
  Color,
  getShipName,
} from '@/utils/helper';
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

interface ShipStatusState {
  totalSunkShips: number;
  totalShips: number;
  shipsHit: { [key: string]: number };
}

const Board = ({ rows = 10, columns = 10, totalShips = 3 }: Props) => {
  const rowArr = Array(rows).fill(null);
  const columnArr = Array(columns).fill(null);
  const [gridState, setGridState] = useState(generateBoardState(rows, columns));

  const [time, setTime] = useState<NodeJS.Timeout | null>(null);
  const [ships, setShips] = useState<Ships[]>([]);
  const [shipsStatus, setShipStatus] = useState<ShipStatusState>({
    totalSunkShips: 0,
    totalShips: 3, // default always 3 ships
    shipsHit: {}, // use shipName and count total hits
  });
  const [score, setScore] = useState(rows * 2); // default turns
  const [notification, setNotification] = useState<string>('');
  // first initialize ships
  useInitializeShips(setShips);

  // reset board
  const handleResetBoard = () => {
    setNotification(''); // clear setting notification before each turn
    setGridState(generateBoardState(rows, columns));
    const newShipsCoordinates = generateShipCoordinates();
    setShips(newShipsCoordinates);
    setScore(rows * 2);
  };

  useEffect(() => {
    if (shipsStatus.totalSunkShips === 3) {
      const intervalId = setInterval(() => {
        handleResetBoard();
      }, 1000);
      setTime(intervalId);
    }
    return () => {
      if (time) {
        clearInterval(time);
      }
    };
  }, [shipsStatus.totalSunkShips]);

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
        setNotification('You lost :( Reset the game to try again!');
      } else {
        setScore(currScore);
      }
    } else {
      let currScore = score + 1;
      // get shipName
      const shipName = getShipName({ ships, coordinates });

      setShipStatus((prevState) => ({
        ...prevState,
        totalSunkShips: prevState.totalSunkShips + 1,
        shipsHit: {
          ...prevState.shipsHit,
          [shipName]:
            prevState.shipsHit[shipName] + prevState.shipsHit[shipName],
        },
      }));
      setScore(currScore);

      if (shipsStatus.totalSunkShips === 3) {
        setNotification('You won the game!');
        // automatically reset the game?
      } else if (shipsStatus.shipsHit[shipName] == 2) {
        // check if the ship is sunk - toast message - add score
        setNotification('You sunk a ship!');
      }
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
      {notification.length > 0 ? <p>{notification}</p> : null}
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
