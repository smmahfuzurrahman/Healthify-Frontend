/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import ActiveLink from "./ActiveLink";
import { Button } from "./button";
import { HiMenuAlt1, HiX } from "react-icons/hi";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import useDecodedToken from "@/hook/useDecodedToken";
import { useCookies } from "react-cookie";
import { useAppSelector } from "@/redux/hook";
import { Badge } from "./badge";

const NavMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user: any = useDecodedToken();
  // @ts-ignore
  const [cookie, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();
  const { notifications } = useAppSelector((state) => state.notifications);

  // handle user logout
  const handleLogout = async () => {
    // @ts-ignore
    const removedCookie = await removeCookie("token", {
      path: "/",
    });
    navigate("/");
  };

  const items = (
    <>
      <li>
        <ActiveLink to="/">Home</ActiveLink>
      </li>

      {user?.role && (
        <>
          {user.role === "user" && (
            <>
              <li>
                <ActiveLink to="/chat">Chat</ActiveLink>
              </li>
              <li className="flex items-center gap-1">
                <ActiveLink to="/notification">Notification</ActiveLink>
                <Badge variant="outline">{notifications.length}</Badge>
              </li>
            </>
          )}
          <li>
            <ActiveLink to="/dashboard/profile">Dashboard</ActiveLink>
          </li>
        </>
      )}

      <li>
        {Object.entries(user).length ? (
          <NavLink to="/auth">
            <Button onClick={handleLogout} variant="outline">
              Logout
            </Button>
          </NavLink>
        ) : (
          <NavLink to="/auth">
            <Button variant="outline">Login</Button>
          </NavLink>
        )}
      </li>
    </>
  );

  return (
    <div>
      <div onClick={() => setIsOpen(!isOpen)} className="block md:hidden">
        <div className="transition-all duration-300 ease-in-out transform">
          {isOpen ? (
            <HiX className="rotate-180" />
          ) : (
            <HiMenuAlt1 className="rotate-0" />
          )}
        </div>
        <ul
          className={`transition-all duration-300 ease-in-out transform ${
            isOpen
              ? "opacity-100 max-h-screen p-5"
              : "opacity-0 max-h-0 overflow-hidden"
          }`}
        >
          {items}
        </ul>
      </div>
      <div>
        <ul className="hidden md:flex items-center space-x-5">{items}</ul>
      </div>
    </div>
  );
};

export default NavMenu;
