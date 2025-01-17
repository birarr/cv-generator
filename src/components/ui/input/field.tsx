"use client";
import { ComponentProps, ReactNode } from "react";
import { Control, Controller, useFormContext } from "react-hook-form";
import { Input } from "./input";
import { FieldWrapper } from "./field-wrapper";

type InputFieldProps = ComponentProps<typeof Input> & {
  label: string;
  name: string;
  containterClassname?: string;
  extraContent?: (value: string) => ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: Control<any, any>;
};

export const InputField = ({
  label,
  name,
  required,
  extraContent,
  control: customControl,
  containterClassname,
  ...props
}: InputFieldProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={customControl ?? control}
      name={name}
      rules={{
        required: required && "A curriculum must have a title!",
      }}
      render={({ field, fieldState }) => (
        <FieldWrapper
          label={label}
          className={containterClassname}
          error={fieldState?.error}
        >
          <Input {...props} {...field} />
          {extraContent && extraContent(field.value)}
        </FieldWrapper>
      )}
    />
  );
};
