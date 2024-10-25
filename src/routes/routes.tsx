import AddMedicine from "@/components/dashboard/AddMedicine";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import MainLayout from "@/components/layouts/MainLayout";
import Auth from "@/pages/Auth/Auth";
import Chat from "@/pages/Chat/Chat";
import Profile from "@/pages/Dashboard/Profile";
import UserActivities from "@/pages/Dashboard/UserActivities";
import UserMedicine from "@/pages/Dashboard/UserMedicine";
import Home from "@/pages/Home/Home";
import { createBrowserRouter } from "react-router-dom";
import PrivateRote from "./PrivateRote";
import AdminRoute from "./AdminRoute";
import Notification from "@/pages/Notification/Notification";
import AllUsers from "@/pages/Dashboard/AllUsers";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/notification",
        element: <Notification />,
      },
      {
        path: "/chat",
        element: (
          <PrivateRote>
            <Chat />
          </PrivateRote>
        ),
      },
      {
        path: "/chat/:id",
        element: (
          <PrivateRote>
            <Chat />
          </PrivateRote>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRote>
        <DashboardLayout />
      </PrivateRote>
    ),
    children: [
      {
        path: "/dashboard/profile",
        element: <Profile />,
      },
      {
        path: "/dashboard/add-medicine",
        element: <AddMedicine />,
      },
      {
        path: "/dashboard/medicines",
        element: <UserMedicine />,
      },
      {
        path: "/dashboard/user-activities",
        element: (
          <AdminRoute>
            <UserActivities />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/users",
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },
    ],
  },
]);
