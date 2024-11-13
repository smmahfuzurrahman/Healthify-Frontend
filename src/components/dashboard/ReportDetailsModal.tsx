/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { stringToTime } from "@/utils/stringToTime";
import { Button } from "../ui/button";

const ReportDetailsModal = ({ report }: any) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="p-3 shadow-md rounded-lg cursor-pointer text-sm font-semibold bg-blue-500 text-white hover:bg-blue-600 transition-colors">
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent className="p-6 max-w-md">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-xl font-semibold">Your Medical History</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-2">
          {/* Prescription Image */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="prescriptionImg" className="text-gray-700 font-medium">
              Prescription Image
            </Label>
            <div className="w-[200px] h-[200px] border rounded-lg overflow-hidden shadow-sm mx-auto">
              <img
                src={report?.prescriptionImg}
                alt="Prescription"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Doctor Name */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="doctorName" className="col-span-1 text-gray-700 font-medium">
              Doctor Name
            </Label>
            <Input
              id="doctorName"
              defaultValue={report?.doctorName}
              className="col-span-3"
              readOnly
            />
          </div>

          {/* Doctor Phone Number */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="doctorNumber" className="col-span-1 text-gray-700 font-medium">
              Phone Number
            </Label>
            <Input
              id="doctorNumber"
              defaultValue={report?.doctorNumber}
              className="col-span-3"
              readOnly
            />
          </div>

          {/* Symptom */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="symptom" className="col-span-1 text-gray-700 font-medium">
              Symptom
            </Label>
            <Input
              id="symptom"
              defaultValue={report?.symptom}
              className="col-span-3"
              readOnly
            />
          </div>

          {/* Appointment Date */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="col-span-1 text-gray-700 font-medium">
              Appointment Date
            </Label>
            <Input
              id="date"
              defaultValue={stringToTime(report?.appointment)}
              className="col-span-3"
              readOnly
            />
          </div>

          {/* Report Image */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="reportImg" className="text-gray-700 font-medium">
              Report Image
            </Label>
            <div className="w-[200px] h-[200px] border rounded-lg overflow-hidden shadow-sm mx-auto">
              <img
                src={report?.reportImg}
                alt="Report"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReportDetailsModal;
