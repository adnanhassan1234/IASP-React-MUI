import { Navigate } from "react-router-dom";
const Protected = ({ children }: any) => {
  if (!localStorage.getItem("authToken")) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
export default Protected;
