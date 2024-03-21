/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from "react";
import {
  EmailFieldIcon,
  NameFieldIcon,
  PasswordFieldIcon,
  PhoneFieldIcon,
} from "../../../assets/svg";
import { TextField } from "../../formFields/textField";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";
import { signupSchema, TSignupSchema } from "../../../schemas/signupSchema";
import { getRyderServerUrl } from "../../../utils/serverUtils";
import Button from "../../common/button/Button";
import CheckEmailVerify from "../resetPassword/CheckEmailVerify";
import AuthPageContainer from "../../common/auth/AuthPageContainer";

const SignUp: FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const methods = useForm<TSignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

    const onSubmit: (data: TSignupSchema) => Promise<void> = async (
    data: TSignupSchema
  ) => {
    try {
      const ryderServerUrl = getRyderServerUrl();
      setIsLoading(true);
      const { ...requestData } = data;
      const response = await axios.post(
        `${ryderServerUrl}/api/v1/customers/registerCustomer`,
        requestData,
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success("Registration successful");
        setShowModal(true);
      } else {
        toast.error("Unexpected status code: " + response.status);
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAxiosError = (error: any) => {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<any>;
      if (axiosError.response) {
        const statusCode = axiosError.response.status;
        switch (statusCode) {
          case 400:
            toast.error(
              "Validation error: " + axiosError.response.data.message
            );
            break;
          case 409:
            toast.error(
              "Account already exists: " + axiosError.response.data.message
            );
            break;
          default:
            toast.error("Error: " + axiosError.response.data.message);
        }
      } else {
        toast.error("Network error: " + error.message);
      }
    } else {
      console.error("Non-Axios error:", error);
    }
  };

  return (
    <AuthPageContainer title="Signup as a Customer">
      <FormProvider {...methods}>
        <form className="space-y-3" onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 space-x-2">
            <TextField
              type="text"
              name="firstName"
              label="First Name"
              placeholder="First Name"
              iconSrc={<NameFieldIcon />}
            />
            <TextField
              type="text"
              name="lastName"
              label="Last Name"
              placeholder="Last Name"
              iconSrc={<NameFieldIcon />}
            />
          </div>
          <TextField
            type="text"
            name="phone"
            label="Phone Number"
            placeholder="Enter your phone number"
            iconSrc={<PhoneFieldIcon />}
          />
          <TextField
            type="text"
            name="email"
            label="Email"
            placeholder="Enter your email"
            iconSrc={<EmailFieldIcon />}
          />
          <TextField
            type="password"
            name="password"
            label="Password"
            placeholder="Enter new password"
            iconSrc={<PasswordFieldIcon />}
          />
          <TextField
            type="password"
            name="confirm_password"
            label="Confirm Password"
            placeholder="Re-enter your password"
            iconSrc={<PasswordFieldIcon />}
          />
          <Button
            type="submit"
            className="bg-orange-500 hover:bg-orange-800 focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 font-medium rounded-md text-sm p-2"
            disabled={isLoading}
          >
            {isLoading ? "Signing up..." : "Sign Up"}
          </Button>
        </form>
      </FormProvider>
      {showModal && <CheckEmailVerify />}
      <p className="text-sm text-sky-950 mt-4">
        Already have an account?{" "}
        <a href="/login" className="text-orange-500 hover:cursor">
          Sign In
        </a>
      </p>
    </AuthPageContainer>
  );
};

export default SignUp;
