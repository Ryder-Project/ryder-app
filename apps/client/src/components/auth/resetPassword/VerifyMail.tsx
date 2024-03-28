import { EmailCheckIcon } from '../../../assets/svg';
import { FC } from 'react';
import Button from '../../common/button/Button';
import { getRyderServerUrl } from '../../../utils/serverUtils';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import PasswordContainer from '../../common/auth/PasswordContainer';

const VerifyMail: FC = () => {
  const navigate = useNavigate();
  const handleVerifyMail = async () => {
    try {
      const ryderServerUrl = getRyderServerUrl();
      const token = new URLSearchParams(window.location.search).get('token');
      const response = await axios.post(
        `${ryderServerUrl}/api/v1/customers/verifyEmail?token=` + token
      );
      if (response.status === 200) {
        toast.success('Your email has been confirmed');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      console.error('Verification failed:', error);
      toast.error('Verification failed');
    }
  };
  return (
    <PasswordContainer className="lg:px-[140px]">
      <div className="mb-8">
        <EmailCheckIcon />
      </div>
      <div className="flex flex-col justify-center items-center text-center max-w-[319px] text-blue-950 ">
        <h1 className="text-3xl font-bold">Verify your email</h1>
        <p className="text-sm py-6 px-8">
          Hi there, use the link below to verify your email and start enjoying
          Ryder
        </p>
        <Button
          className="py-4 bg-orange-500 text-sm w-32"
          onClick={handleVerifyMail}
        >
          Verify email
        </Button>
      </div>
    </PasswordContainer>
  );
};

export default VerifyMail;
