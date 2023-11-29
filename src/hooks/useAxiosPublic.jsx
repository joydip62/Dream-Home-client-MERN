import axios from "axios";

const axiosPublic = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: "https://b8a12-server-side-joydip62.vercel.app",
});
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;