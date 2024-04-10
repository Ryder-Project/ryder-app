import  { ChangeEvent, useState } from 'react';
import { TextFieldProps } from './TextField.types';
import clsx from 'clsx';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useFormContext } from 'react-hook-form';

const TextField = (props: TextFieldProps) => {
  const { label, name, type = 'text', placeholder, className, iconSrc } = props;
  const [activeType, setActiveType] = useState<'text' | 'password'>('password');
  const {
    register,
    formState: { errors },
  } = useFormContext();

const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
  console.log(`${name} value:`, event.target.value);
};

  const toggleType = () => {
    if (activeType === 'text') {
      setActiveType('password');
    } else {
      setActiveType('text');
    }
  };
  return (
    <div className={clsx(className)}>
      {label ? (
        <label htmlFor={name} className="block mb-1 text-sky-950 text-sm">
          {label}
        </label>
      ) : null}

      <div className=" relative">
        {iconSrc ? (
          <span className="absolute pointer-events-none top-1/2 transform -translate-y-1/2 left-3">
            {iconSrc}
          </span>
        ) : null}
        <input
          {...register(name, {
            valueAsNumber: type === 'number',
          })}
          id={name}
          type={type === 'password' ? activeType : type}
          placeholder={placeholder}
          aria-describedby={name}
          className={clsx(
            'pl-10 border text-sm rounded block w-full px-4 py-2',
            {
              'border-sky-950':
                !errors[name]?.message || !errors[name]?.root?.message,
              'border-red-700':
                !!errors[name]?.message || !!errors[name]?.root?.message,
            }
          )}
          onChange={handleInputChange}
        />
        {type === 'password' ? (
          <button
            type="button"
            onClick={toggleType}
            className="absolute outline-none border-none bg-transparent top-1/2 -translate-y-1/2 right-3 w-6 h-6 flex items-center z-10"
          >
            {activeType === 'password' ? <FaEye /> : <FaEyeSlash />}
          </button>
        ) : null}
      </div>

      {!!errors[name]?.message || !!errors[name]?.root ? (
        <p className="mt-1 text-xs text-red-700">
          {!errors[name]
            ? errors[name]?.message
              ? errors[name]?.message?.toString()
              : errors[name]?.root?.message
                ? errors[name]?.root?.message?.toString()
                : 'There was an error'
            : null}
        </p>
      ) : null}
    </div>
  );
};

export default TextField;
