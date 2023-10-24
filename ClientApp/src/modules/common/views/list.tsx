// ** MUI Imports
import { useEffect, useState } from 'react'
import { GridColDef } from '@mui/x-data-grid'
import toast from 'react-hot-toast'
import RowOptions from 'src/components/list/row-options'
import List, { ListProps } from 'src/components/list'
import Entity from '../interfaces/entity'
import UpdateModelDialog from './dialog/form-dialog'
import { Grid, Typography } from '@mui/material'
import RemoveDialog from 'src/components/form/dialog/remove-dialog'

function ModelList({ model }: { model: Entity }) {

  // States
  const [data, setData] = useState<any[]>([])
  const [fetched, setFetched] = useState<boolean>(false)
  const [selectedRecord, setSelectedRecord] = useState<any>()
  const [_columns, setColumns] = useState<GridColDef[]>([])

  const [dialogOpened, setDialogOpened] = useState<boolean>(false)
  const [confirmRemoveOpened, setConfirmRemoveOpened] = useState<boolean>(false)

  useEffect(() => {
    if (!fetched){
    setFetched(true)
    const service = model.service
    const promise = service.fetch()

    promise.then(setData)

    toast.promise(promise, {
      loading: 'Recuperando registros',
      success: (resp) => {
        if (resp.length > 0) return 'Registros recuperados'
        else return 'Nenhum registro encontrado'
      },
      error: 'Ocorreu um erro ao recuperar os registros'
    })}
  }, [model, fetched])

  function handleEdit(record: any) {
    model.setData(record)
    setSelectedRecord(record)
    setDialogOpened(true)

  }

  function handleCreate() {
    model.clear()
    setSelectedRecord({...model})
    setDialogOpened(true)
  }

  function handleRemove(record: any) {
    model.setData(record)
    setConfirmRemoveOpened(true)
  }

  function onRemove() {
    const id = model.id
    const promise = model.delete()

    toast.promise(promise, {
      loading: 'Removendo registro',
      success: 'Registro removido com sucesso!',
      error: 'Ocorreu u merro ao remover o registro!'
    })

    promise.then(() => {
      const updatedData = [...data]
      const index = updatedData.findIndex(r => r.id === id)
      if (index !== -1) {
        updatedData.splice(index, 1)
        setData(updatedData)
      }
    })

    setConfirmRemoveOpened(false)
  }

  function onCloseDialog() {
    setDialogOpened(false)
  }

  function afterSave(record: Entity) {
    const updatedData = [...data]
    const index = updatedData.findIndex(r => r.id === record.id)
    if (index !== -1) {
      updatedData[index] = record
    } else {
      updatedData.push(record)
    }

    setData(updatedData)
    setDialogOpened(false)
  }

  const actionColumn: GridColDef = {
    flex: 0.1,
    minWidth: 100,
    maxWidth: 100,
    sortable: false,
    hideable: false,
    field: 'actions',
    headerName: '',
    headerAlign: 'right',
    renderCell: ({ row }: { row: any }) => (<RowOptions onEdit={() => handleEdit(row)} onRemove={() => handleRemove(row)} ></RowOptions>)
  }

  useEffect(() => {
    setColumns([...model.columns(), actionColumn])

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [model])

  const props: ListProps = {
    checkboxSelection: false,
    columns: _columns,
    data: data,
    disableRowSelectionOnClick: false,
    addButtonText: 'Novo',
    handleCreate,
  }

  return <Grid container spacing={6}>
    <Grid item xs={12}>
      <Typography variant='h4'>{model.title('list')}</Typography>
    </Grid>
    <Grid item xs={12}>
      <List {...props} />
    </Grid>
    <UpdateModelDialog model={model} data={selectedRecord} afterSave={afterSave} opened={dialogOpened} onClose={onCloseDialog} />
    <RemoveDialog handleDelete={onRemove} opened={confirmRemoveOpened} handleToggle={() => setConfirmRemoveOpened(false)} />
  </Grid>
}

export default ModelList
