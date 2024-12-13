"use client";
import { ComponentProps } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FieldWrapper } from "../input/field-wrapper";
import { IconInput } from ".";

type IconFieldProps = {
  label: string;
  name: string;
  containterClassname?: string;
  required?: boolean;
};

export const IconField = ({
  label,
  name,
  required,
  containterClassname,
  ...props
}: IconFieldProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
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
          <IconInput {...props} {...field} />
        </FieldWrapper>
      )}
    />
  );
};
