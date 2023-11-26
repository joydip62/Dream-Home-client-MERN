import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const AddedProperties = () => {
  const { user } = useAuth();
  const [propertyData, setPropertyData] = useState([]);
  const axiosSecure = useAxiosSecure();
  const { data: properties = [], refetch } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get("/properties");
        if (res.data) {
          const userEmail = user?.email;
          const filteredData = res.data.filter(
            (item) => item.agentEmail === userEmail
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

  // delete property
  const handleDeleteProperty = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/properties/${item._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "The property has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  return (
    <div>
      <h2 className="text-5xl font-bold text-center">All Added Properties</h2>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
              <p>Property Location : {item?.propertyLocation}</p>
              <p>Property Price : {item?.propertyPrice}</p>
              <div className="card-actions justify-start">
                <div className="badge badge-outline">
                  Agent : {item?.agentName}
                </div>
                <div className="badge badge-outline">
                  Email : {item?.agentEmail}
                </div>
              </div>
              <div className="justify-start space-x-5">
                {item?.status === "rejected" ? (
                  <button className="btn " disabled>
                    Rejected
                  </button>
                ) : (
                  <Link to={`/dashboard/agentEditProperties/${item._id}`}>
                    <button className="btn btn-info">
                      <FaEdit />
                    </button>
                  </Link>
                )}

                <button
                  className="btn btn-error"
                  onClick={() => handleDeleteProperty(item)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddedProperties;
