import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const SoldProperties = () => {
      const { user } = useAuth();
      const [soldProperty, setSoldProperty] = useState([]);
      const axiosSecure = useAxiosSecure();

      const { data: propertySold = [] } = useQuery({
        queryKey: ["propertySold"],
        queryFn: async () => {
          try {
            const res = await axiosSecure.get("/boughtProperty");
            if (res.data) {
              const userEmail = user.email;
              const filteredData = res.data.filter(
                (item) => item.agentEmail === userEmail
              );
              setSoldProperty(filteredData);
              return filteredData;
            }
            return propertySold;
          } catch (error) {
            console.error("Error fetching data:", error);
            return propertySold;
          }
        },
      });
    return (
      <div>
        <h2 className="text-5xl text-center mb-5">
          Your total Sold property list : {soldProperty.length}
        </h2>
        <div className="overflow-x-auto w-full">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Property Title</th>
                <th>Property Location</th>
                <th>Sold Price</th>
                <th>Buyer Name</th>
                <th>Buyer Email</th>
              </tr>
            </thead>
            <tbody>
              {soldProperty.map((item, index) => {
                return (
                  <tr key={item._id}>
                    <th>{index + 1}</th>
                    <td>{item?.propertyTitle}</td>
                    <td>{item?.propertyLocation}</td>
                    <td>{item?.price}</td>
                    <td>{item?.buyerName}</td>
                    <td>{item?.buyerEmail}</td>
                  </tr>
                );
              })}
            </tbody>
            {/* foot */}
            <tfoot>
              <tr>
                <th></th>
                <th>Property Title</th>
                <th>Property Location</th>
                <th>Sold Price</th>
                <th>Buyer Name</th>
                <th>Buyer Email</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    );
};

export default SoldProperties;