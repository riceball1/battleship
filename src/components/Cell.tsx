import styles from '@/styles/Board.module.css';

interface Props {
  onHandleClick: () => void;
  shipColor?: string;
  isHit?: boolean;
}

const Cell = ({ onHandleClick, shipColor = 'transparent', isHit = false }: Props) => {
  
  const cellShipStyle = {
    backgroundColor: isHit ? shipColor : "transparent",
    border: '1px solid white'
  }

  return (
    <button
      onClick={onHandleClick}
      style={cellShipStyle}
    />
  );
};

export default Cell;
