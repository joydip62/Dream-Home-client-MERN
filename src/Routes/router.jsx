import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Layouts/Dashboard";
import Main from "../Layouts/Main";
import AllProperties from "../pages/AllProperties/AllProperties";
import AdminHome from "../pages/Dashboard/AdminDashboard/AdminHome";
import AllUser from "../pages/Dashboard/AdminDashboard/AllUser/AllUser";
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
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
    // admin related route
      {
        path: "adminHome",
        element: <AdminHome />,
      },
      {
        path: "allUser",
        element: <AllUser/>
      },
    ],
  },
]);
