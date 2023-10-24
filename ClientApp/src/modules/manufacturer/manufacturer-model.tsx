import Entity from 'src/modules/common/interfaces/entity'

import TextField from 'src/modules/common/fields/text'
import { DynamicField } from 'src/components/form/update'
import TextColumn from 'src/modules/common/columns/text'
import { AnyObjectSchema } from 'yup'

import * as yup from 'yup'
import ModelService from '../common/service/model-service'
import SimpleModel from '../common/interfaces/simple-model'

export default class Manufacturer implements SimpleModel, Entity {
  id!: number | null
  name!: string
  createdAt?: Date
  updatedAt?: Date

  service: ModelService<SimpleModel>

  constructor(data?: SimpleModel) {
    if (data) this.setData(data)
    else this.clear()

    this.service = new ModelService<SimpleModel>('Manufacturers')
  }


  setData(data: SimpleModel) {
    this.id = data.id || null
    this.name = data.name || ''

    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt

  }


  clear() {
    this.id =null
    this.name = ''

    this.createdAt = undefined
    this.updatedAt = undefined
  }

  fields(): DynamicField[] {
    return [
      {
        name: 'name',
        component: props => <TextField {...props} required label='Nome' />
      },
    ]
  }

  columns() {
    return [TextColumn({ name: 'name', headerName: 'Nome' })]
  }

  schema(): AnyObjectSchema {
    return yup.object().shape({
      name: yup.string().min(4).max(120).required()
    })
  }

  title(type: 'list' | 'form') {
    switch (type) {
      case 'list':
        return 'Fabricantes'
      case 'form':
        if (!this.id) return 'Novo fabricante'

        return 'Editar fabricante'
    }
  }

  async get(id: number) {
    this.setData(await this.service.get(id))
  }

  async save() {
    const promise = this.id ? this.service.put(this.id!, {
      Id: this.id,
      Name: this.name
    }) : this.service.store({
      Name: this.name
    })
    promise.then(resp => this.setData(resp))

    return promise
  }

  async delete() {
    if (!this.id) throw new Error('id is required for this!')
    const promise = this.service.delete(this.id!)
    promise.then(() => this.clear())

    return promise
  }
}
