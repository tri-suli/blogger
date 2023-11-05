import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";

const Application = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

export default Application;
