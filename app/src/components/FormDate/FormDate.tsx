import { DatePicker, DateTimeField, DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Controller, useFormContext } from "react-hook-form";

type Props = {
  name: string;
};

// TODO: extends for variable component
export default function FormDate({ name }: Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <DateTimePicker
          onChange={(val) => field.onChange(val?.toISOString())}
          value={dayjs(field.value)}
          slotProps={{
            openPickerIcon: { fontSize: "large" },
            textField: {
              variant: "outlined",
              id: "due-date",
              fullWidth: true,
              error: !!errors[name],
              helperText: (errors[name]?.message as string) || "",
              required: true,
            },
          }}
        />
      )}
    />
  );
}
