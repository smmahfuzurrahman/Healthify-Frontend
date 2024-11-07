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

  const [imagePreview, setImagePreview] = useState<any>(); // Store image preview URL
  const [selectedImage, setSelectedImage] = useState<any>(); // Store image preview URL

  // api
  const [AddMedicine, { isLoading }] = useAddMedicineMutation();

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
    let imgUrl = "";

    const { name, power, time } = data;
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

      imgUrl = imgBBData.data.url; // Get the image URL from ImgBB
    }
    const medicine = {
      name,
      power: `${power}mg`,
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
        // clearing the form
        setDays([]);
        reset();
        setSelectedImage(null);
        setImagePreview(null);
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
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-8">
      <h1 className="text-center font-semibold text-3xl border-b-2 text-gradient mb-5">
        Add Medicine
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Image Upload */}
        <div className="flex flex-col items-center mb-6">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-60 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-200 transition-all duration-200"
          >
            {imagePreview ? (
              <img src={imagePreview} alt="Selected" className="h-40 w-auto mb-3 object-cover" />
            ) : (
              <div className="flex flex-col items-center pt-5 pb-6">
                <CloudIcon />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500">
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
            {errors.image && (
              <p className="text-red-500 text-sm">Image is required</p>
            )}
          </label>
        </div>

        {/* rest inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* name */}
          <div className="space-y-2">
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
          <div className="space-y-2">
            <Label htmlFor="power">
              Power/Mg <span className="text-gray-400">(ex. 50mg)</span>
            </Label>
            <div className="flex items-center gap-2">
              <Input
                className="placeholder:text-gray-400"
                placeholder="Medicine power (20mg)"
                id="power"
                type="number"
                {...register("power", { required: true })}
              />
              <p>Mg</p>
            </div>
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
        <div className="text-center mt-6">
          {isLoading ? <Spinner /> :
            <Button className="w-full md:w-auto px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
              Add Medicine
            </Button>}
        </div>
      </form>
    </div>
  );
};

export default AddMedicine;
