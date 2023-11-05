import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Schedule from "./pages/Schedule";

const Application = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/schedules",
    element: <Schedule />,
  },
]);

export default Application;
