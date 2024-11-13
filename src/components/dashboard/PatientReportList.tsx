/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetReportsQuery, useRemoveReportMutation } from "@/redux/api/report/reportApi";
import ReportDetailsModal from "./ReportDetailsModal";
import Spinner from "../ui/Spinner";
import { stringToTime } from "@/utils/stringToTime";
import { Button } from "../ui/button";
import Swal from "sweetalert2";
// import { useRemoveBloodPressureMutation } from "@/redux/api/BloodPressure/bloodPressureApi";
const PatientReportList = () => {
  const { data, isLoading, refetch } = useGetReportsQuery("");
  const [removeReport] = useRemoveReportMutation();

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
        const response = await removeReport({ id });
        console.log(response);
        if (response.data) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          refetch();
        }
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full p-4">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="p-4">
      {data?.data.length ? (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {data?.data.map((report: any) => (
            <div
              key={report?._id}
              className="p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Report</h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <strong>Appointment Date:</strong> {stringToTime(report.appointment)}
                </li>
                <li>
                  <strong>Doctor:</strong> {report.doctorName}
                </li>
              </ul>
              <div>
                <ReportDetailsModal report={report} />

                <Button onClick={() => handleDelete(report?._id)} className="ml-5 bg-red-500">
                  Delete Report
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center text-center mt-8">
          <p className="text-gray-500 text-lg">No Medical Details Added Yet</p>
        </div>
      )}
    </div>
  );
};

export default PatientReportList;
