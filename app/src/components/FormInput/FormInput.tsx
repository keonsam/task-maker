import { TextField, TextFieldProps } from "@mui/material";
import { ReactNode } from "react";
import { Controller, useFormContext } from "react-hook-form";

type Props = {
  name: string;
  children?: ReactNode;
} & TextFieldProps;

export default function FormInput({ name, children, ...otherProps }: Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TextField
          {...otherProps}
          {...field}
          error={!!errors[name]}
          helperText={(errors[name]?.message as string) || ""}
        >
          {children}
        </TextField>
      )}
    />
  );
}
