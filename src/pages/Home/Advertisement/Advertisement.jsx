import { useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const Advertisement = () => {
  const [advertiseProperties, setAdvertiseProperties] = useState([]);
    const axiosPublic = useAxiosPublic();
    const { data: properties = [] } = useQuery({
      queryKey: ["properties"],
      queryFn: async () => {
        try {
          const res = await axiosPublic.get("/advertiseProperties");
          if (res.data) {
            const filteredData = res.data.filter(
              (item) => item.advertise === "active"
            );
            setAdvertiseProperties(filteredData);
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
        <h2 className="text-5xl font-extrabold text-center mb-5">
          Advertisement
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {advertiseProperties.map((item) => (
            <div className="card bg-base-100 shadow-xl" key={item._id}>
              <figure>
                <img src={item?.propertyImage} alt="" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  {item?.propertyLocation}
                  <div className="badge badge-secondary">{item?.status}</div>
                </h2>
                <p>{item?.propertyPrice}</p>
              </div>
              <Link to={`/propertyDetails/${item._id}`}>
                <button className="btn btn-info w-full">Details</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
};

export default Advertisement;