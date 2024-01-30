import { ChangeEvent } from "react";
import "./index.css"

interface InputProps {
  label: string,
  placeholder: string,

   onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export const InputField: React.FC<InputProps> = ({  label, placeholder  }) => {
  return (
    <div className='input-container'>
      <label>{label}</label>
      <div className='input-wrapper'>
        <input className='input' placeholder={placeholder}  />
      </div>
    </div>
  );
}

export default InputField;











