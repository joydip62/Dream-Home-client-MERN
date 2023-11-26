import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaHome } from "react-icons/fa";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddProperties = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    // watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-Type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const menuItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
        image: res.data.data.display_url,
      };
      const menuRes = await axiosSecure.post("/menu", menuItem);
      if (menuRes.data.insertedId) {
        Swal.fire({
          title: "Good job!",
          text: "Menu item inserted into database",
          icon: "success",
        });
        reset();
      }
    }
  };
  return (
    <div >
      - Property title. - Property location. - Property image (agents will be
      able to upload images from their local pc or mobile). - Agent name
      (readonly). - Agent email(readonly). - Price range. - Add property button.
      <h2 className="text-5xl font-bold">Add The Properties</h2>
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
                type="number"
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
                {...register("propertyPrice", { required: true })}
              />
              {errors.propertyPrice && <span>This field is required</span>}
            </div>
          </div>
          <div className="flex gap-6">
            <div className="form-control w-full">
              <input
                type="file"
                {...register("propertyImage", { required: true })}
                className="file-input file-input-bordered file-input-md w-full"
              />
              {errors.propertyImage && <span>This field is required</span>}
            </div>
          </div>

          <button className="btn mt-5">
            Add Item <FaHome className="ml-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProperties;
