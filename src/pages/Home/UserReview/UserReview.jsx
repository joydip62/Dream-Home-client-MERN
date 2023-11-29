import { useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const UserReview = () => {
  const [usersReviews, setUsersReviews] = useState([]);
  const axiosPublic = useAxiosPublic();
  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      try {
        const res = await axiosPublic.get("/usersReviews");
        if (res.data) {
          const filteredData = res.data
            .sort((a, b) => new Date(b.reviewTime) - new Date(a.reviewTime))
            .slice(0, 3);
          setUsersReviews(filteredData);
          return filteredData;
        }
        return reviews;
      } catch (error) {
        console.error("Error fetching user data:", error);
        return reviews;
      }
    },
  });

  return (
    <div>
      <h2 className="text-5xl font-extrabold text-center mb-5">User Review</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {usersReviews.map((item) => (
          <div
            className="card bg-base-100 shadow-xl text-center"
            key={item._id}
          >
            <div className="card-body ">
              <div className="avatar mx-auto">
                <div className="w-24 rounded-full">
                  <img src={item?.reviewerImage} />
                </div>
              </div>
              <h2 className="text-center text-2xl md:text-3xl font-bold">
                {item?.reviewerName}
              </h2>
              <h3 className="text-3xl text-center">{item?.propertyTitle}</h3>
              <p className="text-center">{item?.reviewDetails}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserReview;
