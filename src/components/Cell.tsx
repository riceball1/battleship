import styles from '@/styles/Board.module.css';

interface Props {
  onHandleClick: () => void;
  shipColor?: string;
  isHit?: boolean;
}

const Cell = ({
  onHandleClick,
  shipColor = 'transparent',
  isHit = false,
}: Props) => {
  const cellShipStyle = {
    backgroundColor: isHit ? shipColor : 'transparent',
  };

  return (
    <button
      disabled={isHit}
      onClick={onHandleClick}
      style={cellShipStyle}
      className={styles.Cell}
    />
  );
};

export default Cell;
