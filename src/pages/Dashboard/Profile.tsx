/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from "@/redux/api/user/userApi";
import { getErrorData } from "@/utils/getErrorData";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const Profile = () => {
  // get profile info from db
  const { data, isLoading } = useGetUserProfileQuery("");
  const [updateProfile] = useUpdateUserProfileMutation();

  // react-form-hook
  const { register, handleSubmit } = useForm();
  const [toggle, setToggle] = useState(true);
  const [gender, setGender] = useState(data?.data.gender || "");
  const [isPregnant, setIsPregnant] = useState(data?.data.isPregnant || "");
  const [isDiabetes, setIsDiabetes] = useState(data?.data.isDiabetes || "");
  const [bloodGroup, setBloodGroup] = useState(data?.data.bloodGroup || "");
  const [profileStatus, setProfileStatus] = useState<number>(
    data?.data.profileCompleteStatus
  );

  const onSubmit = async (data: any) => {
    const updatedProfileInfo = {
      gender,

      isDiabetes: isDiabetes.toLowerCase() === "yes",
      isPregnant: isPregnant.toLowerCase() === "yes",
      bloodGroup,
      ...data,
    };

    try {
      //   const response = await updateProfile(data);
      const response = await updateProfile(updatedProfileInfo);

      if (response.data) {
        Swal.fire({
          title: "Success",
          text: "Profile updated successfully",
          icon: "success",
        });
        setToggle(!toggle); // Toggle state
        console.log(response?.data?.data?.profileCompleteStatus);
        setProfileStatus(response?.data?.data?.profileCompleteStatus);
      } else {
        const errorData = getErrorData(response.error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text:
            errorData?.message ||
            "An error occurred while updating the profile",
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
    <div>
      {/* profile completion */}
      <div className="mb-5">
        <p className="text-sm font-semibold text-end">
          {profileStatus || data?.data.profileCompleteStatus}%
        </p>
        <Progress
          value={profileStatus || data?.data.profileCompleteStatus}
          className="w-full bg-blue-100"
        />
      </div>
      {/* profile details */}
      <h1 className="text-center font-semibold text-3xl border-b-2 text-gradient mb-5">
        Profile
      </h1>
      {!isLoading && data && (
        <>
          <div className="grid grid-cols-2 gap-2">
            {/* name */}
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input
                readOnly={toggle}
                defaultValue={data?.data.name}
                placeholder="Your Name"
                id="name"
                type="text"
                {...register("name", { required: true })}
              />
            </div>
            {/* email */}
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                defaultValue={data?.data.email}
                readOnly={toggle}
                placeholder="Your Email"
                id="email"
                type="email"
                {...register("email", { required: true })}
              />
            </div>
            {/* phone */}
            <div className="space-y-1">
              <Label htmlFor="phone">Phone No.</Label>
              <Input
                defaultValue={data?.data.phone}
                readOnly={toggle}
                placeholder="Your Phone No."
                id="phone"
                type="number"
                {...register("phone", { required: true })}
              />
            </div>
            {/* age */}
            <div className="space-y-1">
              <Label htmlFor="age">Age</Label>
              <Input
                defaultValue={data?.data.age}
                readOnly={toggle}
                placeholder="Your Age"
                id="age"
                type="number"
                {...register("age", { required: true })}
              />
            </div>
            {/* blood */}
            <div className="space-y-1">
              <Label htmlFor="blood">Blood Group</Label>
              {toggle ? (
                <Input
                  defaultValue={data?.data.bloodGroup}
                  readOnly={toggle}
                  placeholder="Your Blood Group"
                  id="blood"
                  type="text"
                  {...register("bloodGroup", { required: true })}
                />
              ) : (
                <Select onValueChange={(value) => setBloodGroup(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Blood Group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Blood Group</SelectLabel>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+"> B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">B-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            </div>
            {/* diabetic */}
            <div className="space-y-1">
              <Label htmlFor="isDiabetes">Diabetes</Label>

              <Select onValueChange={(value) => setIsDiabetes(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Diabetes Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Diabetes</SelectLabel>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {/* gender */}

            <div className="space-y-1">
              <Label htmlFor="age">Gender</Label>
              <Select
                defaultValue={data?.data.gender}
                onValueChange={(value) => setGender(value)}
              >
                <SelectTrigger className="">
                  <SelectValue placeholder="Select your gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Gender</SelectLabel>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Pregnancy status (only show if gender is female) */}
            {gender === "female" && (
              <div className="space-y-1">
                <Label htmlFor="isPregnant">Pregnancy</Label>
                <Select onValueChange={(value) => setIsPregnant(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select pregnancy status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Pregnancy</SelectLabel>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}
            {/* address */}
            <div className="space-y-1">
              <Label htmlFor="address">Address</Label>
              <Input
                defaultValue={data?.data.address}
                readOnly={toggle}
                placeholder="Your Address"
                id="address"
                type="text"
                {...register("address", { required: true, maxLength: 11 })}
              />
            </div>
          </div>
          {/* buttons */}
          <div className="flex gap-2 mt-5">
            {toggle ? (
              <Button onClick={() => setToggle(!toggle)}>Edit</Button>
            ) : (
              <Button onClick={handleSubmit(onSubmit)} type="submit">
                Update
              </Button>
            )}
            {!toggle && (
              <Button variant="outline" onClick={() => setToggle(true)}>
                Cancel
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
