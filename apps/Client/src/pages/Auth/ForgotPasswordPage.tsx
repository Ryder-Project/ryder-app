import { FC, useState } from "react";
import CheckEmail from "../../components/Auth/ResetPassword/CheckEmailModal";
import PasswordContainer from "../../components/Auth/ResetPassword/PasswordContainer";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "../../components/FormFields/TextField/TextField";
import { EmailFieldIcon } from "../../assets/svg";
import {forgotPasswordSchema, TForgotPasswordSchema} from '../../schemas/forgotPasswordSchema'

const ForgotPasswordPage: FC = () => {
  const [showModal, setShowModal] = useState(false);

  const methods = useForm<TForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: TForgotPasswordSchema) => {
    setShowModal(true);
    console.log(data);
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
            <button
              type="submit"
              className="flex items-center justify-center w-full text-white bg-orange-500 hover:bg-orange-800 focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-300 ease-in-out rounded-md text-sm py-3 mt-6"
            >
              Reset password
            </button>
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
