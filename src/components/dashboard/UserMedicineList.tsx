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
        const response = await deleteMedicine({ id });
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
    <div className="p-6 md:p-8 lg:p-10 bg-white shadow-md rounded-lg max-w-5xl mx-auto">
      <h1 className="text-center font-semibold text-3xl md:text-4xl text-gradient mb-8">
        Your Medicine List
      </h1>
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="loader"></div> {/* Loader CSS added below */}
        </div>
      ) : (
        <Table className="w-full">
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
            {data?.data.length ? (
              data.data.map((medicine: any) => (
                <TableRow key={medicine._id}>
                  <TableCell>
                    <div className="w-20 h-20 md:w-24 md:h-24">
                      <img
                        src={medicine.imgUrl}
                        alt={medicine.name}
                        className="object-cover w-full h-full rounded-md"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-gray-700">{medicine.name}</TableCell>
                  <TableCell className="text-gray-600">{medicine.power}</TableCell>
                  <TableCell className="text-center text-gray-600">
                    {convertHourTime(medicine.time)}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      {medicine.days.map((day: string, index: number) => (
                        <span
                          key={index}
                          className="text-sm p-2 bg-blue-100 text-blue-600 rounded-full"
                        >
                          {day}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      onClick={() => handleDeleteMedicine(medicine._id)}
                      size="sm"
                      className="bg-red-500 text-white hover:bg-red-600 transition duration-200 ease-in-out"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-500">
                  No medicines found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default UserMedicineList;
