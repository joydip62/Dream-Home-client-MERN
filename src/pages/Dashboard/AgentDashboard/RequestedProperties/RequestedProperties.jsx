import { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const RequestedProperties = () => {
         const { user } = useAuth();
         const [requestedProperty, setRequestedProperty] = useState([]);
         const axiosSecure = useAxiosSecure();

         const { data: propertyRequest = [], refetch } = useQuery({
           queryKey: ["propertyRequest"],
           queryFn: async () => {
             try {
               const res = await axiosSecure.get("/makeOffers");
               if (res.data) {
                 const userEmail = user.email;
                 const filteredData = res.data.filter(
                   (item) =>
                     item.agentEmail === userEmail
                 );
                 setRequestedProperty(filteredData);
                 return filteredData;
               }
               return propertyRequest;
             } catch (error) {
               console.error("Error fetching data:", error);
               return propertyRequest;
             }
           },
         });

         // delete wishlist
         const handleDeleteWishList = (item) => {
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
               axiosSecure.delete(`/wishLists/${item._id}`).then((res) => {
                 if (res.data.deletedCount > 0) {
                   refetch();
                   Swal.fire({
                     title: "Deleted!",
                     text: "You rejected the property",
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
               Your total Offered list : {requestedProperty.length}
             </h2>
             <div className="overflow-x-auto w-full">
               <table className="table">
                 <thead>
                   <tr>
                     <th></th>
                     <th>Property Title</th>
                     <th>Property Location</th>
                     <th>Property Price</th>
                     <th>Agent Name</th>
                     <th>Status</th>
                     <th>Action</th>
                   </tr>
                 </thead>
                 <tbody>
                   {requestedProperty.map((item, index) => {
                     return (
                       <tr key={item._id}>
                         <th>{index + 1}</th>
                         <td>
                           <div className="flex items-center gap-3">
                             <div className="avatar">
                               <div className="mask mask-squircle w-12 h-12">
                                 <img src={item?.propertyImage} alt="" />
                               </div>
                             </div>
                             <div>
                               <div className="font-bold">
                                 {item?.propertyTitle}
                               </div>
                             </div>
                           </div>
                         </td>
                         <td>{item?.propertyLocation}</td>
                         <td>{item?.propertyPrice}</td>
                         <td>{item?.agentName}</td>
                         <td>{item?.status}</td>
                         <th>
                           <Link to={`/dashboard/userWishLists/${item._id}`}>
                             <button className="btn btn-info btn-sm">
                               Make an offer
                             </button>
                           </Link>
                           <button
                             className="btn btn-error btn-sm ml-5"
                             onClick={() => handleDeleteWishList(item)}
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
                     <th>Property Title</th>
                     <th>Agent Name</th>
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

export default RequestedProperties;