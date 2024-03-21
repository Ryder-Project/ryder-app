/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextField } from "../../components/formFields/textField";
import { PasswordFieldIcon } from "../../assets/svg";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import axios from "axios";
import {
  resetPasswordSchema,
  TResetPasswordSchema,
} from "../../schemas/resetPasswordSchema";
import { getRyderServerUrl } from "../../utils/serverUtils";
import Button from "../../components/common/button/Button";
import AuthPageContainer from "../../components/common/auth/AuthPageContainer";

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
    } catch (error: any) {
      const message =
        "An error occurred while resetting your password. Please try again later.";
      if (error.code === "ERR_NETWORK") {
        toast.error(
          "Network error. Please check your internet connection and try again.",
          { toastId: "errorResettingPassword" }
        );
        return;
      }
      toast(error.response.data?.message || message, {
        toastId: "errorResetting",
      });
    }
    console.log(data);
  };
  return (
    <AuthPageContainer title="Reset Password">
      <FormProvider {...methods}>
        <form className="space-y-4" onSubmit={methods.handleSubmit(onSubmit)}>
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
    </AuthPageContainer>
  );
}
