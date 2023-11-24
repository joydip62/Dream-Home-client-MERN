import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import AllProperties from "../pages/AllProperties/AllProperties";
import Home from "../pages/Home/Home/Home";
// import NotFoundPage from "../pages/Error/NotFoundPage";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    // errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/allProperties",
        element: (
          <PrivateRoute>
            <AllProperties />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },

      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);
