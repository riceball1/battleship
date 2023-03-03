import styles from "@/styles/Board.module.css";
import Cell from "@/components/Cell";
import { useEffect, useState } from "react";
import useInitializeShips from "@/utils/useInitializeShips";
import { checkTurn, Coordinates, ShipTypes } from "@/utils/helper";

interface Props {
  rows?: number;
  columns?: number;
  totalShips?: number;
}

const Board = ({ rows = 10, columns = 10, totalShips = 3 }: Props) => {
  const rowArr = Array(rows).fill(null);
  const columnArr = Array(columns).fill(null);
  const [gridState, setGridState] = useState(rowArr.map(() => {
    return columnArr.map(() => null);
  }))

  /*

  destroyer ships - 2 length
  battleships - 4 length

  */
  const [ships, setShips] = useState([
    {
      shipType: ShipTypes.DESTROYER,
      coordinates: [{x: 2, y: 1}, {x: 2, y: 2}],
    },
    {
      shipType: ShipTypes.DESTROYER,
      coordinates: [{x: 7, y: 3}, {x: 7, y: 4}],
    }, {
      shipType: ShipTypes.BATTLESHIP,
      coordinates: [{x: 2, y: 9}, {x: 3, y: 9}, {x: 4, y: 9}, {x: 5, y: 9}],
    },
  ]);

  // setup state for the ships to be placed on the board on mount
  // useInitializeShips({totalShips: totalShips, callBack: setShips})


  const handleCellClick = (cellCoordinates: Coordinates) => {
    const {x, y} = cellCoordinates
    const turnResult = checkTurn({ships: ships, cellCoordinates: {x, y}})

    console.log(cellCoordinates, turnResult)
  }

  return (
    <div className={styles.board}>
      {rowArr.map((_, rowIndex) => {
        return columnArr.map((_, columnIndex) => {
          return <Cell
            key={`${rowIndex}-${columnIndex}`}
            num={`${rowIndex}-${columnIndex}`}
            cellStatus={{}}
            onCellClick={() => handleCellClick({x: rowIndex, y: columnIndex})}
          />
        }

        );
      })}
    </div>
  );
};

export default Board;
