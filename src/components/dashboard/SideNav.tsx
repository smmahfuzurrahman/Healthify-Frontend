/* eslint-disable @typescript-eslint/no-explicit-any */
import useDecodedToken from "@/hook/useDecodedToken";
import SideActiveLink from "./SideActiveLink";

const SideNav = () => {
  const user: any = useDecodedToken();

  const userNavItem = (
    <>
      <li>
        <SideActiveLink to="/dashboard/profile">Profile</SideActiveLink>
      </li>
      <li>
        <SideActiveLink to="/dashboard/add-medicine">
          Add Medicine
        </SideActiveLink>
      </li>
      <li>
        <SideActiveLink to="/dashboard/medicines">Medicines</SideActiveLink>
      </li>
      <li>
        <SideActiveLink to="/dashboard/report">Patient Report</SideActiveLink>
      </li>
    </>
  );
  const adminNavItem = (
    <>
      <li>
        <SideActiveLink to="/dashboard/profile">Profile</SideActiveLink>
      </li>
      <li>
        <SideActiveLink to="/dashboard/users">Users</SideActiveLink>
      </li>
      <li>
        <SideActiveLink to="/dashboard/user-activities">
          User Activities
        </SideActiveLink>
      </li>
    </>
  );

  return (
    <div className="p-5 rounded-md h-full">
      <ul className="space-y-5">
        {user.role === "user" ? userNavItem : adminNavItem}
      </ul>
    </div>
  );
};

export default SideNav;
