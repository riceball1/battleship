import styles from '@/styles/Board.module.css';
import Cell from '@/components/Cell';
import { useState } from 'react';
// import useInitializeShips from "@/utils/useInitializeShips";
import { ShipTypes, getShipColor, Coordinates, Color } from '@/utils/helper';

interface Props {
  rows?: number;
  columns?: number;
  totalShips?: number;
}

const Board = ({ rows = 10, columns = 10, totalShips = 3 }: Props) => {
  const rowArr = Array(rows).fill(null);
  const columnArr = Array(columns).fill(null);
  const [gridState, setGridState] = useState(
    rowArr.map((_, rowIndex) => {
      return columnArr.map((_, columnIndex) => ({
        id: `${rowIndex}-${columnIndex}`,
        color: '',
        isHit: false,
      }));
    })
  );

  /*

   @TODO: setup state for the ships to be placed on the board on mount useInitializeShips({totalShips: totalShips, callBack: setShips})

  destroyer ships - 2 length
  battleships - 4 length

  */
  const [ships, setShips] = useState([
    {
      shipType: ShipTypes.DESTROYER,
      coordinates: [
        { x: 0, y: 1 },
        { x: 0, y: 2 },
      ],
    },
    {
      shipType: ShipTypes.DESTROYER,
      coordinates: [
        { x: 7, y: 3 },
        { x: 7, y: 4 },
      ],
    },
    {
      shipType: ShipTypes.BATTLESHIP,
      coordinates: [
        { x: 2, y: 9 },
        { x: 3, y: 9 },
        { x: 4, y: 9 },
        { x: 5, y: 9 },
      ],
    },
  ]);

  const handleMakeTurn = ({
    cellId,
    coordinates,
  }: {
    cellId: string;
    coordinates: Coordinates;
  }) => {
    const { x, y } = coordinates;

    const shipColor = getShipColor({
      ships: ships,
      coordinates: { x, y },
    });

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

  return (
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
  );
};

export default Board;
