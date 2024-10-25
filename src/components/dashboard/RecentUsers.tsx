/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUsersActivitiesQuery } from "@/redux/api/user/userApi";
import {
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const RecentUsers = () => {
  const { data: users } = useUsersActivitiesQuery("");

  return (
    <>
      <Table className="border w-full text-[13px]">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Profile status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.data?.users?.slice(0, 5)?.map((user: any) => (
            <TableRow key={user._id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.age}</TableCell>
              <TableCell>{user.profileCompleteStatus}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default RecentUsers;
