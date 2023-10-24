import { GridColDef } from '@mui/x-data-grid'
import { TFunction } from 'i18next'
import { DynamicField } from 'src/components/form/update'
import { AnyObjectSchema } from 'yup'
import { ModelServiceInterface } from '../service/model-service-interface'
import Model from './model'

export interface Relation {
  name: string
  title?: string
  icon?: string
  data: any[]

  columns: (t?: TFunction<'translation', undefined, 'translation'>) => GridColDef[]

  readOnly?: boolean
  schema?: () => AnyObjectSchema
  fields?: (t?: TFunction<'translation', undefined, 'translation'>) => DynamicField[]
}

export default interface Entity extends Model {
  service: ModelServiceInterface
  master?: any[]

  setData: (data: any) => void
  clear: () => void
  get: (id: any) => void
  save: () => Promise<any> | any
  delete: () => Promise<any> | any

  title: (type: 'list' | 'form', t?: TFunction<'translation', undefined, 'translation'>) => string

  cloneFrom?: (id: string | number) => void
  cloneTo?: (id: string | number) => any

  schema?: () => AnyObjectSchema

  fields: (t?: TFunction<'translation', undefined, 'translation'>) => DynamicField[]
  columns: (t?: TFunction<'translation', undefined, 'translation'>) => GridColDef[]
  relations?: () => Relation[]
}
