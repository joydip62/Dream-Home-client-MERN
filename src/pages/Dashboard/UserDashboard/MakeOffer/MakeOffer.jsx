import { useForm } from "react-hook-form";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const MakeOffer = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const property = useLoaderData();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const currentDate = new Date().toLocaleDateString(undefined, options);
    const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    // watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const propertyOfferData = {
      propertyTitle: property.propertyTitle,
      propertyLocation: property.propertyLocation,
      propertyPrice: parseFloat(property.propertyPrice),
      offeredAmount: parseFloat(data.offeredAmount),
      propertyImage: property.propertyImage,
      agentName: property.agentName,
      agentEmail: property.agentName,
      buyerName: user.displayName,
      buyerEmail: user.email,
      offerDate: currentDate,
      status: "pending",
    };
    const propertyOfferResult = await axiosSecure.post(
      "/makeOffers",
      propertyOfferData
    );
    if (propertyOfferResult.data.insertedId) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        text: "You offered this property",
        showConfirmButton: false,
        timer: 1500,
      });
        reset();
        navigate("/dashboard/userPropertyBoughtOffer");
    }
  };
  return (
    <div>
      <h2 className="text-5xl font-bold">Make an offer for the property</h2>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Property title*</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              defaultValue={property?.propertyTitle}
              {...register("propertyTitle", { disabled: true })}
            />
          </div>

          <div className="flex gap-6">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Property location*</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                defaultValue={property?.propertyLocation}
                {...register("propertyLocation", { disabled: true })}
              />
              {errors.propertyLocation && <span>This field is required</span>}
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Property Price*</span>
              </label>
              <input
                type="number"
                placeholder="Type here"
                className="input input-bordered w-full"
                defaultValue={property?.propertyPrice}
                {...register("propertyPrice", { disabled: true })}
              />
              {errors.propertyPrice && <span>This field is required</span>}
            </div>
          </div>
          <div className="flex gap-6 mt-5">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Make An offer*</span>
              </label>
              <input
                type="number"
                {...register("offeredAmount", { required: true })}
                min={property?.propertyPrice}
                className="input input-bordered w-full"
              />
              {errors.offeredAmount && <span>This field is required</span>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Agent Name*</span>
              </label>
              <input
                type="text"
                defaultValue={property?.agentName}
                {...register("agentName", { disabled: true })}
                className="input input-bordered w-full"
              />
              {errors.agentName && <span>This field is required</span>}
            </div>
          </div>

          <button className="btn mt-5">Buy Property</button>
        </form>
      </div>
    </div>
  );
};

export default MakeOffer;
