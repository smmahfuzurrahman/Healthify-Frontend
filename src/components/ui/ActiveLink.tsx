import { NavLink } from "react-router-dom";

const ActiveLink = ({
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
        isActive ? "text-primary-foreground font-medium" : ""
      }
    >
      {children}
    </NavLink>
  );
};

export default ActiveLink;