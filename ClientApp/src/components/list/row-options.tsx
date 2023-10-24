import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import Icon from '../../@core/components/icon'
import { FC, ReactNode } from 'react'

export interface RowOptionsProps {
  onEdit?: () => void
  onRemove?: () => void
  children?: ReactNode
}

const RowOptions: FC<RowOptionsProps> = ({ onEdit, onRemove, children }: RowOptionsProps) => {


  const handleDelete = () => {
    if (onRemove) onRemove!()

  }

  const handleEdit = () => {
    if (onEdit) onEdit!()
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end', width: '100%' }}>
      {children}

      {onEdit && (
        <Tooltip title='Editar registro'>
          <IconButton onClick={handleEdit}>
            <Icon icon='tabler:edit' fontSize={20} />
          </IconButton>
        </Tooltip>
      )}

      {onRemove && (
        <Tooltip title='Excluir registro'>
          <IconButton color='error' onClick={handleDelete}>
            <Icon icon='tabler:trash' fontSize={20} />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  )
}

export default RowOptions
