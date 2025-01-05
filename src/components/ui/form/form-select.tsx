import {
  Autocomplete,
  AutocompleteChangeReason,
  AutocompleteProps,
  AutocompleteValue,
  ChipTypeMap,
  createFilterOptions,
  Stack,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { Control, FieldPath, FieldValues, RegisterOptions, useController } from 'react-hook-form'

export interface IFormSelectOption<T> {
  label: string
  value: T | null
  isNew?: boolean
}

interface IControl<T extends FieldValues> {
  name: FieldPath<T>
  control: Control<T>
  rules?: Omit<RegisterOptions<T>, 'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>
}

type TProps<
  T extends FieldValues,
  OptionValue,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
  ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent']
> = AutocompleteProps<
  IFormSelectOption<OptionValue>,
  Multiple,
  DisableClearable,
  FreeSolo,
  ChipComponent
> &
  IControl<T> & {
    onCreate?: (option: IFormSelectOption<OptionValue>) => string
  }

export function FormSelect<
  T extends FieldValues,
  OptionValue,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
  ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent']
>({
  control,
  name,
  rules,
  options,
  onCreate,
  ...others
}: TProps<T, OptionValue, Multiple, DisableClearable, FreeSolo, ChipComponent>) {
  const [inputValue, setInputValue] = useState('')

  const {
    field: { onChange, value, ...field },
  } = useController({ name, control, rules })

  const changeHandler = (
    e: React.SyntheticEvent,
    v: AutocompleteValue<IFormSelectOption<OptionValue>, Multiple, DisableClearable, FreeSolo>,
    reason: AutocompleteChangeReason
  ) => {
    onChange(v)
    others.onChange?.(e, v, reason)
    console.log(v)
    if (reason === 'selectOption') {
      onChange(v)
    }
    if (reason === 'createOption') {
      // 실제 존재하는 옵션의 경우에도 직접 끝까지 타이핑하는 경우 생성된 것으로 취급하는 문제가 있음
      const newOption = Array.isArray(v) ? v[v.length - 1] : v
      // onCreate?.(newOption)
    }
  }

  useEffect(() => {
    console.log(value)
  }, [value])

  return (
    <Autocomplete
      {...field}
      {...others}
      value={value}
      options={options}
      onChange={changeHandler}
      onBlur={() => {
        field.onBlur()
        setInputValue('')
      }}
      filterOptions={(options, params) => {
        const filter = createFilterOptions<IFormSelectOption<OptionValue>>()
        const filtered = filter(options, params)
        const { inputValue } = params
        const isExist = options.some((option) => option.label === inputValue)
        if (inputValue !== '' && !isExist) {
          filtered.push({ label: inputValue, value: null, isNew: true })
        }
        return filtered
      }}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props
        return (
          <li key={key} {...optionProps}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="subtitle2" fontWeight={400}>
                {option.label}
              </Typography>
              {option.isNew && (
                <Typography
                  px={1}
                  py={0.5}
                  borderRadius={1}
                  bgcolor="primary.main"
                  color="white"
                  variant="caption"
                >
                  추가
                </Typography>
              )}
            </Stack>
          </li>
        )
      }}
      freeSolo={undefined} // freeSolo 옵션 제한
      inputValue={inputValue}
      onInputChange={(_, v) => setInputValue(v)}
      size={others.size || 'small'}
      fullWidth={others.fullWidth || true}
      isOptionEqualToValue={(option, value) => option.label === value.label}
    />
  )
}
