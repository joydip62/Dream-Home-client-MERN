import { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const RequestedProperties = () => {
  const { user } = useAuth();
  const [requestedProperty, setRequestedProperty] = useState([]);
  const axiosSecure = useAxiosSecure();

  const { data: propertyRequest = [], refetch } = useQuery({
    queryKey: ["propertyRequest"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get("/makeOffers");
        if (res.data) {
          const userEmail = user.email;
          const filteredData = res.data.filter(
            (item) => item.agentEmail === userEmail && item.status === "pending"
          );
          setRequestedProperty(filteredData);
          return filteredData;
        }
        return propertyRequest;
      } catch (error) {
        console.error("Error fetching data:", error);
        return propertyRequest;
      }
    },
  });

  //  accept offer
  const handleAcceptOffer = (item) => {
    axiosSecure.patch(`/offers/accept/${item._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "You accept the offer",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleRejectOffer = (item) => {
    axiosSecure.patch(`/offers/reject/${item._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "You accept the offer",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div>
      <h2 className="text-5xl text-center mb-5">
        Your total Offered list : {requestedProperty.length}
      </h2>
      <div className="overflow-x-auto w-full">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Property Title</th>
              <th>Property Location</th>
              <th>Property Price</th>
              <th>Offered Price</th>
              <th>Buyer Name</th>
              <th>Buyer Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requestedProperty.map((item, index) => {
              return (
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <td>{item?.propertyTitle}</td>
                  <td>{item?.propertyLocation}</td>
                  <td>{item?.propertyPrice}</td>
                  <td>{item?.offeredAmount}</td>
                  <td>{item?.buyerName}</td>
                  <td>{item?.buyerEmail}</td>
                  <th>
                    {item?.status === "accepted" ? (
                      "Accept"
                    ) : item?.status === "rejected" ? (
                      "Reject"
                    ) : (
                      <>
                        <button
                          className="btn btn-info btn-sm ml-5"
                          onClick={() => handleAcceptOffer(item)}
                        >
                          Accept
                        </button>

                        <button
                          className="btn btn-error btn-sm ml-5"
                          onClick={() => handleRejectOffer(item)}
                        >
                          Reject
                        </button>
                      </>
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
              <th>Offered Price</th>
              <th>Buyer Name</th>
              <th>Buyer Email</th>
              <th>Action</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default RequestedProperties;
