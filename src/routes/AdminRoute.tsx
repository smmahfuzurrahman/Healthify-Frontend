/* eslint-disable @typescript-eslint/ban-ts-comment */
import useDecodedToken from "@/hook/useDecodedToken";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const AdminRoute = ({ children }: { children: ReactNode }) => {
  const user = useDecodedToken();
  const location = useLocation();
  //   @ts-ignore
  if (user?.role === "admin") {
    return children;
  } else {
    Swal.fire("You don't have access to this route");
    return <Navigate state={{ from: location }} to="/" replace></Navigate>;
  }
};

export default AdminRoute;
