import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const MyReviews = () => {
  const { user } = useAuth();
  const [userReviews, setUserReviews] = useState([]);
  const axiosSecure = useAxiosSecure();

  const { data: reviews = [], refetch } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get("/reviews");
        if (res.data) {
          const reviewerEmail = user.email;
          const filteredData = res.data.filter(
            (item) => item.reviewerEmail === reviewerEmail
          );
          setUserReviews(filteredData);
          return filteredData;
        }
        return reviews;
      } catch (error) {
        console.error("Error fetching data:", error);
        return reviews;
      }
    },
  });

  // delete review
  // delete user
  const handleDeleteReview = (item) => {
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
        axiosSecure.delete(`/reviews/${item._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your review has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  return (
    <div>
      <h2 className="text-5xl text-center mb-5">
        Your total reviews : {userReviews.length}
      </h2>
      <div className="overflow-x-auto w-full">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Property Title</th>
              <th>Agent Name</th>
              <th>Review Time</th>
              <th>Review Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userReviews.map((item, index) => {
              const reviewTime = new Date(item?.reviewTime);
              return (
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <td>{item?.propertyTitle}</td>
                  <td>{item?.agentName}</td>
                  <td>
                    {reviewTime.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td>{item?.reviewDetails}</td>
                  <th>
                    <button
                      className="btn btn-error btn-sm ml-5"
                      onClick={() => handleDeleteReview(item)}
                    >
                      <FaTrash />
                    </button>
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
              <th>Agent Name</th>
              <th>Review Time</th>
              <th>Review Description</th>
              <th>Action</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default MyReviews;
