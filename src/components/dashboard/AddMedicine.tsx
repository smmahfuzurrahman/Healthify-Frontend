/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getErrorData } from "@/utils/getErrorData";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Select from "react-select";
import { useState } from "react";
import CloudIcon from "../ui/CloudIcon";
import { useAddMedicineMutation } from "@/redux/api/medicine/medicineApi";
import Spinner from "../ui/Spinner";

type TOptions = {
  value: string;
  label: string;
};

const AddMedicine = () => {
  // react-form-hook
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  // days
  const options: TOptions[] = [
    { value: "saturday", label: "Saturday" },
    { value: "sunday", label: "Sunday" },
    { value: "monday", label: "Monday" },
    { value: "tuesday", label: "Tuesday" },
    { value: "wednesday", label: "Wednesday" },
    { value: "thursday", label: "Thursday" },
    { value: "friday", label: "Friday" },
  ];
  // days array
  const [days, setDays] = useState<string[]>([]);
  // image upload status
  const [imageUploadStatus, setImageUploadStatus] = useState(false);
  // api
  const [AddMedicine, { isLoading }] = useAddMedicineMutation();

  // handle form submission
  const onSubmit = async (data: any) => {
    let imgUrl = "";
    const { name, power, time } = data;
    if (data?.image && data.image[0]) {
      const formData = new FormData();
      formData.append("image", data.image[0]);
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
      imgUrl = imgBBData.data.url; // Get the image URL from ImgBB
      setImageUploadStatus(true);
    }
    const medicine = {
      name,
      power,
      time,
      days,
      imgUrl,
    };

    try {
      //   const response = await updateProfile(data);
      const response = await AddMedicine(medicine);

      if (response.data) {
        Swal.fire({
          title: "Success",
          text: "Medicine added successfully",
          icon: "success",
        });
        setDays([]);
        reset();
      } else {
        const errorData = getErrorData(response.error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text:
            errorData?.message || "An error occurred while adding the medicine",
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

  // handle multi select days
  const handleDaysChange = (selectedDays: any) => {
    const medicineTakingDays =
      selectedDays?.map((day: any) => day?.value) || [];
    setDays(medicineTakingDays);
  };
  return (
    <>
      <h1 className="text-center font-semibold text-3xl border-b-2 text-gradient mb-5">
        Add Medicine
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* image */}
        {!imageUploadStatus ? (
          <div className="flex items-center justify-center w-full mb-5">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-200 duration-300 transition-all"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <CloudIcon />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                {...register("image", { required: true })}
              />
              {errors.image && (
                <p className="text-red-500 text-sm">Image is required</p>
              )}
            </label>
          </div>
        ) : (
          <p className="text-green-500 text-center mb-5">Image uploaded!</p>
        )}
        {/* rest inputs */}
        <div className="grid grid-cols-2 gap-2">
          {/* name */}
          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input
              placeholder="Medicine Name"
              id="name"
              type="text"
              className="placeholder:text-gray-400"
              {...register("name", { required: true })}
            />
          </div>
          {/* power */}
          <div className="space-y-1">
            <Label htmlFor="power">
              Power/Mg <span className="text-gray-400">(ex. 50mg)</span>
            </Label>
            <Input
              className="placeholder:text-gray-400"
              placeholder="Medicine power (20mg)"
              id="power"
              type="text"
              {...register("power", { required: true })}
            />
          </div>
          {/* Reminder Time */}
          <div className="space-y-1">
            <Label htmlFor="time">Reminder Time</Label>
            <Input
              {...register("time", { required: true })}
              placeholder="Start Time"
              id="startTime"
              className="col-span-3"
              type="time"
            />
          </div>

          {/* Days */}
          <div className="space-y-1">
            <Label htmlFor="address">Days</Label>
            <Select
              onChange={(e) => handleDaysChange(e)}
              isMulti
              name="days"
              options={options}
              className="basic-multi-select"
              classNamePrefix="select"
              required
            />
          </div>
        </div>
        {/* buttons */}
        <div className="mt-5">
          {isLoading ? <Spinner /> : <Button>Add</Button>}
        </div>
      </form>
    </>
  );
};

export default AddMedicine;
