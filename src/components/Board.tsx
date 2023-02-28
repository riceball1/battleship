import styles from "@/styles/Board.module.css";
import Cell from "@/components/Cell";

interface Props {
  rows?: number;
  columns?: number;
}

const Board = ({ rows = 10, columns = 10 }: Props) => {
  const grid = Array(rows * columns).fill(null);

  return (
    <div className={styles.board}>
      {grid.map((_, index) => {
        return <Cell key={`cell-${index}`} />;
      })}
    </div>
  );
};

export default Board;
