import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const AllUser = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
    // delete user
    const handleDeleteUser = (item) => {
        
    }
  return (
    <div>
      <h2 className="text-5xl text-center mb-5">All Users {users.length}</h2>
      <div className="overflow-x-auto w-full">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={item?.photoURL}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item?.name}</div>
                      <div className="text-sm opacity-50">{item?.email}</div>
                    </div>
                  </div>
                </td>
                <td>{item?.role}</td>
                <th>
                  <Link>
                    <button className="btn btn-info btn-sm">
                      <FaEdit />
                    </button>
                  </Link>
                  <button
                    className="btn btn-error btn-sm ml-5"
                    onClick={() => handleDeleteUser(item)}
                  >
                    <FaTrash />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default AllUser;
