/* eslint-disable @typescript-eslint/ban-ts-comment */
import useDecodedToken from "@/hook/useDecodedToken";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const PrivateRote = ({ children }: { children: ReactNode }) => {
  const user = useDecodedToken();
  const location = useLocation();
  //   @ts-ignore
  if (user?.userId) {
    return children;
  } else {
    Swal.fire("You have to log in first to view details");
    return <Navigate state={{ from: location }} to="/auth" replace></Navigate>;
  }
};

export default PrivateRote;
