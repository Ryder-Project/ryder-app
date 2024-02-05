import { ChangeEvent } from "react";
import "./index.css"

interface InputProps {
  label: string,
  placeholder: string,
   onChange: (event: ChangeEvent<HTMLInputElement>) => void
   name:string;
}

export const InputField: React.FC<InputProps> = ({  label, placeholder,onChange,name  }) => {
  return (
    <div className='input-container'>
      <label>{label}</label>
      <div className='input-wrapper'>
        <input className='input' placeholder={placeholder}
        onChange={onChange}
        name={name}
        />
      </div>
    </div>
  );
}

export default InputField;











