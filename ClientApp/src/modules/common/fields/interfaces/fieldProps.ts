import { InputProps } from '@mui/material'
import { FocusEvent } from 'react'
import { ControllerFieldState, ControllerRenderProps, UseFormSetValue, UseFormStateReturn } from 'react-hook-form'

export default interface FieldProps extends InputProps {
  field: ControllerRenderProps<any, any>
  fieldState: ControllerFieldState
  formState: UseFormStateReturn<any>
  label: string
  type?: React.InputHTMLAttributes<unknown>['type']
  required?: boolean
  setValue?: UseFormSetValue<any>
  beforeChange?: (fieldState: ControllerFieldState, setValue?: UseFormSetValue<any>, ...value: any) => boolean
  afterChange?: (fieldState: ControllerFieldState, setValue?: UseFormSetValue<any>, ...value: any) => void
  onBlur?: (
    params: FocusEvent<HTMLTextAreaElement | HTMLInputElement, Element>,
    setValue?: UseFormSetValue<any>
  ) => void
}
