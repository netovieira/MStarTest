import { GridColDef } from '@mui/x-data-grid'
import { ReactNode } from 'react'

export interface TextColumnProps {
  name: string
  headerName: string
  flex?: number
  width?: number
  minWidth?: number
  maxWidth?: number
  formatValue?: (row: any) => ReactNode | string
}

export default function TextColumn(props: TextColumnProps): GridColDef {

  if (props.width) {
    props.minWidth = props.width
    props.maxWidth = props.width
  }

  return {
    flex: props.flex || 0.1,
    field: props.name,
    minWidth: props.minWidth,
    maxWidth: props.maxWidth,
    headerName: props.headerName,
    renderCell: ({ row }) => (props.formatValue ? props.formatValue(row) : row[props.name])
  }
}
