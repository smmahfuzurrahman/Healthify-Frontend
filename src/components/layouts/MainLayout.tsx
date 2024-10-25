
import { Outlet } from "react-router-dom";
import Container from "../ui/Container";
import Navbar from "../ui/Navbar";
import Footer from "../ui/Footer";

const MainLayout = () => {
  return (
    <>
      <Container>
        <Navbar/>
        <Outlet />
        <Footer/>
      </Container>
    </>
  );
};

export default MainLayout;
