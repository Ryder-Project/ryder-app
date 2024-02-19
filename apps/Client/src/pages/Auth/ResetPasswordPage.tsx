import { TextField } from "../../components/FormFields/TextField";
import { RyderLogo, PasswordFieldIcon } from "../../assets/svg";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import axios from "axios";
import {resetPasswordSchema, TResetPasswordSchema} from '../../schemas/resetPasswordSchema'
import { getRyderServerUrl } from "../../utils/serverUtils";
import Button from "../../components/Common/Button/Button";

export default function ResetPasswordPage() {
  const methods = useForm<TResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirm_password: "",
    },
  });
  const onSubmit = async (data: TResetPasswordSchema) => {
    try {
      const ryderServerUrl = getRyderServerUrl();
      const token = new URLSearchParams(window.location.search).get("token");
      const response = await axios.post(
        `${ryderServerUrl}/api/v1/customers/resetPassword?token=` + token,
        {
          newPassword: data.newPassword,
        }
      );
      if (response.status === 200) {
        toast.success(
          "Password reset successfully. You can now log in with your new password.",
          { toastId: "reset-password" }
        );
      }
    } catch (err: any) {
      const message =
        "An error occurred while resetting your password. Please try again later.";
      if (err.code === "ERR_NETWORK") {
        toast.error(
          "Network error. Please check your internet connection and try again.",
          { toastId: "errorResettingPassword" }
        );
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
                name="newPassword"
                label="New Password"
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
                className="bg-orange-500 hover:bg-orange-800 focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 rounded-md text-sm p-2"
              >
                Reset Password
              </Button>
            </form>
          </FormProvider>
        </div>
      </div>
    </>
  );
}
