/* eslint-disable @typescript-eslint/no-explicit-any */
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
import Spinner from "../ui/Spinner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import CloudIcon from "../ui/CloudIcon";
import { getErrorData } from "@/utils/getErrorData";
import Swal from "sweetalert2";
import {
  useAddReportMutation,
  useGetReportsQuery,
} from "@/redux/api/report/reportApi";
import useDecodedToken from "@/hook/useDecodedToken";

const PatientReportComponent = () => {
  const user: any = useDecodedToken();
  const [addReport, { isLoading }] = useAddReportMutation();
  const { refetch } = useGetReportsQuery("");
  // react-form-hook
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [imagePreview, setImagePreview] = useState<any>(); // Store image preview URL
  const [selectedImage, setSelectedImage] = useState<any>(); // Store image preview URL

  // handle dialog box open
  const [open, setOpen] = useState(false);
  // handle image selection and preview
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file)); // Generate preview URL
      setSelectedImage(file);
    }
  };

  // handle form submission
  const onSubmit = async (data: any) => {
    let prescriptionImg = "";
    let reportImg = "";

    const {
      doctorName,
      doctorNumber,
      symptom,
      appointment,
      reportImg: reportImageFile,
    } = data;

    // Upload prescription image if it exists
    if (selectedImage) {
      const formData = new FormData();
      formData.append("image", selectedImage);
      const img_hosting_token = import.meta.env.VITE_Image_Upload_token;
      const imgBBResponse = await fetch(
        `https://api.imgbb.com/1/upload?key=${img_hosting_token}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!imgBBResponse.ok) {
        throw new Error("Image upload failed");
      }

      const imgBBData = await imgBBResponse.json();
      prescriptionImg = imgBBData.data.url; // Get the image URL from ImgBB
    }

    // Upload report image if it exists
    if (reportImageFile && reportImageFile[0]) {
      const formData = new FormData();
      formData.append("image", reportImageFile[0]);
      const img_hosting_token = import.meta.env.VITE_Image_Upload_token;
      const imgBBResponse = await fetch(
        `https://api.imgbb.com/1/upload?key=${img_hosting_token}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!imgBBResponse.ok) {
        throw new Error("Report image upload failed");
      }

      const imgBBData = await imgBBResponse.json();
      reportImg = imgBBData.data.url; // Get the image URL from ImgBB
    }

    const report = {
      userId: user?.userId,
      prescriptionImg,
      reportImg, // Add report image URL
      doctorName,
      doctorNumber,
      symptom,
      appointment,
    };

    try {
      const response = await addReport(report);
      if (response.data) {
        setOpen(false);
        Swal.fire({
          title: "Success",
          text: "Report added successfully",
          icon: "success",
        });

        // Clearing the form
        reset();

        setSelectedImage(null);
        setImagePreview(null);
        refetch();
      } else {
        const errorData = getErrorData(response.error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text:
            errorData?.message || "An error occurred while adding the report",
          customClass: {
            popup: "custom-popup",
          },
        });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Something went wrong, try again!";
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Add Medical Report</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Report</DialogTitle>
          <DialogDescription className="text-gray-500">
            fill up the fields and store your medical history
          </DialogDescription>
        </DialogHeader>
        <form>
          {/* Image Upload */}
          <div className="flex items-center justify-center w-full mb-5">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-200 duration-300 transition-all"
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Selected" className="h-32 mb-3" />
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <CloudIcon />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">
                      Click to upload Prescription
                    </span>{" "}
                    or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
              )}
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                required
                onChange={handleImageChange} // Call the handler for image change
              />
            </label>
            {errors.image && (
              <p className="text-red-500 text-sm">Image is required</p>
            )}
          </div>

          {/* rest inputs */}
          <div className="grid grid-cols-2 gap-2">
            {/* Doctor name */}
            <div className="space-y-1">
              <Label htmlFor="name">Doctor Name</Label>
              <Input
                placeholder="Doctor Name"
                id="name"
                type="text"
                className="placeholder:text-gray-400"
                {...register("doctorName", { required: true })}
              />
            </div>
            {/* Doctor Phone Number */}
            <div className="space-y-1">
              <Label htmlFor="doctorNumber">Doctor Phone Number</Label>
              <div className="flex items-center gap-2">
                <Input
                  className="placeholder:text-gray-400"
                  placeholder="Doctor Phone Number"
                  id="doctorNumber"
                  type="number"
                  {...register("doctorNumber", { required: true })}
                />
              </div>
            </div>
            {/* Patient Symptom */}
            <div className="space-y-1">
              <Label htmlFor="symptom">Patient Symptom</Label>
              <div className="flex items-center gap-2">
                <Input
                  className="placeholder:text-gray-400"
                  placeholder="Patient Symptom"
                  id="symptom"
                  type="text"
                  {...register("symptom", { required: true })}
                />
              </div>
            </div>
            {/* Appointment Date*/}
            <div className="space-y-1">
              <Label htmlFor="date">Appointment Date</Label>
              <Input
                {...register("appointment", { required: true })}
                placeholder="Appointment Date"
                id="date"
                className="col-span-3"
                type="date"
              />
            </div>
            {/* Doctor Advise */}
            <div className="space-y-1 col-span-2 mb-2">
              <Label htmlFor="advise">Doctor Advise(Reports)</Label>
              <div className="flex items-center gap-2">
                <Input
                  className="placeholder:text-gray-400"
                  placeholder="Doctor Advise"
                  id="advise"
                  type="file"
                  {...register("reportImg", { required: true })}
                />
              </div>
            </div>
          </div>
        </form>
        <DialogFooter>
          {isLoading ? (
            <Spinner />
          ) : (
            <Button onClick={handleSubmit(onSubmit)}>Add Details</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PatientReportComponent;
