import { Link, useLocation, useNavigate } from "react-router-dom";
// import useAuth from "../../hooks/useAuth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
// import toast from "react-hot-toast";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import Social from "../Shares/Social/Social";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";

  
const Register = () => {
  const { createUser, handleUpdateProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const [showPass, setShowPass] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    createUser(data.email, data.password).then((result) => {
      // const loggedUser = result.user;
      console.log(data.name, data.photoURL);
      handleUpdateProfile(data.name, data.photoURL)
        .then(() => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "You have successfully register with email password!",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate(from, { replace: true });
          // create user entry in the database
          // const userInfo = {
          //   name: data.name,
          //   email: data.email,
          // };
          // axiosPublic.post("/users", userInfo).then((res) => {
          //   if (res.data.insertedId) {
          //     console.log("user added to the database");
          //     reset();
          //     Swal.fire({
          //       position: "top-end",
          //       icon: "success",
          //       title: "User created successfully.",
          //       showConfirmButton: false,
          //       timer: 1500,
          //     });
          //     navigate(location?.state ? location.state : "/");
          //   }
          // });
        })
        .catch((error) => console.log(error));
    });
  };

  // const handleCreateUser = (e) => {
  //   e.preventDefault();
  //   const name = e.target.name.value;
  //   const photoUrl = e.target.photoUrl.value;
  //   const email = e.target.email.value;
  //   const password = e.target.password.value;

  //   if (password.length < 6) {
  //     const toastId = toast.loading("Loading");
  //     toast.error("Your password must be at least 6 characters", {
  //       id: toastId,
  //     });
  //     return;
  //   } else if (!/^(?=.*?[a-z])/.test(password)) {
  //     const toastId = toast.loading("Loading");
  //     toast.error("Your password must be at least 1 lowercase", {
  //       id: toastId,
  //     });
  //     return;
  //   } else if (!/(?=.*?[A-Z])/.test(password)) {
  //     const toastId = toast.loading("Loading");
  //     toast.error("Your password must be at least 1 uppercase", {
  //       id: toastId,
  //     });
  //     return;
  //   } else if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
  //     const toastId = toast.loading("Loading");
  //     toast.error(
  //       "Your password must be at least 1 special character(#?!@$%^&*-)",
  //       {
  //         id: toastId,
  //       }
  //     );
  //     return;
  //   }
  // };
  return (
    <div>
      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mx-auto mt-10">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-2xl font-bold">Create an account </h2>
          <div className="border p-5">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter you name"
                className="input input-bordered"
                name="name"
                {...register("name", { required: true })}
              />
              {errors.name?.type === "required" && (
                <p className="text-red-600">Name is required</p>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                placeholder="Enter your photo Url"
                className="input input-bordered"
                name="photoURL"
                {...register("photoURL", {
                  required: true,
                  pattern: /(https?:\/\/.*\.(?:png|jpg|jpeg))/i,
                })}
              />
              {errors.photoUrl?.type === "required" && (
                <p className="text-red-600">photoUrl is required</p>
              )}

              {errors.photoUrl?.type === "pattern" && (
                <p className="text-red-600">please enter a </p>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                name="email"
                {...register("email", {
                  required: true,
                })}
              />
              {errors.email?.type === "required" && (
                <p className="text-red-600">Email is required</p>
              )}
            </div>

            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type={showPass ? "text" : "password"}
                placeholder="password"
                className="input input-bordered"
                name="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                })}
              />
              {errors.password?.type === "required" && (
                <p className="text-red-600">Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-600">Password must be 6 characters</p>
              )}

              {errors.password?.type === "pattern" && (
                <p className="text-red-600">
                  Password must have one Uppercase one lower case, one number
                  and one special character.
                </p>
              )}
              <span
                className="absolute right-5 top-14"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
              </span>
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn bg-[#F9A51A] mb-5">
                Create an account
              </button>
              <p className="text-center">
                Already have an account? {""}
                <Link to="/login" className="text-[#F9A51A]">
                  Login
                </Link>
              </p>
            </div>
          </div>
          <div>
            <Social></Social>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;