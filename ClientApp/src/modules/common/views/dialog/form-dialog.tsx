import Entity from '../../interfaces/entity'
import UpdateForm, { DynamicFormProps } from 'src/components/form/update'
import { Button, Dialog, DialogContent, DialogTitle, IconButton, IconButtonProps, Slide, SlideProps, Typography } from '@mui/material'
import { ReactElement, Ref, forwardRef, useCallback } from 'react'
import * as yup from 'yup'
import { pt } from 'yup-locale-pt'
import Icon from 'src/@core/components/icon'
import { styled } from '@mui/material/styles'


const Transition = forwardRef(function Transition(
  props: SlideProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />
})

const CustomCloseButton = styled(IconButton)<IconButtonProps>(({ theme }) => ({
  top: 0,
  right: 0,
  color: 'grey.500',
  position: 'absolute',
  boxShadow: theme.shadows[2],
  transform: 'translate(10px, -10px)',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: `${theme.palette.background.paper} !important`,
  transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
  '&:hover': {
    transform: 'translate(7px, -5px)'
  }
}))

export default function UpdateModelDialog({ data, model, opened, onClose, afterSave }: { model: Entity, data?: any, opened: boolean, onClose: () => void, afterSave?: (model: Entity) => void }) {

  yup.setLocale(pt)

  const withRelations = useCallback(() => {
    return model.relations && model.relations().length > 0 ? true : false
  }, [model])


  function onSubmit(data: any) {
    model.setData(data)

    const promise = model.save()
    promise.then((resp : any) => {
      if (afterSave) afterSave(resp)
    })

    return promise
  }

  const formProps: DynamicFormProps = {
    title: model.title('form'),
    yupSchema: model.schema!(),
    fields: model.fields(),
    onSubmit
  }

  return (
    <Dialog
      scroll='body'
      open={opened}
      keepMounted
      TransitionComponent={Transition}
      aria-labelledby='info-dialog-slide-title'
      aria-describedby='info-dialog-slide-description'
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
      disableEscapeKeyDown
      onClose={(event, reason) => {
        if (reason !== 'backdropClick') {
          onClose()
        }
      }}
    >
      <DialogTitle
        sx={{ alignItems: 'center', alignContent: 'center', justifyContent: 'space-between', display: 'flex', marginBottom: 1 }}
      >
      <Typography sx={{ ml: 2 }}>
        <b>{model.title('form')}</b>
      </Typography>
        <div>
          {withRelations() && (<Button variant='outlined' color='info' size='small' endIcon={<Icon icon='mingcute:external-link-line' />}>Cadastro completo</Button>)}
          <CustomCloseButton aria-label='close' onClick={() => onClose()}>
            <Icon icon='tabler:x' fontSize='1.25rem' />
          </CustomCloseButton>
        </div>
      </DialogTitle>
      <DialogContent>
        <UpdateForm {...formProps} record={data} />
      </DialogContent>
    </Dialog>
  )
}
