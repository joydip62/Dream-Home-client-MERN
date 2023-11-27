import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllProperties = () => {
  const { user } = useAuth();
  console.log(user);
    const [propertyData, setPropertyData] = useState([]);
    const axiosSecure = useAxiosSecure();
    const { data: properties = [] } = useQuery({
      queryKey: ["properties"],
      queryFn: async () => {
        try {
          const res = await axiosSecure.get("/properties");
          if (res.data) {
            const filteredData = res.data.filter(
              (item) => item.status === "verified"
            );
            setPropertyData(filteredData);
            return filteredData;
          }
          return properties;
        } catch (error) {
          console.error("Error fetching user data:", error);
          return properties;
        }
      },
    });
  
    return (
      <div>
        <Helmet>
          <title>Dream Home | All Properties</title>
        </Helmet>
        <h1 className="text-5xl font-extrabold text-center mb-5">
          All Properties
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {propertyData.map((item) => (
            <div className="card bg-base-100 shadow-xl" key={item?._id}>
              <figure>
                <img src={item?.propertyImage} alt="Shoes" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  {item?.propertyTitle}
                  <div className="badge badge-secondary">{item?.status}</div>
                </h2>
                <p>Price : ${item?.propertyPrice}</p>
                <p>Location : {item?.propertyLocation}</p>
                <div className="flex items-center mt-3">
                  <div className="avatar mx-auto">
                    <div className="w-12 rounded-full">
                      <img src={item?.agentImage} />
                    </div>
                  </div>
                  <h4 className="w-2/3">{item?.agentName}</h4>
                </div>
              </div>

              <Link to={`/propertyDetails/${item._id}`}>
                <button className="btn btn-primary w-full">Details</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
};

export default AllProperties;