export interface TextFieldProps {
  type: "text" | "password" | "number";
  label?: string;
  name: string;
  placeholder?: string;
  className?: string;
}
