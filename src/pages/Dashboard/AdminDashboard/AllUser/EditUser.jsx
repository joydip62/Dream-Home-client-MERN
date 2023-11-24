import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const EditUser = () => {
    const axiosSecure = useAxiosSecure();
    const user = useLoaderData();
    const navigate = useNavigate();
      const {
        register,
        handleSubmit,
        reset
      } = useForm();
      const onSubmit = (data) => {
        // create user entry in the database
        const userInfo = {
          role: data.role,
        };
          axiosSecure.patch(`/users/role/${user._id}`, userInfo).then((res) => {
              console.log(res.data);
              if (res.data.acknowledged) {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "User updated successfully.",
                  showConfirmButton: false,
                  timer: 1500,
                });
                reset();
                navigate("/dashboard/allUser");
              }
          });
      };
    return (
      <div className="w-full m-auto text-center lg:p-24">
        <h2 className="text-3xl mb-8 font-bold">Update User</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="md:flex space-x-5 mb-8">
            <div className="form-control flex-1 md:w-1/2">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  placeholder="Enter you name"
                  className="input input-bordered"
                  name="name"
                  defaultValue={user?.name}
                  {...register("name", { disabled: true })}
                />
              </label>
            </div>

            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  placeholder="Enter you name"
                  className="input input-bordered"
                  name="email"
                  defaultValue={user?.email}
                  {...register("email", { disabled: true })}
                />
              </label>
            </div>
          </div>
          <div className="form-control md:w-1/2 mb-5">
            <label className="label">
              <span className="label-text">User Role</span>
            </label>
            <label className="input-group">
              <select
                className="select select-bordered w-full max-w-xs"
                            name="role"
                        defaultValue={user?.role}
                {...register("role", { required: true })}
              >
                <option disabled value="">
                  Select type
                </option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
                <option value="Agent">Agent</option>
              </select>
            </label>
          </div>

          <input className="btn btn-block" type="submit" value="Update User" />
        </form>
      </div>
    );
};

export default EditUser;