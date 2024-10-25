import { Outlet } from "react-router-dom";
import Container from "../ui/Container";
import SideNav from "../dashboard/SideNav";

import Navbar from "../ui/Navbar";

const DashboardLayout = () => {
  return (
    <Container>
      <Navbar />
      <div className="grid grid-cols-5">
        <div>
          <SideNav />
        </div>
        <div className="col-span-4">
          <Outlet />
        </div>
      </div>
    </Container>
  );
};

export default DashboardLayout;
