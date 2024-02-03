import { Autocomplete, TextField, TextFieldProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export type FormAutocompleteOptions = {
  label: string;
  id: string;
};

type Props = {
  name: string;
  options: FormAutocompleteOptions[];
} & TextFieldProps;

//
export default function FormAutocomplete({
  name,
  options,
  ...otherProps
}: Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Autocomplete
          onChange={(event, newValue: FormAutocompleteOptions | null) =>
            field.onChange(newValue)
          }
          value={field.value}
          disablePortal
          id="assignee"
          options={options}
          sx={{ width: 300 }}
          isOptionEqualToValue={(option, value) => option.id === value?.id}
          renderInput={(params) => (
            <TextField
              {...otherProps}
              {...params}
              fullWidth
              error={!!errors[name]}
              helperText={(errors[name]?.message as string) || ""}
            />
          )}
        />
      )}
    />
  );
}
