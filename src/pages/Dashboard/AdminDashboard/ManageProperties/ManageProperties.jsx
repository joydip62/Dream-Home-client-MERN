import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const ManageProperties = () => {
      const { user } = useAuth();
      const axiosSecure = useAxiosSecure();
      const { data: properties = [], refetch } = useQuery({
        queryKey: ["properties"],
        queryFn: async () => {
          const res = await axiosSecure.get("/properties");
        return res.data;
        },
      });
    return (
      <div>
        <h2 className="text-5xl text-center mb-5">
          All Properties {properties.length}
        </h2>
        <div className="overflow-x-auto w-full">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Title</th>
                <th>Location</th>
                <th>Price</th>
                <th>Agent Name</th>
                <th>Agent Email</th>
                <th>Action</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {properties.map((item, index) => (
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={item?.propertyImage} alt="Property image" />
                        </div>
                      </div>
                      <div className="font-bold">{item?.propertyTitle}</div>
                    </div>
                  </td>
                  <td>{item?.propertyLocation}</td>
                  <td>{item?.propertyPrice}</td>
                  <td>{item?.agentName}</td>
                  <td>{item?.agentEmail}</td>
                  <th>
                    {item?.status === "verified" ? (
                      <p className="ml-5">Verified</p>
                    ) : (
                      <button className="btn btn-info btn-sm ml-5">
                        Verify
                      </button>
                    )}
                  </th>
                  <th>
                    {item?.status === "rejected" ? (
                      <p className="ml-5">Rejected</p>
                    ) : (
                      <button className="btn btn-error btn-sm ml-5">
                        Reject
                      </button>
                    )}
                  </th>
                </tr>
              ))}
            </tbody>
            {/* foot */}
            <tfoot>
              <tr>
                <th></th>
                <th>Title</th>
                <th>Location</th>
                <th>Price</th>
                <th>Agent Name</th>
                <th>Agent Email</th>
                <th>Action</th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    );
};

export default ManageProperties;