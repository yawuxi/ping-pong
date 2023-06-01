import { ChangeEvent, FC } from "react";
import { useNavigate } from "react-router-dom";
import { usePlayers } from "features/ping-pong/store/usePlayers";
import styles from "./index.module.scss";

export const Hello: FC = () => {
  const navigate = useNavigate();
  const { leftPlayer, rightPlayer, setPlayer } = usePlayers();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlayer(event.currentTarget.name, event.currentTarget.value);
  };

  const navigateOnSubmit = () => {
    if (leftPlayer && rightPlayer) {
      navigate("/game");
    } else {
      alert("Enter player names!");
    }
  };

  return (
    <div className={styles.page}>
      <h1>Ping-Pong</h1>
      <form>
        <input
          type="text"
          name="leftPlayer"
          placeholder="First player"
          onChange={handleChange}
          value={leftPlayer}
        />
        <input
          type="text"
          name="rightPlayer"
          placeholder="Second player"
          onChange={handleChange}
          value={rightPlayer}
        />
        <button type="button" onClick={navigateOnSubmit}>
          Start the game
        </button>
      </form>
    </div>
  );
};
