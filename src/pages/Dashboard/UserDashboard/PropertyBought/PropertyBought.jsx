import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";


const PropertyBought = () => {

     const { user } = useAuth();
     const [userPropertyBought, setUserPropertyBought] = useState([]);
    const axiosSecure = useAxiosSecure();

     const { data: propertyBought = [] } = useQuery({
       queryKey: ["propertyBought"],
       queryFn: async () => {
         try {
           const res = await axiosSecure.get("/boughtProperty");
           if (res.data) {
             const userEmail = user.email;
             const filteredData = res.data.filter(
               (item) => item.buyerEmail === userEmail
             );
             setUserPropertyBought(filteredData);
             return filteredData;
           }
           return propertyBought;
         } catch (error) {
           console.error("Error fetching data:", error);
           return propertyBought;
         }
       },
     });
     return (
       <div>
         <h2 className="text-5xl font-bold text-center">
           Your total bought Property list : {userPropertyBought.length}
         </h2>
         <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
           {userPropertyBought.map((item) => (
             <div className="card bg-base-100 shadow-xl" key={item?._id}>
               <figure>
                 <img src={item?.propertyImage} alt="" />
               </figure>
               <div className="card-body">
                 <h2 className="card-title">{item?.propertyTitle}</h2>
                 <p>Property Location : {item?.propertyLocation}</p>
                 <p>Property bought Price : ${item?.price}</p>
                 <div className="card-actions justify-start">
                   <div className="badge badge-outline">
                     Agent : {item?.agentName}
                   </div>

                   <p> Bought date : {new Date(item?.date).toDateString()}</p>
                   <p> Transaction Id : {item?.transactionId}</p>
                 </div>
               </div>
             </div>
           ))}
         </div>
       </div>
     );
};

export default PropertyBought;