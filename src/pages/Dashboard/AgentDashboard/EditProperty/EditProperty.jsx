import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;


const EditProperty = () => {
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
  const property = useLoaderData();
  const navigate = useNavigate();
      const {
        register,
        handleSubmit,
          reset,
        formState: { errors },
    } = useForm();
    
  const onSubmit = async (data) => {
   const imageFile = { image: data.propertyImage[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-Type": "multipart/form-data",
      },
    });

    if (res.data.success) {
      const propertyData = {
        propertyTitle: data.propertyTitle,
        propertyLocation: data.propertyLocation,
        propertyPrice: parseFloat(data.propertyPrice),
        propertyImage: res.data.data.display_url,
        agentName: user.displayName,
        agentEmail: user.email,
        };
      const propertyResult = await axiosSecure.patch(
          `/properties/${property._id}`, propertyData);
        
      if (propertyResult.data.acknowledged) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          text: "The property Updated successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
        navigate("/dashboard/agentAddedProperties");
      }
    }
  };
  return (
    <div className="w-full m-auto text-center lg:p-24">
      <h2 className="text-3xl mb-8 font-bold">Update Property</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Property title*</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
            defaultValue={property.propertyTitle}
            {...register("propertyTitle", { required: true })}
          />
          {errors.propertyTitle && <span>This field is required</span>}
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
              defaultValue={property.propertyLocation}
              {...register("propertyLocation", { required: true })}
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
              defaultValue={property.propertyPrice}
              {...register("propertyPrice", { required: true })}
            />
            {errors.propertyPrice && <span>This field is required</span>}
          </div>
        </div>
        <div className="flex gap-6 mt-5">
          <div className="form-control w-full">
            <input
              type="file"
              {...register("propertyImage", { required: true })}
              className="file-input file-input-bordered file-input-md w-full"
            />
            {errors.propertyImage && <span>This field is required</span>}
          </div>
        </div>
        <div className="flex gap-6">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Agent Name</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              defaultValue={user.displayName}
              {...register("agentName", { disabled: true })}
            />
            {errors.agentName && <span>This field is required</span>}
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Agent Email</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              defaultValue={user.email}
              {...register("agentEmail", { disabled: true })}
            />
            {errors.agentEmail && <span>This field is required</span>}
          </div>
        </div>

        <button className="btn mt-5">Update Property</button>
      </form>
    </div>
  );
};

export default EditProperty;
