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
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { FaUser, FaFemale, FaMale } from "react-icons/fa"; // React Icons

const Profile = () => {
  const [, setCookie] = useCookies();
  // get profile info from db
  const { data, isLoading,  } = useGetUserProfileQuery("");
  const [updateProfile] = useUpdateUserProfileMutation();

  // react-form-hook
  const { register, handleSubmit } = useForm();
  const [toggle, setToggle] = useState(true);

  // State variables
  const [gender, setGender] = useState("");
  const [isPregnant, setIsPregnant] = useState("");
  const [isDiabetes, setIsDiabetes] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [profileStatus, setProfileStatus] = useState<number>(0);
  
  // Set initial state values when data is fetched
  useEffect(() => {
    if (data) {
      setGender(data.data.gender || "");
      setIsPregnant(data.data.isPregnant || "");
      setIsDiabetes(data.data.isDiabetes || "");
      setBloodGroup(data.data.bloodGroup || "");
      setProfileStatus(data.data.profileCompleteStatus || 0);
    }
  }, [data]);

  const onSubmit = async (data: any) => {
    const updatedProfileInfo = {
      gender,
      isDiabetes: isDiabetes.toLowerCase() === "yes",
      ...(gender === "female" && {
        isPregnant: isPregnant.toLowerCase() === "yes",
      }),
      bloodGroup,
      ...data,
    };
    try {
      const response = await updateProfile(updatedProfileInfo);

      if (response.data) {
        Swal.fire({
          title: "Success",
          text: "Profile updated successfully",
          icon: "success",
        });
        setToggle(!toggle); // Toggle state
        setProfileStatus(response?.data?.data?.updatedUser?.profileCompleteStatus);
        const token = response?.data?.data?.token as string;
        setCookie("token", token);
      } else {
        const errorData = getErrorData(response.error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: errorData?.message || "An error occurred while updating the profile",
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

  // Function to render the avatar based on gender
  const renderAvatar = () => {
    if (gender === "female") {
      return <FaFemale size={60} className="text-pink-500" />;
    } else if (gender === "male") {
      return <FaMale size={60} className="text-blue-500" />;
    }
    return <FaUser size={60} className="text-gray-500" />;
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
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
          {/* Avatar Section */}
          <div className="flex justify-center mb-5">
            <div className="w-24 h-24 rounded-full border-2 border-gray-300 flex items-center justify-center">
              {renderAvatar()}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
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

            {/* Email */}
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

            {/* Phone */}
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

            {/* Age */}
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

            {/* Blood Group */}
            <div className="space-y-1">
              <Label htmlFor="blood">Blood Group</Label>
              {toggle ? (
                <Input
                  defaultValue={data?.data.bloodGroup}
                  readOnly={true}
                  type="text"
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
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            </div>

            {/* Diabetes */}
            <div className="space-y-1">
              <Label htmlFor="isDiabetes">Diabetes</Label>
              {toggle ? (
                <Input
                  defaultValue={data?.data.isDiabetes ? "Yes" : "No"}
                  readOnly={true}
                  type="text"
                />
              ) : (
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
              )}
            </div>

            {/* Gender */}
            <div className="space-y-1">
              <Label htmlFor="gender">Gender</Label>
              {toggle ? (
                <Input
                  defaultValue={data?.data.gender}
                  readOnly={true}
                  type="text"
                />
              ) : (
                <Select
                  defaultValue={data?.data.gender}
                  onValueChange={(value) => setGender(value)}
                >
                  <SelectTrigger>
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
              )}
            </div>

            {/* Pregnancy Status (Only show if gender is female) */}
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
            
            {/* Address */}
            <div className="space-y-1">
              <Label htmlFor="address">Address</Label>
              <Input
                defaultValue={data?.data.address}
                readOnly={toggle}
                placeholder="Your Address"
                id="address"
                type="text"
                {...register("address", { required: true })}
              />
            </div>
          </div>

          {/* Buttons */}
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
