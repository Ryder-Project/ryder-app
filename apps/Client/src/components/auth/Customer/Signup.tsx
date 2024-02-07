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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const signupSchema = z
  .object({
    first_name: z
      .string()
      .min(2, { message: "Name must be at least 2 character long" })
      .max(25, { message: "Name cannot exceed 25 characters" })
      .refine((value: string) => value.trim() !== "", {
        message: "Name cannot be made up of only spaces",
      }),
    last_name: z
      .string()
      .min(2, { message: "Name must be at least 2 character long" })
      .max(25, { message: "Name cannot exceed 25 characters" })
      .refine((value: string) => value.trim() !== "", {
        message: "Name cannot be made up of only spaces",
      }),
    phone_number: z
      .string()
      .refine(
        (value: string) =>
          /^(?:\+?\d{1,3}[\s-]?)?(?:\(\d{1,4}\)[\s-]?)?\d{6,14}$/.test(value),
        {
          message:
            "Invalid phone number format. It should contain between 6 to 14 digits.",
        }
      )
      .refine((value: string) => value.trim() !== "", {
        message: "Phone number cannot be made up of only spaces",
      }),

    email: z
      .string()
      .refine((value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), {
        message: "Invalid email format",
      })
      .refine((value: string) => value.trim() !== "", {
        message: "Email cannot be made up of only spaces",
      }),

    password: z
      .string()
      .refine((value: string) => value.length >= 8, {
        message: "Password must be at least 8 characters long",
      })
      .refine((value: string) => /[a-z]/.test(value), {
        message: "Password must contain at least one lowercase letter",
      })
      .refine((value: string) => /[A-Z]/.test(value), {
        message: "Password must contain at least one uppercase letter",
      })
      .refine((value: string) => /\d/.test(value), {
        message: "Password must contain at least one digit",
      })
      .refine(
        (value: string) => /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(value),
        {
          message: "Password must contain at least one special character",
        }
      )
      .refine((value: string) => value.trim() !== "", {
        message: "Password cannot be made up of only spaces",
      })
      .refine((value: string) => value === value.trim(), {
        message: "Password cannot have leading or trailing spaces",
      }),

    confirm_password: z
      .string()
      .refine((value: string) => value.trim() !== "", {
        message: "Confirm password cannot be made up of only spaces",
      }),
  })
  .refine(
    (data: { password: string; confirm_password: string }) =>
      data.password === data.confirm_password,
    {
      message: "Passwords must match",
      path: ["confirm_password"],
    }
  );

type TSignupSchema = z.infer<typeof signupSchema>;

const SignUp: FC = () => {
  const [showModal, setShowModal] = useState(false);

  const methods = useForm<TSignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      phone_number: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit = (data: TSignupSchema) => {
    setShowModal(true);
    console.log("hitting signup button")
    console.log(data);
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
                  name="first_name"
                  label="First Name"
                  placeholder="First Name"
                  iconSrc={<NameFieldIcon />}
                />
                <TextField
                  type="text"
                  name="last_name"
                  label="Last Name"
                  placeholder="Last Name"
                  iconSrc={<NameFieldIcon />}
                />
            </div>
            <TextField
              type="text"
              name="phone_number"
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
