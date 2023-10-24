import UpdateForm, { DynamicFormProps } from 'src/components/form/update'
import { Card, CardContent, CardHeader, Collapse, Grid, IconButton, Theme } from '@mui/material'
import { styled } from '@mui/material/styles'
import MuiTab, { TabProps } from '@mui/material/Tab'
import MuiTabList, { TabListProps } from '@mui/lab/TabList'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'
import { SyntheticEvent, useCallback, useState } from 'react'
import List from 'src/components/list'
import * as yup from 'yup'
import { pt } from 'yup-locale-pt'
import Icon from 'src/@core/components/icon'
import useMediaQuery from '@mui/material/useMediaQuery'
import Entity from '../../interfaces/entity'

// ** Styled Tab component
const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
  flexDirection: 'row',
  '& svg': {
    marginBottom: '0 !important',
    marginRight: theme.spacing(1.5)
  }
}))

const TabList = styled(MuiTabList)<TabListProps>(({ theme }) => ({
  borderBottom: '0 !important',
  '&, & .MuiTabs-scroller': {
    boxSizing: 'content-box',
    padding: theme.spacing(1.25, 1.25, 2),
    margin: `${theme.spacing(-1.25, -1.25, -2)} !important`
  },
  '& .MuiTabs-indicator': {
    display: 'none'
  },
  '& .Mui-selected': {
    boxShadow: theme.shadows[2],
    backgroundColor: theme.palette.primary[theme.palette.mode],
    color: `${theme.palette.common.white} !important`
  },
  '& .MuiTab-root': {
    lineHeight: 1,
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      color: theme.palette.primary[theme.palette.mode]
    }
  }
}))

export default function UpdateModelPage({ model, data }: { data?: any, model: Entity }) {

  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

  yup.setLocale(pt)

  const withRelations = useCallback(() => {
    return model.relations && model.relations().length > 0 ? true : false
  }, [model])

  //States
  const [activeTab, setActiveTab] = useState<string>(withRelations() ? model.relations!()[0].name : '')
  const [showed, showCard] = useState<boolean>(true)

  function handleChange(event: SyntheticEvent, value: string) {
    setActiveTab(value)
  }

  function onSubmit(data: any) {
    model.setData(data)

    return model.save()
  }

  const formProps: DynamicFormProps = {
    title: model.title('form'),
    yupSchema: model.schema!(),
    fields: model.fields(),
    onSubmit
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} {...(!!model.relations && { md: 5, lg: 4 })}>
        <Card>
          <CardHeader
            title={model.title('form')}
            {...(hidden
              && {
                  action: (
                    <IconButton onClick={() => showCard(!showed)}>
                      <Icon icon={!showed ? 'mingcute:down-fill' : 'mingcute:up-fill'} fontSize={20} />
                    </IconButton>
                  )
                })}
          />
          <Collapse in={showed}>
            <CardContent sx={{ p: 0 }}>
              <UpdateForm {...formProps} record={data} />
            </CardContent>
          </Collapse>
        </Card>
      </Grid>
      {withRelations() && (
        <Grid item xs={12} md={7} lg={8}>
          <TabContext value={activeTab}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <TabList
                  variant='scrollable'
                  scrollButtons='auto'
                  allowScrollButtonsMobile={true}
                  onChange={handleChange}
                  aria-label='forced scroll tabs example'
                  sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
                >
                  {model.relations!().map((tab, index) => (
                    <Tab key={index} value={tab.name} label={tab.title} icon={tab.icon} />
                  ))}
                </TabList>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                {model.relations!().map((tab, index) => (
                  <TabPanel sx={{ p: 0 }} value={tab.name} key={index}>
                    {tab.title}
                    <List columns={tab.columns()} data={tab.data || []} searchTerms='' />
                  </TabPanel>
                ))}
              </Grid>
            </Grid>
          </TabContext>
        </Grid>
      )}
    </Grid>
  )
}
