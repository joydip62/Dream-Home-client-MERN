import { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const ApplyOffered = () => {
  const { user } = useAuth();
  const [userPropertyBought, setUserPropertyBought] = useState([]);
  const axiosSecure = useAxiosSecure();

  const { data: propertyBought = [], refetch } = useQuery({
    queryKey: ["propertyBought"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get("/makeOffers");
        if (res.data) {
          const userEmail = user.email;
          const filteredData = res.data.filter(
            (item) => item.buyerEmail === userEmail
          );
          setUserPropertyBought(filteredData);
          return filteredData;
        }
        return propertyBought;
      } catch (error) {
        console.error("Error fetching data:", error);
        return propertyBought;
      }
    },
  });

  // delete wishlist
  const handleDeleteOffer = (item) => {
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
        axiosSecure.delete(`/makeOffers/${item._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your offered property has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  return (
    <div>
      <h2 className="text-5xl font-bold text-center">
        Your total Offered Property list : {userPropertyBought.length}
      </h2>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {userPropertyBought.map((item) => (
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
              <p>Property offered Price : ${item?.offeredAmount}</p>
              <div className="card-actions justify-start">
                <div className="badge badge-outline">
                  Agent : {item?.agentName}
                </div>
              </div>
              <div className="justify-start space-x-5">
                {item?.status === "rejected" || item?.status === "pending" ? (
                  <></>
                ) : (
                  <Link to={`/dashboard/userPay/${item._id}`}>
                    <button className="btn btn-info">Pay</button>
                  </Link>
                )}

                <button
                  className="btn btn-error"
                  onClick={() => handleDeleteOffer(item)}
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

export default ApplyOffered;
