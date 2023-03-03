import styles from '@/styles/Board.module.css';
import { ShipTypes } from '@/utils/helper';
import { useState } from 'react';

interface Props {
  cellStatus:
    | {
        isHit: boolean;
        isShip: boolean;
        shipType: ShipTypes;
      }
    | {};
  num: string;
  isShip?: boolean;
  shipId?: string;
  onCellClick: () => void;
}

const Cell = ({
  cellStatus,
  onCellClick,
  num,
  isShip = false,
  shipId = '',
}: Props) => {
  // hit the cell what to do if it was a ship?
  // what to do if it is not a ship
  // how to manage the state of the cell?
  // have a parent callback to handle update to the ship hit status
  // if the cell happens to sunk a ship or not, we will check
  // the cell should also contain the id of the ship it is referencing

  const [shipCell] = useState(isShip);
  const [shipCellId, setShipCellId] = useState(shipId);

  const cellShipStyle = {
    // alter the color of the cell state when it is hit and it is a certain type of cell
  };

  return (
    <div onClick={onCellClick} className={styles.cell} style={cellShipStyle}>
      {num}
    </div>
  );
};

export default Cell;
