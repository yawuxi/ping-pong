import { Navigate, Route, Routes } from "react-router-dom";
import { Playground } from "features/ping-pong/pages/Playground";
import { Hello } from "features/ping-pong/pages/Hello";
import styles from "./index.module.scss";

const App = () => {
  return (
    <div className={styles.app}>
      <Routes>
        <Route path="/game" element={<Playground />} />
        <Route path="/Hello" element={<Hello />} />
        <Route path="*" element={<Navigate to="/hello" />} />
      </Routes>
    </div>
  );
};

export { App };
