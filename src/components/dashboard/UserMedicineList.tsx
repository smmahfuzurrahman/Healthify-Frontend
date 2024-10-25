/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useGetUserMedicinesQuery,
  useRemoveMedicineMutation,
} from "@/redux/api/medicine/medicineApi";
import { convertHourTime } from "@/utils/convertHourTime";
import { Button } from "../ui/button";
import Swal from "sweetalert2";
const UserMedicineList = () => {
  const { data, isLoading, refetch } = useGetUserMedicinesQuery("");
  const [deleteMedicine] = useRemoveMedicineMutation();

  const handleDeleteMedicine = async (id: string) => {
    const response = await deleteMedicine({ id });
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (response.data) {
          Swal.fire({
            title: "Deleted!",
            text: "Your medicine has been deleted.",
            icon: "success",
          });
          refetch();
        } else {
          Swal.fire({
            title: "Error",
            text: "Failed to delete medicine",
            icon: "error",
          });
        }
      }
    });
  };
  return (
    <>
      <h1 className="text-center font-semibold text-3xl border-b-2 text-gradient mb-5">
        A list of your Medicines.
      </h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Power</TableHead>
            <TableHead className="text-center">Taking Time</TableHead>
            <TableHead className="text-center">Days</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!isLoading &&
            data?.data.map((medicine: any) => (
              <TableRow key={medicine._id}>
                <TableCell>
                  <div className="font-medium w-[100px] h-[100px]">
                    <img
                      src={medicine.imgUrl}
                      alt={medicine.name}
                      className="object-fill w-full h-full rounded-lg"
                    />
                  </div>
                </TableCell>
                <TableCell>{medicine.name}</TableCell>
                <TableCell>{medicine.power}</TableCell>
                <TableCell className="text-center">
                  {convertHourTime(medicine.time)}
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {medicine.days.map((day: string, index: number) => (
                      <p
                        key={index}
                        className="text-sm p-2 bg-blue-50 text-gray-600 rounded-lg"
                      >
                        {day}
                      </p>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    onClick={() => handleDeleteMedicine(medicine._id)}
                    size="sm"
                    className="bg-red-500 hover:border-red-500 hover:text-red-500"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
};

export default UserMedicineList;
