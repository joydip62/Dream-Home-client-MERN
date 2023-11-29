import { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AdvertiseProperties = () => {
  const [propertyData, setPropertyData] = useState([]);
  const axiosSecure = useAxiosSecure();
  const { data: properties = [], refetch } = useQuery({
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
    

      
    //  make advertise offer
    const handleMakeAdvertise = async (item) => {
      // Check if propertyData is an array
      if (!Array.isArray(propertyData)) {
        console.error("propertyData is not an array.");
        return;
      }
      const activeAdvertiseProperties = propertyData.filter(
        (property) => property?.advertise === "active"
      );

      if (activeAdvertiseProperties.length >= 6) {
        // Display a message indicating the limit has been reached
        Swal.fire({
          icon: "warning",
          text: "You cannot make more than 6 properties for advertising.",
        });
      } else {
        const data = {
          advertise: "active",
        };

        const result = await axiosSecure.patch(
          `/properties/advertise/${item._id}`,
          data
        );

        if (result.data.acknowledged) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            text: "The property Marked as advertised successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        }
      }
    };
    
    
  // delete advertise property
  const handleDeleteAdvertiseProperty = async(item) => {
    const data = {
        advertise: "in-active"
        };
      const result = await axiosSecure.patch(`/properties/advertise/${item._id}`, data);
        
      if (result.data.acknowledged) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          text: "The property Mark as advertise successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
  };
  return (
    <div>
      <h2 className="text-5xl text-center mb-5">
        Total Advertise list : {propertyData.length}
      </h2>
      <div className="overflow-x-auto w-full">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Property Title</th>
              <th>Property Location</th>
              <th>Property Price</th>
              <th>Agent Name</th>
              <th>Agent Email</th>
              <th>Advertise</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {propertyData.map((item, index) => {
              return (
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <td>{item?.propertyTitle}</td>
                  <td>{item?.propertyLocation}</td>
                  <td>{item?.propertyPrice}</td>
                  <td>{item?.agentName}</td>
                  <td>{item?.agentEmail}</td>
                  <td>{item?.advertise}</td>
                  <th>
                    {item?.advertise === "active" ? (
                      <button
                        className="btn btn-error btn-sm ml-5"
                        onClick={() => handleDeleteAdvertiseProperty(item)}
                      >
                        Remove
                      </button>
                    ) : (
                      <button
                        className="btn btn-info btn-sm ml-5"
                        onClick={() => handleMakeAdvertise(item)}
                      >
                        Make Advertise
                      </button>
                    )}
                  </th>
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
              <th>Property Price</th>
              <th>Agent Name</th>
              <th>Agent Email</th>
              <th>Advertise</th>
              <th>Action</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default AdvertiseProperties;