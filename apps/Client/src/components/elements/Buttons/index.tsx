import "./index.css"

interface ButtonProps {
    label: string;
    // onClick: () => void;
  }


    
    

export const Button:React.FC<ButtonProps> = ({  label }) => {
  return (
    <button className="button"  >
      {label}
    </button>
  );
}

export default Button;

