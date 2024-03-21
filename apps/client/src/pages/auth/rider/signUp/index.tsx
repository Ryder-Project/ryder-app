import riderLogo from "../../../Auth/Images/Logo.png";
import riderPhoto from "../../../Auth/Images/image 4.png";
import { Button, InputField } from "../../../../routes/auth";
import "./index.css";

const RiderSignUpPage = () => {
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
      onChange={() => {}}
    />
  ));

  const handleButtonClick = () => {};
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
        {mapInput}
        <Button onClick={handleButtonClick} label="Submit" />
      </div>
    </div>
  );
};

export default RiderSignUpPage;
