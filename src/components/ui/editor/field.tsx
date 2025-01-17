"use client";
import { ComponentProps } from "react";
import { Control, Controller, useFormContext } from "react-hook-form";
import { FieldWrapper } from "../input/field-wrapper";
import { Editor } from ".";

type EditorFieldProps = {
  label: string;
  name: string;
  containterClassname?: string;
  required?: boolean;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: Control<any, any>;
};

export const EditorField = ({
  label,
  name,
  required,
  containterClassname,
  control: customControl,
  ...props
}: EditorFieldProps) => {
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
          <Editor {...props} {...field} />
        </FieldWrapper>
      )}
    />
  );
};
