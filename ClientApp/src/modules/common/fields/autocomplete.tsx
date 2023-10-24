import { Button, Grid, ListItem, ListItemText } from '@mui/material'
import { useEffect, useState } from 'react'
import { ControllerFieldState, ControllerRenderProps, UseFormStateReturn } from 'react-hook-form'
import CustomAutocomplete from 'src/@core/components/mui/autocomplete'
import CustomTextField from 'src/@core/components/mui/text-field'
import { prepareErrorMessage } from 'src/@core/utils/errors'
import Entity from '../interfaces/entity'
import Icon from 'src/@core/components/icon'
import UpdateModelDialog from '../views/dialog/form-dialog'

export default function AutocompleteField<T>({
  field: { value, onChange, name },
  fieldState,
  label,
  options,
  model,
  title,
  subtitle,
  valueTag,
  customChange
}: {
  field: ControllerRenderProps<any, any>
  fieldState: ControllerFieldState
  formState: UseFormStateReturn<any>
  label: string
  options: any[]
  title: string
  subtitle?: string
  valueTag?: string
  model?: Entity
  customChange?: (value: any) => void
}) {
  const [_value, setValue] = useState<any>(null)
  const [dialogOpened, setDialogOpened] = useState<boolean>(false)

  const filterOptions = (options: T[], { inputValue }: { inputValue: string }) => {
    return options.filter((option: any) => {
      return Object.values(option).some(field =>
        typeof field === 'string' ? field.toLowerCase().includes(inputValue.toLowerCase()) : false
      )
    })
  }

  function handleChange(val: any) {
    onChange(valueTag && val ? (val as any)[valueTag] : val)
    if (customChange) customChange(val)
  }

  function updateValue(newValue: any) {
    if (!newValue) setValue(null)
    else if (!valueTag) setValue(newValue)
    else setValue((options.find((m: any) => m[valueTag] === (newValue as string)) as T) || null)

    if (model) model.clear()
  }

  function afterSave(newValue: any) {
    setDialogOpened(false)
    options.push(newValue)
    updateValue(newValue)
  }

  function onCloseDialog() {
    setDialogOpened(false)
    if (model) model.clear()
  }

  useEffect(() => {
    if (options.length === 0) return

    updateValue(value)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueTag, value, options])

  function _Autocomplete() {
    return (<CustomAutocomplete
      autoHighlight
      fullWidth
      filterOptions={filterOptions}
      options={options}
      value={_value}
      multiple={false}
      onChange={(event, val) => {
        handleChange(val)
      }}
      getOptionLabel={option => (option as any)[title] || ''}
      renderInput={params => (
        <CustomTextField
          required
          {...params}
          label={label}
          error={Boolean(fieldState.error!)}
          {...(fieldState.error && {
            helperText: prepareErrorMessage(name, label, fieldState.error!.message as string)
          })}
        />
      )}
      renderOption={(props, value) => (
        <ListItem {...props}>
          <ListItemText
            sx={{ m: 0 }}
            primary={(value as any)[title]}
            secondary={subtitle && (value as any)[subtitle]}
          />
        </ListItem>
      )}
    />)
  }

  return model !== undefined ? (
    <Grid container spacing={2} sx={{alignItems: 'end'}}>
      <Grid item xs>
        {_Autocomplete()}
      </Grid>
      <Grid item>
        <Button variant='tonal' onClick={() => setDialogOpened(true)}>
          <Icon icon='pepicons-pop:plus' />
        </Button>
      </Grid>

      <UpdateModelDialog model={model} afterSave={afterSave} opened={dialogOpened} onClose={onCloseDialog} />
    </Grid>
  ) : _Autocomplete()
}
