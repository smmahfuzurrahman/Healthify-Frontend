import { NavLink } from "react-router-dom";

const SideActiveLink = ({
  children,
  to,
}: {
  children: React.ReactNode;
  to: string;
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? "bg-primary px-5 py-2 text-white font-medium rounded-md shadow-2xl hover:bg-transparent hover:text-primary border border-primary transition-all duration-300" : ""
      }
    >
      {children}
    </NavLink>
  );
};

export default SideActiveLink;