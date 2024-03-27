import { FC, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  EmailFieldIcon,
  NameFieldIcon,
  PasswordFieldIcon,
  PhoneFieldIcon,
  SelectIcon,
} from "../../assets/svg";
import AuthPageContainer from '../common/auth/AuthPageContainer'
import Button from "../common/button/Button";
import { TextField } from "../formFields/textField";
import { FileUploadField } from "../formFields/fileUploadField";
import {
  riderSignupSchema,
  TRiderSignupSchema,
} from "../../schemas/riderSignupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { cities } from "../../data/cities";
import { getRyderServerUrl } from "../../utils/serverUtils";
import { toast } from "react-toastify";
import axios from "axios";
import CheckEmailVerify from "./resetPassword/CheckEmailVerify";

const Signup: FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const methods = useForm<TRiderSignupSchema>({
    resolver: zodResolver(riderSignupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      city: "",
      bikeDoc: "",
      validIdCard: "",
      passportPhoto: "",
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (data: TRiderSignupSchema) => {
    const {
      bikeDoc,
      validIdCard,
      passportPhoto,
      confirm_password,
      ...otherData
    } = data;
    const formData = new FormData();
    Object.entries(otherData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    // const files = [bikeDoc, validIdCard, passportPhoto];
    // const filesArray: File[] = Array.from(files);
    // filesArray.forEach((file, index) => {
    //   if (file instanceof Blob) {
    //     const reader = new FileReader();
    //     reader.onload = () => {
    //       const base64String = reader.result
    //         ?.toString()
    //         .split(",")[1] as string;
    //       formData.append(
    //         index === 0
    //           ? "bikeDoc"
    //           : index === 1
    //           ? "validIdCard"
    //           : "passportPhoto",
    //         base64String
    //       );
    //     };
    //     reader.readAsDataURL(file);
    //   }
    // });
     if (bikeDoc && validIdCard && passportPhoto) {
       formData.append("bikeDoc", bikeDoc[0]);
       formData.append("validIdCard", validIdCard[0]);
       formData.append("passportPhoto", passportPhoto[0]);
     } 
    // const requestData = {
    //   ...otherData,
    //   formData,
    // };
    try {
      const ryderServerUrl = getRyderServerUrl();
      setIsLoading(true);
      const response = await axios.post(
        `${ryderServerUrl}/api/v1/riders/registerRider`,
        formData,
        { withCredentials: true }
      );
      console.log(response, formData);
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
  const handleAxiosError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const statusCode = error.response.status;
        switch (statusCode) {
          case 400:
            toast.error("Validation error: " + error.response.data.message);
            break;
          case 409:
            toast.error(
              "Account already exists: " + error.response.data.message
            );
            break;
          default:
            toast.error("Error: " + error.response.data.message);
        }
      } else {
        toast.error("Network error: " + error.message);
      }
    } else {
      console.error("Non-Axios error:", error);
    }
  };

  return (
    <AuthPageContainer title="Sign Up as a Rider">
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
          <div className="relative">
            <label htmlFor="city" className="block mb-1 text-sky-950 text-sm">
              City
            </label>
            <select
              id="city"
              defaultValue=""
              className="pl-3 pr-8 border border-sky-950 text-sm rounded block w-full px-4 py-2 appearance-none"
              {...methods.register("city")}
            >
              <option value="" disabled hidden>
                Select a city
              </option>
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 top-6 right-0 flex items-center pr-4 pointer-events-none">
              <SelectIcon />
            </div>
          </div>
          <FileUploadField
            accept="application/pdf, .doc, .docx, "
            name="bikeDoc"
            label="Bike Documents"
          />
          <FileUploadField
            accept="image/*, application/pdf"
            name="validIdCard"
            label="Valid ID Card"
          />
          <FileUploadField
            accept="image/*"
            name="passportPhoto"
            label="Passprt Photo"
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

export default Signup;
