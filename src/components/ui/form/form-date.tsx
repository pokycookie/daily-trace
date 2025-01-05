import { DatePicker, DatePickerProps } from '@mui/x-date-pickers'
import { Dayjs } from 'dayjs'
import { Control, FieldPath, FieldValues, RegisterOptions, useController } from 'react-hook-form'

interface IControl<T extends FieldValues> {
  name: FieldPath<T>
  control: Control<T>
  rules?: Omit<RegisterOptions<T>, 'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>
}

type TProps<T extends FieldValues> = Omit<DatePickerProps<Dayjs>, 'value'> & IControl<T>

export function FormDate<T extends FieldValues>({ control, name, rules, ...others }: TProps<T>) {
  const { field, fieldState } = useController({ name, control, rules })

  return (
    <DatePicker
      {...others}
      onChange={(v, c) => {
        field.onChange(v?.toDate())
        others.onChange?.(v, c)
      }}
      slotProps={{
        ...others.slotProps,
        textField: {
          ...others.slotProps?.textField,
          error: !!fieldState.error,
          helperText: fieldState.error?.message,
          size: 'small',
          fullWidth: true,
        },
      }}
    />
  )
}
