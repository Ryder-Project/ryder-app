import riderLogo from "../../Auth/Images/Logo.png"
import riderPhoto from "../../Auth/Images/image 4.png"
import { InputField } from "../../../routes/Auth";
import { useState } from "react";
import {Button} from "../../../routes/Auth";
import { registerUser } from "../../../utils/api";
import "./index.css";




const SignUpPage = () => {
  

  const [userData, setUserData] = useState({

    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password:''
  });

 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  

const inputFieldsData = [
    { label: "Name", placeholder: "Enter your name", icon: "icon1.png" },
    {
      label: "Phonenumber",
      placeholder: "Enter your phone number",
    },
    { label: "City", placeholder: "Enter your city", icon: "icon2.png" },
    {
      label: "Bike Documents",
      placeholder: "Enter your bike id",
      icon: "icon3.png",
    },
    {
      label: "Valid ID Card",
      placeholder: "Enter your id card no",
      icon: "icon4.png",
    },
    {
      label: "Passport Photo",
      placeholder: "Enter your photo",
      icon: "icon5.png",
    },
    { label: "Password", placeholder: "Enter your password" },
    {
      label: "Confirm Password",
      placeholder: "Confirm your password",
    },
  ];
  



const mapInput = inputFieldsData.map((field, index) => (
  <InputField
    key={index}
    label={field.label}
    placeholder={field.placeholder}
    onChange={handleChange}
    name={field.label.toLowerCase().replace(/ /g, '')} 
  />
));
  

  // const handleButtonClick = () => {
  //   registerUser(userData);
  // };

  const handleFormSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    (registerUser(userData))
    ;
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
        <Button  label="Signup" />
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;


