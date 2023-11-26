import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Layouts/Dashboard";
import Main from "../Layouts/Main";
import AllProperties from "../pages/AllProperties/AllProperties";
import AdminHome from "../pages/Dashboard/AdminDashboard/AdminHome";
import AllUser from "../pages/Dashboard/AdminDashboard/AllUser/AllUser";
import EditUser from "../pages/Dashboard/AdminDashboard/AllUser/EditUser";
import Home from "../pages/Home/Home/Home";
// import NotFoundPage from "../pages/Error/NotFoundPage";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import AgentHome from "../pages/Dashboard/AgentDashboard/AgentHome";
import UserHome from "../pages/Dashboard/UserDashboard/UserHome";
import AdminRoute from "./AdminRoute";
import AgentRoute from "./AgentRoute";
import AddProperties from "../pages/Dashboard/AgentDashboard/AddProperties/AddProperties";

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
        element: (
          <AdminRoute>
            <AdminHome />
          </AdminRoute>
        ),
      },
      {
        path: "allUser",
        element: (
          <AdminRoute>
            <AllUser />
          </AdminRoute>
        ),
      },

      {
        path: "updateUser/:id",
        element: <EditUser />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/users/${params.id}`),
      },

      // agent related route
      {
        path: "agentHome",
        element: (
          <AgentRoute>
            <AgentHome />
          </AgentRoute>
        ),
      },

      {
        path: "agentAddedProperties",
        element: (
          <AgentRoute>
            <AddProperties/>
          </AgentRoute>
        ),
      },

      // user related route
      {
        path: "userHome",
        element: <UserHome />,
      },
    ],
  },
]);
