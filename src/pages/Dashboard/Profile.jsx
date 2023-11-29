import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Profile = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosSecure.get(`/users/role/${user?.email}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (user?.email) {
      fetchUserData();
    }
  }, [user, axiosSecure]);

  return (
    <div>
      {userData ? (
        <>
          <div className="card card-side bg-base-100 shadow-xl">
            <figure>
              <img
                src={userData.userData?.photoURL}
                alt="Movie"
                className="w-40"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Name: {userData.userData?.name}</h2>
              <h2 className="card-title">Email : {userData.userData?.email}</h2>
              <p>Role : {userData.userData?.role}</p>
            </div>
          </div>
        </>
      ) : (
        <p className="text-4xl font-bold">Loading user data...</p>
      )}
    </div>
  );
};

export default Profile;
