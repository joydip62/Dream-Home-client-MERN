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
import AddedProperties from "../pages/Dashboard/AgentDashboard/AddedProperties/AddedProperties";
import EditProperty from "../pages/Dashboard/AgentDashboard/EditProperty/EditProperty";
import ManageProperties from "../pages/Dashboard/AdminDashboard/ManageProperties/ManageProperties";
import PropertyDetails from "../pages/PropertyDetails/PropertyDetails";
import MyReviews from "../pages/Dashboard/UserDashboard/MyReview/MyReviews";
import WishLists from "../pages/Dashboard/UserDashboard/WishLists/WishLists";
import MakeOffer from "../pages/Dashboard/UserDashboard/MakeOffer/MakeOffer";
import PropertyBought from "../pages/Dashboard/UserDashboard/PropertyBought/PropertyBought";
import ApplyOffered from "../pages/Dashboard/UserDashboard/ApplyOffered/ApplyOffered";
import RequestedProperties from "../pages/Dashboard/AgentDashboard/RequestedProperties/RequestedProperties";
import Payment from "../pages/Dashboard/UserDashboard/Payment/Payment";
import SoldProperties from "../pages/Dashboard/AgentDashboard/SoldProperties/SoldProperties";
import ManageReviews from "../pages/Dashboard/AdminDashboard/ManageReviews/ManageReviews";
import AdvertiseProperties from "../pages/Dashboard/AdminDashboard/AdvertiseProperties/AdvertiseProperties";

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
        path: "/propertyDetails/:id",
        element: (
          <PrivateRoute>
            <PropertyDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          // fetch(`http://localhost:5000/properties/${params.id}`),
          fetch(
            `https://b8a12-server-side-joydip62.vercel.app/properties/${params.id}`
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
      // ======================= admin related route ======================
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
        path: "allUserManageReview",
        element: (
          <AdminRoute>
            <ManageReviews />
          </AdminRoute>
        ),
      },

      {
        path: "updateUser/:id",
        element: <EditUser />,
        loader: ({ params }) =>
          fetch(
            `https://b8a12-server-side-joydip62.vercel.app/users/${params.id}`
          ),
      },

      {
        path: "advertiseProperties",
        element: (
          <AdminRoute>
            <AdvertiseProperties/>
          </AdminRoute>
        ),
      },

      {
        path: "adminManageProperties",
        element: (
          <AdminRoute>
            <ManageProperties />
          </AdminRoute>
        ),
      },

      // =========================== agent related route ======================
      {
        path: "agentHome",
        element: (
          <AgentRoute>
            <AgentHome />
          </AgentRoute>
        ),
      },

      {
        path: "agentAddProperties",
        element: (
          <AgentRoute>
            <AddProperties />
          </AgentRoute>
        ),
      },
      {
        path: "agentAddedProperties",
        element: (
          <AgentRoute>
            <AddedProperties />
          </AgentRoute>
        ),
      },
      {
        path: "agentEditProperties/:id",
        element: (
          <AgentRoute>
            <EditProperty />
          </AgentRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://b8a12-server-side-joydip62.vercel.app/properties/${params.id}`
          ),
      },

      {
        path: "agentRequestedProperties",
        element: (
          <AgentRoute>
            <RequestedProperties />
          </AgentRoute>
        ),
      },

      {
        path: "agentSoldProperties",
        element: (
          <AgentRoute>
            <SoldProperties />
          </AgentRoute>
        ),
      },

      // ============================ user related route ====================
      {
        path: "userHome",
        element: <UserHome />,
      },

      {
        path: "userMyReviews",
        element: <MyReviews />,
      },

      {
        path: "userWishLists",
        element: <WishLists />,
      },

      {
        path: "userWishLists/:id",
        element: <MakeOffer />,
        loader: ({ params }) =>
          fetch(
            `https://b8a12-server-side-joydip62.vercel.app/wishLists/${params.id}`
          ),
      },

      {
        path: "userPropertyBoughtOffer",
        element: <ApplyOffered />,
      },

      {
        path: "userPropertyBought",
        element: <PropertyBought />,
      },
      {
        path: "userPay/:id",
        element: <Payment />,
        loader: ({ params }) =>
          fetch(
            `https://b8a12-server-side-joydip62.vercel.app/userPay/${params.id}`
          ),
      },
    ],
  },
]);
