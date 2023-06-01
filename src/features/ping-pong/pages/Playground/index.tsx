import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PingPong } from "features/ping-pong/PingPong";
import { usePlayers } from "features/ping-pong/store/usePlayers";
import styles from "./index.module.scss";

export const Playground = () => {
  const { leftPlayer, rightPlayer } = usePlayers();
  const navigate = useNavigate();
  const [leftPlayerScore, setLeftPlayerScore] = useState(0);
  const [rightPlayerScore, setRightPlayerScore] = useState(0);
  const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement | null>(null);
  const [canvasParentRef, setCanvasParentRef] = useState<HTMLDivElement | null>(
    null
  );

  useEffect(() => {
    if (!leftPlayer || !rightPlayer) {
      navigate("/hello");
    }

    if (canvasParentRef && canvasRef) {
      const pingPong = new PingPong(canvasRef, canvasParentRef, 20);
      pingPong.mountEvents();
      pingPong.loop();
      pingPong.onScore = ({ left, right }) => {
        if (left) {
          setLeftPlayerScore((prevState) => prevState + 1);
        }

        if (right) {
          setRightPlayerScore((prevState) => prevState + 1);
        }
      };

      return () => {
        pingPong.unMountEvents();
      };
    }
  }, [canvasRef, canvasParentRef, leftPlayer, navigate, rightPlayer]);

  return (
    <div className={styles.page}>
      <div className={styles.counters}>
        <div className={styles.score}>
          <h1>{leftPlayer}</h1>
          <p>Score:</p>
          <span>{leftPlayerScore}</span>
        </div>
        <div className={styles.score}>
          <h1>{rightPlayer}</h1>
          <p>Score:</p>
          <span>{rightPlayerScore}</span>
        </div>
      </div>
      <div
        className={styles.canvasWrapper}
        ref={(ref) => setCanvasParentRef(ref)}
      >
        <canvas ref={(ref) => setCanvasRef(ref)} />
      </div>
    </div>
  );
};
