import React from 'react'
import ConfirmDialog from 'src/components/dialogs/confirm-dialog'

export interface RemoveDialogProps {
  opened: boolean
  handleToggle: () => void
  handleDelete: () => void
}

const RemoveDialog = ({ opened, handleToggle, handleDelete }: RemoveDialogProps) => {

  return (
    <ConfirmDialog
      opened={opened}
      confirmColor='error'
      confirmText='Excluir'
      handleConfirm={handleDelete}
      handleToggle={handleToggle}
      icon='jam:alert-f'
      iconColor='#BD0000'
      message='Tem certeza que deseja excluir o registro?'
      title='Atenção'
    />
  )
}

export default RemoveDialog
