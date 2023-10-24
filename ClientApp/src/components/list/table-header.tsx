// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// ** Custom Component Import
import CustomTextField from '../../@core/components/mui/text-field'

// ** Icon Imports
import Icon from '../../@core/components/icon'
import Grid from '@mui/material/Grid'

interface TableHeaderProps {
  value: string
  addButtonText?: string
  onAddClick?: () => void
  handleFilter: (val: string) => void
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { handleFilter, onAddClick, value, addButtonText } = props

  return (
    <Box
      sx={{
        py: 4,
        px: 6,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Grid container spacing={6}>
        <Grid item xs sx={{ alignItems: 'center' }}>
            <CustomTextField
              fullWidth
              value={value}
              placeholder='Pesquise por qualquer coisa'
              onChange={e => handleFilter(e.target.value)}
              onBlur={e => handleFilter(e.target.value)}
            />
          </Grid>
          {onAddClick ? (
            <Grid item xs={4} md={3} lg={2}>
              <Button fullWidth onClick={onAddClick!} variant='contained' sx={{ '& svg': { mr: 2 } }}>
                <Icon fontSize='1.125rem' icon='tabler:plus' />
                {addButtonText!}
              </Button>
            </Grid>
          ) : null}
      </Grid>
    </Box>
  )
}

export default TableHeader
