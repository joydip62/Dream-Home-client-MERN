import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import AllProperties from "../pages/AllProperties/AllProperties";
import Home from "../pages/Home/Home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
        },
        
      {
        path: "/allProperties",
        element: <AllProperties />,
        },
        
    ],
  },
]);
