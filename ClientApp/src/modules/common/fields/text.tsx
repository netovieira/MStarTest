import CustomTextField from 'src/@core/components/mui/text-field'
import { prepareErrorMessage } from 'src/@core/utils/errors'
import FieldProps from './interfaces/fieldProps'

export default function TextField({
  field: { value, onChange, name },
  fieldState,
  label,
  type,
  required = false,
  beforeChange,
  afterChange,
  setValue,
  onBlur
}: FieldProps) {

  return (
    <CustomTextField
      fullWidth
      required={required}
      value={value}
      label={label}
      type={type}
      onChange={event => {
        if (beforeChange) beforeChange(fieldState, setValue!, event)
        onChange(event)
        if (afterChange) afterChange(fieldState, setValue!, event)
      }}
      onBlur={params => {
        if (onBlur) onBlur(params, setValue!)
      }}
      error={Boolean(fieldState.error!)}
      {...(fieldState.error && {
        helperText: prepareErrorMessage(name, label, fieldState.error!.message as string)
      })}
    />
  )
}
