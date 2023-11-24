import { Outlet, useLocation } from "react-router-dom";
import Footer from "../pages/Shares/Footer/Footer";
import Navbar from "../pages/Shares/Navbar/Navbar";

const Main = () => {

  const location = useLocation();
  const noHeaderFooter =
    location.pathname.includes("login") ||
    location.pathname.includes("register");

  return (
      <div className="space-y-5 px-5">
        {noHeaderFooter || <Navbar />}
        <Outlet />
        {noHeaderFooter || <Footer />}
      </div>
    );
};

export default Main;