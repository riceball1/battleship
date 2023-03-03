import styles from '@/styles/Board.module.css';

interface Props {
  onHandleClick: () => void;
  shipColor?: string;
  isHit?: boolean;
}

const Cell = ({ onHandleClick, shipColor = '', isHit = false }: Props) => {
  
  const cellShipStyle = {
    backgroundColor: isHit ? shipColor : ""
  }

  return (
    <button
      onClick={onHandleClick}
      className={styles.cell}
      style={cellShipStyle}
    />
  );
};

export default Cell;
