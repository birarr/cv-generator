"use client";
import { ComponentProps } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "./input";
import { FieldWrapper } from "./field-wrapper";

type InputFieldProps = ComponentProps<typeof Input> & {
  label: string;
  name: string;
  containterClassname?: string;
};

export const InputField = ({
  label,
  name,
  required,
  containterClassname,
  ...props
}: InputFieldProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: required && "A curriculum must have a title!",
      }}
      render={({ field, fieldState }) => (
        <FieldWrapper label={label} className={containterClassname}>
          <Input {...props} {...field} />
          {fieldState?.error && (
            <p className="text-sm text-red-500">{fieldState?.error?.message}</p>
          )}
        </FieldWrapper>
      )}
    />
  );
};
