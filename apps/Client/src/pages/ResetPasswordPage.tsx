import { TextField } from "../components/FormFields/TextField";
import { RyderLogo } from "../assets/svg";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import axios from "axios";
const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .refine((value: string) => value.length >= 12, {
        message: "Password must be at least 12 characters long",
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
    confirm_password: z.string(),
  })
  .refine(
    (data: { password: string; confirm_password: string }) =>
      data.password === data.confirm_password,
    {
      message: "Passwords must match",
      path: ["confirm_password"],
    }
  );

type TResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const methods = useForm<TResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (data: TResetPasswordSchema) => {
    try {
      const response = await axios.post(
        "/api/user/reset-password",
        {
          password: data.password,
        },
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success(response.data.message, { toastId: "reset-password" });
      }
    } catch (err: any) {
      //  console.log(err);
      const message = "An error occurred";
      if (err.code === "ERR_NETWORK") {
        toast.error(message, { toastId: "errorResettingPassword" });
        return;
      }
      toast(err.response.data?.message || message, {
        toastId: "errorResetting",
      });
    }
    console.log(data);
  };
  return (
    <>
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
            Reset Password
          </h1>
          <FormProvider {...methods}>
            <form
              className="space-y-4"
              onSubmit={methods.handleSubmit(onSubmit)}
            >
              <TextField
                type="password"
                name="password"
                label="New Password"
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
                className="flex items-center justify-center w-full text-white bg-orange-500 hover:bg-orange-800 focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-300 ease-in-out rounded-md text-sm p-2"
              >
                Reset Password
              </button>
            </form>
          </FormProvider>
        </div>
      </div>
    </>
  );
}
