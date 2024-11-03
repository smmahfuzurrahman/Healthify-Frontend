import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import img from "@/assets/med.png";

const ReportDetailsModal = ({ id }: { id: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="p-2 shadow-sm rounded-md cursor-pointer">Report Title</p>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Your previous medical History</DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* prescription image */}
          <div className="flex flex-col items-start gap-4">
            <Label htmlFor="name" className="text-right">
              Prescription Image
            </Label>
            <div className="w-[200px] mx-auto">
              <img src={img} alt="" />
            </div>
          </div>
          {/* doctor name */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Doctor Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
              readOnly
            />
          </div>
          {/* doctor number */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="doctorNumber" className="text-right">
              Doctor Number
            </Label>
            <Input
              id="doctorNumber"
              defaultValue="+8801800000"
              className="col-span-3"
              readOnly
            />
          </div>
          {/* symptom */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="symptom" className="text-right">
              Patient Symptom
            </Label>
            <Input
              id="symptom"
              defaultValue="Fever"
              className="col-span-3"
              readOnly
            />
          </div>
          {/* appointment date */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Appointment Date
            </Label>
            <Input
              id="date"
              defaultValue="20-10-2024"
              className="col-span-3"
              readOnly
            />
          </div>
          {/* Doctor Advise */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="advise" className="text-right">
              Doctor Advise
            </Label>
            <Input
              id="advise"
              defaultValue="take rest"
              className="col-span-3"
            />
          </div>
        
        </div>
        {/* <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
};

export default ReportDetailsModal;
