import { FC, useState } from "react";
import {
  EmailFieldIcon,
  NameFieldIcon,
  PasswordFieldIcon,
  PhoneFieldIcon,
  RyderLogo,
} from "../../../assets/svg";
import VerifyMailModal from "../ResetPassword/VerifyMailModal";
import TextField from "../../FormFields/TextField/TextField";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from 'react-toastify';
import axios, { AxiosError } from 'axios';
import {signupSchema, TSignupSchema } from '../../../schemas/signupSchema'


const SignUp: FC = () => {
  const [showModal, setShowModal] = useState(false);

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

  const onSubmit = async(data: TSignupSchema) => {
    try {
     const { confirm_password, ...requestData } = data;
     const response = await axios.post(
       "http://localhost:5500/api/v1/customers/registerCustomer",
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
    <div className="grid grid-cols-5">
      <div className="loginBackground">
        <h1 className="max-w-[474px] w-full text-4xl font-bold">
          Delivery service just got easier, elegant & superb with{" "}
          <span className="text-orange-500">Ryder</span>
        </h1>
      </div>
      <div className="ml-20 mr-32 col-span-2 flex flex-col pt-20">
        <div className="flex items-center mb-10">
          <RyderLogo />
          <span className="font-bold text-3xl text-gray-900 pl-2">Ryder</span>
        </div>
        <h1 className="mb-8 text-xl font-bold  text-sky-950">
          Sign Up as a Customer
        </h1>
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
            <button
              type="submit"
              className="flex items-center justify-center w-full text-white bg-orange-500 hover:bg-orange-800 focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-300 ease-in-out font-medium rounded-md text-sm p-2"
            >
              Sign Up
            </button>
          </form>
          {showModal && <VerifyMailModal />}
        </FormProvider>
        <p className="text-sm text-sky-950 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-orange-500 hover:cursor">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
