/* eslint-disable @typescript-eslint/no-explicit-any */
import Spinner from "@/components/ui/Spinner";
import useDecodedToken from "@/hook/useDecodedToken";
import {
  useAddBloodPressureMutation,
  useGetBloodPressuresQuery,
  useRemoveBloodPressureMutation,
} from "@/redux/api/BloodPressure/bloodPressureApi";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

// TypeScript interface for blood pressure data
interface BloodPressure {
  _id?: string;
  userId: string;
  systolic: number;
  diastolic: number;
  date: string;
  status: string;
}

const UserBloodPressure: React.FC = () => {
  const { data, isLoading, refetch } = useGetBloodPressuresQuery("");
  const [removeBloodPressure] = useRemoveBloodPressureMutation();
  const user: any = useDecodedToken();
  const [systolic, setSystolic] = useState<number | "">("");
  const [diastolic, setDiastolic] = useState<number | "">("");
  const [records, setRecords] = useState<BloodPressure[]>([]);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [addBloodPressure] = useAddBloodPressureMutation();

  // useEffect to set the records after loading the data
  useEffect(() => {
    if (!isLoading && data?.data.length > 0) {
      setRecords(data.data);
    }
  }, [data, isLoading]);

  // Function to determine blood pressure status and message
  const getStatus = (systolic: number, diastolic: number): string => {
    if (systolic === 120 && diastolic === 80) {
      return "Normal";
    } else if (systolic >= 119 || diastolic >= 79) {
      return "Pre-hypertension";
    } else if (systolic >= 180 || diastolic >= 110) {
      return "Hypertensive crisis";
    } else if (systolic === 80 || diastolic >= 60) {
      return "Low";
    } else {
      return "";
    }
  };

  const getSuggestion = (status: string): string => {
    if (status === "High Stage I") {
      return "Stage I high blood pressure-hypertension. Consider lifestyle changes like reducing sodium intake, managing stress, regular exercise, and consulting with a healthcare provider.";
    } else if (status === "High Stage II") {
      return "Stage II high blood pressure-hypertension. Consider lifestyle changes like reducing sodium intake, managing stress, regular exercise, and consulting with a healthcare provider.";
    } else if (status === "Pre-hypertension") {
      return "High blood pressure-hypertension. You can Exercise regularly,Stop using tobacco products,Manage your stress, and consulting with a healthcare provider.";
    } else if (status === "Hypertensive crisis") {
      return "Hypertensive crisis (emergency you should consult a doctor)";
    } else if (status === "Normal") {
      return "Your blood pressure is normal. Keep maintaining a healthy lifestyle";
    } else {
      return "Condition not good. Your blood pressure is low. You can take foods with high salt content You should consult a doctor";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (systolic !== "" && diastolic !== "") {
      const status = getStatus(Number(systolic), Number(diastolic));
      const newRecord: BloodPressure = {
        userId: user?.userId,
        systolic: Number(systolic),
        diastolic: Number(diastolic),
        date: new Date().toLocaleString(),
        status,
      };
      const response = await addBloodPressure(newRecord);
      if (response.data) {
        setRecords([...records, newRecord]);
        setStatusMessage(getSuggestion(status));
        setSystolic("");
        setDiastolic("");
        refetch();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to add blood pressure record",
        });
        setStatusMessage("Failed to add blood pressure record");
      }
    }
  };

  const handleDelete = (id: string) => {
    console.log(id);
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
        const response = await removeBloodPressure({ id });
        if (response.data) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });

          const updatedRecords = records.filter((record) => record?._id !== id);
          setRecords(updatedRecords);
        }
      }
    });
  };

  return (
    <div className="p-6 md:p-8 lg:p-10 bg-white shadow-md rounded-lg max-w-5xl mx-auto">
      <div className="w-full max-w-4xl flex flex-col md:flex-row bg-white rounded-lg shadow-lg p-6">
        {/* Blood Pressure Tracker Form */}
        <div className="w-full md:w-1/2 p-4">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Blood Pressure Tracker
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium">
                Systolic (mmHg):
              </label>
              <input
                type="number"
                value={systolic}
                onChange={(e) =>
                  setSystolic(
                    e.target.value !== "" ? Number(e.target.value) : ""
                  )
                }
                className="mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Systolic value"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium">
                Diastolic (mmHg):
              </label>
              <input
                type="number"
                value={diastolic}
                onChange={(e) =>
                  setDiastolic(
                    e.target.value !== "" ? Number(e.target.value) : ""
                  )
                }
                className="mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Diastolic value"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Add Record
            </button>
          </form>
          {/* Status message for blood pressure */}
          {statusMessage && (
            <div className="mt-4 p-3 bg-gray-50 border-l-4 border-blue-500 text-blue-800 rounded">
              {statusMessage}
            </div>
          )}
        </div>

        {/* Records Section */}
        <div className="w-full md:w-1/2 p-4 border-l border-gray-200">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Records</h3>
          <div className="h-64 overflow-y-auto bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div>{isLoading && <Spinner />}</div>
            {!isLoading && records?.length ? (
              <ul className="space-y-2">
                {records?.map((record) => (
                  <li
                    key={record?._id}
                    className="p-3 bg-white border rounded-md shadow-sm flex justify-between items-center"
                  >
                    <div>
                      <p className="text-gray-700 font-medium">
                        Systolic:
                        <span className="font-semibold">
                          {record.systolic} mmHg
                        </span>
                        <br />
                        Diastolic:
                        <span className="font-semibold">
                          {record.diastolic} mmHg
                        </span>
                      </p>
                      <p className="text-gray-600 text-sm mt-1">
                        Status:
                        <span
                          className={
                            record.status === "High Stage I"
                              ? "text-red-200"
                              : record.status === "High Stage II"
                              ? "text-red-300"
                              : record.status === "Pre-hypertension"
                              ? "text-red-400"
                              : record.status === "Hypertensive crisis"
                              ? "text-red-500"
                              : record.status === "Low"
                              ? "text-yellow-500"
                              : record.status === "Normal"
                              ? "text-green-500"
                              : "text-black-500"
                          }
                        >
                          {record.status}
                        </span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Recorded on {record.date}
                      </p>
                    </div>

                    <button
                      onClick={() => handleDelete(record?._id as string)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium ml-4"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p
                className={`text-gray-600 text-center ${isLoading && "hidden"}`}
              >
                No records added yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBloodPressure;
