import riderLogo from "../../Auth/Images/Logo.png"
import riderPhoto from "../../Auth/Images/image 4.png"
import { Button,InputField } from "../../../routes/Auth";
import { useState } from "react";
import { registerUser } from "../../../utils/api";
import "./index.css";




const SignUpPage = () => {
  

  const [userData, setUserData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
  });

 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  

  // ... rest of the component

  






const inputFieldsData = [
    { label: "Name", placeholder: "Enter your name", icon: "icon1.png" },
    {
      label: "Phonenumber",
      placeholder: "Enter your phone number",
    },
    { label: "City", placeholder: "Enter your email", icon: "icon2.png" },
    {
      label: "Bike Documents",
      placeholder: "Enter your email",
      icon: "icon3.png",
    },
    {
      label: "Valid ID Card",
      placeholder: "Enter your email",
      icon: "icon4.png",
    },
    {
      label: "Passport Photo",
      placeholder: "Enter your email",
      icon: "icon5.png",
    },
    { label: "Password", placeholder: "Enter your email" },
    {
      label: "Confirm Password",
      placeholder: "Enter your email",
    },
  ];
  


const mapInput = inputFieldsData.map((field, index) => (
    <InputField
      key={index}
      label={field.label}
      placeholder={field.placeholder}
      // icon={field.icon} // Pass the icon prop here
      onChange={handleChange}
    />
  ));
  

  const handleButtonClick = () => {
    registerUser(userData);
  };

  const handleFormSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    registerUser(userData);
  };

  
  return (
    <div className="register__container section padding">
      <div className="register__container-img">
        <img src={riderPhoto} alt="ryderPhoto" />
        <h1 className="register__container-img_text">
          Delivery service just got easier, elegant & superb with{" "}
          <span>Ryder</span>
        </h1>
      </div>
      <div className="register__container-input">
        <img src={riderLogo} alt="riderLogo" />
        <h2>Sign Up as a Rider</h2>
        <form onSubmit={handleFormSubmit}>
        {mapInput}
        <Button onClick={handleButtonClick} label="Signup" />
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;


