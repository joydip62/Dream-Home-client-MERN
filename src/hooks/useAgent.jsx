import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";



const useAgent = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: isAgent, isPending: isAgentLoading } = useQuery({
      queryKey: [user?.email, "isAgent"],
      queryFn: async () => {
        const res = await axiosSecure.get(`/users/role/${user.email}`);
        return res.data?.agent;
      },
    });
    return [isAgent, isAgentLoading];
};

export default useAgent;