import format from 'date-fns/format'
import DatePicker, { registerLocale } from 'react-datepicker'
import { Ref, forwardRef, useState } from 'react'
import br from 'date-fns/locale/pt-BR'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import CustomTextField from 'src/@core/components/mui/text-field'
import { Box } from '@mui/system'
import FieldProps from './interfaces/fieldProps'
import { prepareErrorMessage } from 'src/@core/utils/errors'

interface PickerProps {
  label: string
  value: any
}

export type DateType = Date | null | undefined

registerLocale('pt-BR', br)

const DateTimePicker = ({
  field: { value, onChange, name },
  fieldState,
  label,
  required = false,
  beforeChange,
  afterChange,
  setValue,
  onBlur
}: FieldProps) => {

  const CustomInput = forwardRef((props: PickerProps, ref: Ref<any>) => {
    console.log('props.value', props.value)
    const d = props.value !== null && props.value !== '' ? format(props.value, 'dd/MM/yyyy H:i') : ''

    return <CustomTextField fullWidth inputRef={ref} required={required} label={props.label!} value={d} error={Boolean(fieldState.error!)}
    {...(fieldState.error && {
      helperText: prepareErrorMessage(name, label, fieldState.error!.message as string)
    })} />
  })

  return (
    <Box sx={{ width: '100%' }}>
      <DatePickerWrapper>
        <Box sx={{ width: '100%' }}>
          <DatePicker
            locale='pt-BR'
            selected={value}
            id='date-time-picker'
            onChange={event => {
              if (beforeChange) beforeChange(fieldState, setValue!, event)
              onChange(event)
              if (afterChange) afterChange(fieldState, setValue!, event)
            }}
            onBlur={params => {
              if (onBlur) onBlur(params, setValue!)
            }}
            customInput={
              <CustomInput label={label} value={value as Date | number} />
            }
          />
        </Box>
      </DatePickerWrapper>
    </Box>
  )
}

export default DateTimePicker
