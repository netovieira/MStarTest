import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import { DataGrid, GridColDef, GridSortModel, ptBR } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import TableHeader from './table-header'
import { Card } from '@mui/material'

export interface ListProps {
  data: any[]
  columns: GridColDef[]
  filters?: any

  searchTerms?: string
  handleSearch?: (terms: string) => void

  pageSizeOptions?: number[]

  handleCreate?: () => void
  paginationModel?: { page?: number; pageSize?: number }
  sortModel?: GridSortModel
  addButtonText?: string
  addFormRendered?: any
  checkboxSelection?: boolean
  disableRowSelectionOnClick?: boolean
}

const List = ({
  filters,
  data,
  columns,
  pageSizeOptions,
  addButtonText,
  addFormRendered,
  checkboxSelection,
  disableRowSelectionOnClick,
  sortModel,
  paginationModel,
  handleCreate,
  searchTerms,
  handleSearch
}: ListProps) => {
  const [_paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [_data, setData] = useState<any[]>(data)
  const [_searchTerms, setSearchTerms] = useState<string>(searchTerms || '')

  useEffect(() => {
    if (paginationModel) setPaginationModel(Object.assign({}, _paginationModel, paginationModel))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginationModel])

  useEffect(() => {
    if (searchTerms) setSearchTerms(searchTerms)
  }, [searchTerms])

  useEffect(() => {
    if (data) setData(data)
  }, [data])

  const defaultSearch = (terms?: string) => {
    setSearchTerms(terms || '')

    if (terms!.length > 1) {
      setData(
        data.filter((record: any) => {
          return Object.values(record).some((fieldValue) => {
            return (
              typeof fieldValue === 'string' && fieldValue.toString().toLowerCase().includes(terms!.toLowerCase())
            )
          })
        })
      )
    } else setData(data)
  }

  return (
    <Grid container spacing={6.5}>
      <Grid item xs={12}>
        <Card>
          <TableHeader
            value={_searchTerms}
            handleFilter={handleSearch || defaultSearch}
            addButtonText={addButtonText}
            onAddClick={handleCreate}
          />

          {filters ? (
            <CardContent>
              {filters}
              <Divider sx={{ m: '0 !important' }} />
            </CardContent>
          ) : null}

          <DataGrid
            localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
            autoHeight
            rowHeight={62}
            rows={_data}
            rowSelection={false}
            columns={columns}
            sortModel={sortModel}
            checkboxSelection={!!checkboxSelection}
            disableRowSelectionOnClick={!!disableRowSelectionOnClick}
            pageSizeOptions={pageSizeOptions || [10, 25, 50]}
            paginationModel={_paginationModel}
            onPaginationModelChange={setPaginationModel}
          />
        </Card>
      </Grid>

      {addFormRendered}
    </Grid>
  )
}

export default List
