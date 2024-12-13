"use client";
import { ComponentProps } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FieldWrapper } from "../input/field-wrapper";
import { Editor } from ".";

type EditorFieldProps = {
  label: string;
  name: string;
  containterClassname?: string;
  required?: boolean;
};

export const EditorField = ({
  label,
  name,
  required,
  containterClassname,
  ...props
}: EditorFieldProps) => {
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
          <Editor {...props} {...field} />
        </FieldWrapper>
      )}
    />
  );
};
