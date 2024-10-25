/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldErrors, FieldValues, useForm } from "react-hook-form";

import Spinner from "../ui/Spinner";
import Swal from "sweetalert2";
import { getErrorData } from "@/utils/getErrorData";
import { useSignUpMutation } from "@/redux/api/auth/authApi";
const SignUp = ({ setActiveTab } : {setActiveTab: any} ) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const typedErrors = errors as FieldErrors<FieldValues>;
  // redux signup mutation
  const [signup, { isLoading }] = useSignUpMutation();


 const onSubmit = async (data: any) => {
console.log(data);
  try {
    const response = await signup(data);

    if (response.data) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: response.data.message || "Signup successful!",
      });
      setActiveTab("login"); // Switch to the login tab
    } else {
      // Use getErrorData to extract detailed error information
      const errorData = getErrorData(response.error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorData?.message || "Sign up failed. Please try again.",
      });
      reset(); // Reset form fields
    }
  } catch (error) {
    console.error("Error during signup:", error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "An unexpected error occurred. Please try again.",
    });
  }
};
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Sign-up</CardTitle>
          <CardDescription className="text-black">
            Create an account to start exploring and enjoying the freedom of
            eco-friendly rides.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input
              placeholder="Your Name"
              id="name"
              type="text"
              {...register("name", { required: true })}
            />
            {typedErrors.name && (
              <p className="text-red-500 text-sm">Name is Required</p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              placeholder="Your Email"
              id="email"
              type="email"
              {...register("email", { required: true })}
            />
            {typedErrors.email && (
              <p className="text-red-500 text-sm">Email is Required</p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              placeholder="Your password"
              id="password"
              type="password"
              {...register("password", {
                required: true,
                minLength: 8,
                maxLength: 16,
              })}
            />
            {typedErrors.password && (
              <p className="text-red-500 text-sm">
                Password must be at least 8 characters and not more than 16
                characters
              </p>
            )}
          </div>
        
       
          <p className="text-red-500 text-sm">{}</p>
        </CardContent>
        <CardFooter>
          {isLoading ? (
            <Spinner />
          ) : (
            <Button onClick={handleSubmit(onSubmit)}>Sign-up</Button>
          )}
        </CardFooter>
      </Card>
    </>
  );
};

export default SignUp;