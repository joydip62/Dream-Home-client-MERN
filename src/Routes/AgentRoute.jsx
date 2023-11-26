import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAgent from "../hooks/useAgent";


const AgentRoute = ({children}) => {
  const [isAgent, isAgentLoading] = useAgent();
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading || isAgentLoading) {
    return (
      <span className="loading loading-infinity w-1/4 block mx-auto"></span>
    );
  }
  if (user && isAgent) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default AgentRoute;
