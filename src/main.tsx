import ReactDOM from "react-dom/client";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";

import App from "./App.tsx";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <SkeletonTheme baseColor="#fff" highlightColor="#fadba7">
    <App />
  </SkeletonTheme>
);
