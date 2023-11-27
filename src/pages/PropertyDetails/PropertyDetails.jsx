import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import Modal from "react-modal";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const customStyles = {
  content: {
    // top: "50%",
    // left: "50%",
    // right: "auto",
    // bottom: "auto",
    //     marginRight: "-50%",
    // transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const PropertyDetails = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const property = useLoaderData();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const currentTime = new Date().toISOString();

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // fetch the review data
  const [userReviews, setUserReviews] = useState([]);
  const { data: reviews = [], refetch } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get("/reviews");
        if (res.data) {
          const propertyId = property._id;
          const filteredData = res.data.filter(
            (item) => item.propertyId === propertyId
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
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const reviewData = {
      propertyId: property._id,
      propertyTitle: property.propertyTitle,
      agentName: property.agentName,
      reviewDetails: data.reviewDetails,
      reviewerName: user?.displayName,
      reviewerEmail: user?.email,
      reviewerImage: user?.photoURL,
      reviewTime: currentTime,
    };
    const reviewResult = await axiosSecure.post("/reviews", reviewData);
    if (reviewResult.data.insertedId) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        text: "The property inserted into database",
        showConfirmButton: false,
        timer: 1500,
      });
      handleCloseModal();
      reset();
      refetch();
    }
  };

  return (
    <>
      <div className="hero">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src={property?.propertyImage}
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">{property?.propertyTitle}</h1>
            <p className="py-6">{property?.propertyDescription}</p>
            <p className="mb-2">Price : ${property?.propertyPrice}</p>
            <p className="mb-2">Location : ${property?.propertyLocation}</p>
            <p className="mb-2">Agent Name : ${property?.agentName}</p>
            <button className="btn btn-primary">Add to wishlist</button>
            <button className="btn btn-info ml-5" onClick={handleOpenModal}>
              Give a Review
            </button>

            <Modal
              className="w-2/3 mx-auto translate-y-1/2 bg-white border p-8"
              isOpen={isModalOpen}
              style={customStyles}
              onRequestClose={handleCloseModal}
              contentLabel="Example Modal"
            >
              <h3 className="font-bold text-lg">Please give a review</h3>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Details Review*</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered h-24"
                    placeholder="Type here"
                    {...register("reviewDetails", { required: true })}
                  ></textarea>
                  {errors.reviewDetails && <span>This field is required</span>}
                </div>
                <button className="btn mt-5">Add Review</button>
              </form>
            </Modal>
          </div>
        </div>
      </div>
      <h2 className="text-5xl font-bold text-center mb-5">Users Review</h2>
      {userReviews.length === 0 ? (
        <h4 className="text-2xl font-bold text-center mb-5">
          No review for this property
        </h4>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {userReviews.map((item) => (
            <div className="card bg-base-100 shadow-xl" key={item._id}>
              <div className="avatar mx-auto">
                <div className="w-24 rounded-full mt-3">
                  <img src={item?.reviewerImage} />
                </div>
              </div>

              <div className="card-body text-center">
                <h2 className="text-2xl font-bold">{item?.reviewerName}</h2>
                <p>{item?.reviewDetails}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default PropertyDetails;
