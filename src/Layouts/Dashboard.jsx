import { FaAd, FaCartPlus, FaHome, FaHouseDamage, FaJediOrder, FaList, FaPercent, FaPlus, FaStar, FaUser, FaUsers } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAgent from "../hooks/useAgent";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const [isAgent] = useAgent();
  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col justify-center">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className="btn btn-ghost drawer-button lg:hidden"
          >
            All Menu
          </label>
          <div className="px-10">
            <Outlet></Outlet>
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            {isAdmin ? (
              <>
                <li>
                  <NavLink to="/dashboard/adminHome">
                    <FaHome />
                    Admin Home
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/dashboard/allUser">
                    <FaUsers />
                    All User
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/dashboard/adminManageProperties">
                    <FaHome />
                    Manage Properties
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/dashboard/allUserManageReview">
                    <FaStar />
                    Manage Properties
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/dashboard/advertiseProperties">
                    <FaAd />
                    Advertise
                  </NavLink>
                </li>
              </>
            ) : isAgent ? (
              <>
                <li>
                  <NavLink to="/dashboard/agentHome">
                    <FaUser />
                    Agent Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/agentAddProperties">
                    <FaPlus />
                    Add Property
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/agentAddedProperties">
                    <FaList />
                    My added properties
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/agentSoldProperties">
                    <FaHouseDamage />
                    My sold properties
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/agentRequestedProperties">
                    <FaJediOrder />
                    Requested properties
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/dashboard/userHome">
                    <FaUser />
                    My Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/userWishLists">
                    <FaCartPlus />
                    Wishlist
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/userPropertyBoughtOffer">
                    <FaPercent />
                    Apply Offer
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/dashboard/userPropertyBought">
                    <FaHome />
                    Property bought
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/dashboard/userMyReviews">
                    <FaStar />
                    My reviews
                  </NavLink>
                </li>
              </>
            )}

            <div className="divider"></div>
            <li>
              <NavLink to="/">
                <FaHome />
                Home
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
