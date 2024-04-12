import { FileUploadProps } from './FileUploadField.types';
import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';
import { UploadFrame } from '../../../assets/svg';
import { useState } from 'react';

export default function FileUploadField(props: FileUploadProps) {
  const { label, name, className, accept } = props;
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();
  const [fileName, setFileName] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      const selectedFile = fileList[0];
      console.log('Selected File:', selectedFile);
      setValue(name, selectedFile);
      setFileName(selectedFile.name);
    }
  };

  return (
    <div className={clsx(className)}>
      {label && (
        <label htmlFor={name} className="block mb-1 text-sky-950 text-sm">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          {...register(name)}
          id={name}
          type="file"
          accept={accept}
          multiple={false}
          onChange={handleFileChange}
          className="hidden"
        />
        <label
          htmlFor={name}
          className="pl-2 border border-sky-950 text-sm rounded w-full px-4 py-1.5 cursor-pointer items-center flex"
        >
          <UploadFrame />
          {fileName && (
            <span className="overflow-hidden text-ellipsis whitespace-nowrap">
              {fileName}
            </span>
          )}
        </label>
      </div>
      {(!!errors[name]?.message || !!errors[name]?.root) && (
        <p className="mt-1 text-xs text-red-700">
          {errors[name]
            ? errors[name]?.message
              ? errors[name]?.message?.toString()
              : errors[name]?.root?.message
                ? errors[name]?.root?.message?.toString()
                : 'There was an error'
            : null}
        </p>
      )}
    </div>
  );
}
