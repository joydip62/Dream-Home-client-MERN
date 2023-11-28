import { useQuery } from "@tanstack/react-query";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const ManageReviews = () => {
      const axiosSecure = useAxiosSecure();

      const { data: reviews = [], refetch } = useQuery({
        queryKey: ["reviews"],
        queryFn: async () => {
          try {
            const res = await axiosSecure.get("/reviews");
            return res.data;
          } catch (error) {
            console.error("Error fetching data:", error);
            return reviews;
          }
        },
      });

      // delete review
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
                  text: "You deleted this review.",
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
            User total reviews : {reviews.length}
          </h2>
          <div className="overflow-x-auto w-full">
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th>Reviewer Details</th>
                  <th>Property Title</th>
                  <th>Review Time</th>
                  <th>Review Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((item, index) => {
                  const reviewTime = new Date(item?.reviewTime);
                  return (
                    <tr key={item._id}>
                      <th>{index + 1}</th>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img src={item?.reviewerImage} alt="" />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">
                              {item?.reviewerName}
                            </div>
                            <div className="text-sm opacity-50">
                              {item?.reviewerEmail}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{item?.propertyTitle}</td>
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
                  <th>Reviewer Details</th>
                  <th>Property Title</th>
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

export default ManageReviews;