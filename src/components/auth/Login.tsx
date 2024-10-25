/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
import Swal from "sweetalert2";
import { useLoginMutation } from "@/redux/api/auth/authApi";
import Spinner from "../ui/Spinner";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { getErrorData } from "@/utils/getErrorData";

const Login = () => {
  // location path
  const navigate = useNavigate();
  // redux
  const [login, { isLoading }] = useLoginMutation();

  // react-form-hook
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  // type for form-hook error
  const typedErrors = errors as FieldErrors<FieldValues>;
  // error message state
  const [errorMessage, setErrorMessage] = useState("");

  // cookies for testing
  const [, setCookie] = useCookies(["token"]);
  const location = useLocation();
  // onSubmit handler
  const onSubmit = async (data: any) => {
    setErrorMessage(""); // Clear any previous error messages

    try {
      const response = await login(data);

      if (response.data && response.data.token) {
        // Store the token directly from the response
        const token = response.data.token;

        // Set the cookie with the token
        setCookie("token", token);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.message || "Login successful!",
        });

        navigate(location?.state?.from?.pathname || "/");
        setErrorMessage(""); // Clear any error messages
      } else {
        // Use getErrorData to extract detailed error information
        const errorData = getErrorData(response.error);
        setErrorMessage(
          errorData?.message || "Login failed. Please check your credentials."
        );
        reset(); // Reset form fields
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription className="text-black">
            Log in to your account to continue your journey with RideWave.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
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
                min: 8,
                maxLength: 16,
              })}
            />
          </div>
          <p className="text-red-500 text-sm">{errorMessage}</p>
        </CardContent>
        <CardFooter>
          {isLoading ? (
            <Spinner />
          ) : (
            <Button onClick={handleSubmit(onSubmit)}>Login</Button>
          )}
        </CardFooter>
      </Card>
    </>
  );
};

export default Login;
