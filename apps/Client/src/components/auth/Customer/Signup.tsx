import { FC, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import VerifyMailModal from "../resetPassword/VerifyMailModal";
import TextField from "../../FormFields/TextField/TextField";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const signupSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(25, { message: "Name cannot exceed 25 characters" })
    .refine((value: string) => value.trim() !== "", {
      message: "Name cannot be made up of only spaces",
    }),
  lastName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(25, { message: "Name cannot exceed 25 characters" })
    .refine((value: string) => value.trim() !== "", {
      message: "Name cannot be made up of only spaces",
    }),
  phone: z
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
    .refine((value: string) => /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(value), {
      message: "Password must contain at least one special character",
    })
    .refine((value: string) => value.trim() !== "", {
      message: "Password cannot be made up of only spaces",
    })
    .refine((value: string) => value === value.trim(), {
      message: "Password cannot have leading or trailing spaces",
    }),
});

type TSignupSchema = z.infer<typeof signupSchema>;

type FormValues = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  confirm_password: string;
};

const SignUp: FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false); 
  const methods = useForm<FormValues>({
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

  const onSubmit = async (data: TSignupSchema) => {
    try {
      setIsSigningUp(true);

      const formData = {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        email: data.email,
        password: data.password,
      };

      const response = await fetch(
        "http://localhost:3333/api/v1/customers/registerCustomer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const responseData = await response.json();
      if (response.ok) {
        toast.success("Signup successful");
        setTimeout(() => {
          setShowModal(true);
          setIsSigningUp(false); 
        }, 2000);
        console.log("Registration Successful:", responseData.message);
      } else {
        toast.error(responseData.message);
        console.error("Registration failed:", responseData.message);
      }
    } catch (error) {
      toast.error("Error during registration");
      console.error("Error during registration:", error);
    } finally {
      setIsSigningUp(false); 
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
              />
              <TextField
                type="text"
                name="lastName"
                label="Last Name"
                placeholder="Last Name"
              />
            </div>
            <TextField
              type="text"
              name="phone"
              label="Phone Number"
              placeholder="Enter your phone number"
            />
            <TextField
              type="text"
              name="email"
              label="Email"
              placeholder="Enter your email"
            />
            <TextField
              type="password"
              name="password"
              label="Password"
              placeholder="Enter new password"
            />
            <TextField
              type="password"
              name="confirm_password"
              label="Confirm Password"
              placeholder="Re-enter your password"
            />
            <button
              type="submit"
              className="flex items-center justify-center w-full text-white bg-orange-500 hover:bg-orange-800 focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-300 ease-in-out font-medium rounded-md text-sm p-2"
              disabled={isSigningUp} // Disable button when signing up
            >
              {isSigningUp ? "Signing Up..." : "Sign Up"}
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
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default SignUp;

