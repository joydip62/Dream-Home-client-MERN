import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddProperties = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    // watch,
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
        propertyDescription: data.propertyDescription,
        propertyPrice: parseFloat(data.propertyPrice),
        propertyImage: res.data.data.display_url,
        agentName: user.displayName,
        agentEmail: user.email,
        agentImage: user?.photoURL,
        status: "pending",
      };
      const propertyResult = await axiosSecure.post("/properties", propertyData);
      console.log(propertyResult);
      if (propertyResult.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          text: "The property inserted into database",
          showConfirmButton: false,
          timer: 1500,
        }); 
        reset();
      }
    }
  };
  return (
    <div>
      <h2 className="text-5xl font-bold">Add The Property</h2>
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
                max="999999.99"
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
          <div className="form-control">
            <label className="label">
              <span className="label-text">Property Description*</span>
            </label>
            <textarea
              className="textarea textarea-bordered h-24"
              placeholder="Type here"
              {...register("propertyDescription", { required: true })}
            ></textarea>
            {errors.propertyDescription && <span>This field is required</span>}
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

          <button className="btn mt-5">Add Property</button>
        </form>
      </div>
    </div>
  );
};

export default AddProperties;
