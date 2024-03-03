import { TextFieldProps } from "../TextField/TextField.types";

export interface FileUploadProps extends Omit<TextFieldProps, "type"> {
  accept: string;
}
