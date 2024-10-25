import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { ICustomJwtPayload } from "@/types";

const useDecodedToken = () => {
  const [{ token }] = useCookies(["token"]);

  if (token) {
    const decodedToken = jwtDecode<ICustomJwtPayload>(token as string);

    return decodedToken;
  } else {
    return {};
  }
};

export default useDecodedToken;
