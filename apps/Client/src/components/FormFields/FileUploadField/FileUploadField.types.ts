import { TextFieldProps } from '../textField/TextField.types';

export interface FileUploadProps extends Omit<TextFieldProps, 'type'> {
  accept: string;
}
