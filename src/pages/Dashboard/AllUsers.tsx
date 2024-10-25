/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  usePromoteUserMutation,
  useUsersActivitiesQuery,
} from "@/redux/api/user/userApi";
import {
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { getErrorData } from "@/utils/getErrorData";
import Swal from "sweetalert2";

const AllUsers = () => {
  const { data: users, refetch } = useUsersActivitiesQuery("");
  const [promoteUser] = usePromoteUserMutation();

  const handlePromoteUser = async (userId: string) => {
    const response = await promoteUser(userId);

    if (response.data) {
      Swal.fire({
        title: "Success",
        text: "Profile promoted successfully",
        icon: "success",
      });
      refetch()
    } else {
      const errorData = getErrorData(response.error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          errorData?.message || "An error occurred while updating the profile",
      });
    }
  };
  return (
    <>
      <h1 className="text-center font-semibold text-3xl border-b-2 text-gradient mb-5">
        Users list
      </h1>
      <Table className="border w-full text-[13px]">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Blood Group</TableHead>
            <TableHead>Diabetes</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Profile status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.data?.users?.slice(0, 5)?.map((user: any) => (
            <TableRow key={user._id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.age}</TableCell>
              <TableCell>{user.gender}</TableCell>
              <TableCell>{user.bloodGroup}</TableCell>
              <TableCell>{user.isDiabetes ? "Yes" : "No"}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.profileCompleteStatus}%</TableCell>
              <TableCell>
                <Button
                  disabled={user?.role === "admin"}
                  onClick={() => handlePromoteUser(user?._id)}
                  size="sm"
                >
                  Promote
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default AllUsers;
