
const EditProperty = () => {
        const axiosSecure = useAxiosSecure();
        const user = useLoaderData();
        const navigate = useNavigate();
        const { register, handleSubmit, reset } = useForm();
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

           <button className="btn mt-5">Add Property</button>
         </form>
       </div>
     );
};

export default EditProperty;