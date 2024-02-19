import { FC, useState } from "react";
import CheckEmail from "../../components/Auth/ResetPassword/CheckEmailModal";
import PasswordContainer from "../../components/Auth/ResetPassword/PasswordContainer";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "../../components/FormFields/TextField/TextField";
import { EmailFieldIcon } from "../../assets/svg";
import {forgotPasswordSchema, TForgotPasswordSchema} from '../../schemas/forgotPasswordSchema'
import axios from "axios";
import { toast } from "react-toastify";
import { getRyderServerUrl } from "../../utils/serverUtils";
import Button from "../../components/Common/Button/Button";

const ForgotPasswordPage: FC = () => {
  const [showModal, setShowModal] = useState(false);

  const methods = useForm<TForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async(data: TForgotPasswordSchema) => {
    try {
      const ryderServerUrl = getRyderServerUrl();
      const response = await axios.post(
        `${ryderServerUrl}/api/v1/customers/forgotPassword`,
        { email: data.email }
      );
      if(response.status === 200) {
        setShowModal(true);
      }
    }catch(error:any){
      const message = "An error occurred";
      if (error.code === "ERR_NETWORK") {
        toast.error(message, { toastId: "errorSendingEmail" });
        return;
      }
      toast(error.response.data?.message || message, {
        toastId: "errorSendingEmail",
      });
    }
  };

  return (
    <PasswordContainer className="lg:px-[100px]">
      <div className="max-w-[432px]">
        <div className="flex flex-col justify-center items-center text-center  ">
          <h1 className="text-3xl font-bold text-blue-950">Forgot Password</h1>
          <p className="text-sm py-4 text-stone-300 mx-8">
            Enter the email associated with your account and we’ll send an email
            with instruction to reset your password
          </p>
        </div>
        <FormProvider {...methods}>
          <form className="mx-10" onSubmit={methods.handleSubmit(onSubmit)}>
            <TextField
              type="text"
              name="email"
              label="Email"
              placeholder="Enter your email"
              iconSrc={<EmailFieldIcon />}
            />
            <Button
              type="submit"
              className="rounded-md text-sm py-3 mt-6"
            >
              Reset password
            </Button>
          </form>
          {showModal && <CheckEmail />}
        </FormProvider>
      </div>
      <a href="/login" className="mt-12 px-4 py-2 bg-stone-200 text-sm border">
        Back to Login
      </a>
    </PasswordContainer>
  );
};

export default ForgotPasswordPage;



// Titi123$