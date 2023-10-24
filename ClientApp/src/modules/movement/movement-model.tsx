import Entity from 'src/modules/common/interfaces/entity'

import TextField from 'src/modules/common/fields/text'
import { DynamicField } from 'src/components/form/update'
import TextColumn from 'src/modules/common/columns/text'
import { AnyObjectSchema } from 'yup'

import * as yup from 'yup'
import ModelService from '../common/service/model-service'
import MovementInterface from './movement-interface'
import DateTimePicker from '../common/fields/date-time'
import MovementService from './movement-service'
import AutocompleteField from '../common/fields/autocomplete'
import Product from '../product/product-model'

export default class Movement implements MovementInterface, Entity {
  id!: number | null
  createdAt?: Date
  updatedAt?: Date
  type = 0
  typeText = ''
  quantity = 0
  movementedAt: Date | null = null
  stockId = -1
  stockName?: string | undefined
  productId = -1
  productName?: string | undefined

  service: ModelService<MovementInterface>

  products: Product[] = []

  Product?: Product

  constructor(type: number, data?: MovementInterface) {
    if (data) this.setData(data)
    else this.clear()

    this.type = type

    if ( type === 1) this.typeText = 'Saída'
    else this.typeText = 'Entrada'

    this.service = new MovementService(type)
  }


  setData(data: MovementInterface) {
    this.id = data.id || null


    this.type = data.type
    this.typeText = data.typeText
    this.quantity = data.quantity
    this.movementedAt = data.movementedAt
    this.stockId = data.stockId
    this.stockName = data.stockName
    this.productId = data.productId
    this.productName = data.productName

    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt


    const _productsService = new ModelService<Product>('Products')
    _productsService.fetch().then((data) => {
      this.products = data
      this.Product = data.find(s => s.id === this.productId)
    })
  }


  clear() {
    this.id = null

    this.type = 0
    this.typeText = ''
    this.quantity = 0
    this.movementedAt = null
    this.stockId = -1
    this.stockName = ''
    this.productId = -1
    this.productName = ''

    this.createdAt = undefined
    this.updatedAt = undefined
  }

  fields(): DynamicField[] {
    return [
      {
        name: 'productName',
        component: props => <AutocompleteField {...props} label='Produto' options={this.products} valueTag='id' title='name' />
      },
      {
        name: 'quantity',
        component: props => <TextField {...props} type='number' required label='Quantidade' />
      },
      {
        name: 'movementedAt',
        component: props => <DateTimePicker {...props} required label='Data e hora' />
      },
    ]
  }

  columns() {
    return [
      TextColumn({ name: 'productName', headerName: 'Produto' }),
      TextColumn({ name: 'quantity', headerName: 'Quantidade' }),
      TextColumn({ name: 'movementedAt', headerName: 'Data e hora' }),
    ]
  }

  schema(): AnyObjectSchema {
    return yup.object().shape({
      name: yup.string().min(4).max(120).required()
    })
  }

  title(type: 'list' | 'form') {
    switch (type) {
      case 'list':
        return this.typeText + 's'
      case 'form':
        if (!this.id) return 'Nova ' + this.typeText

        return 'Editar ' + this.typeText
    }
  }

  async get(id: number) {
    this.setData(await this.service.get(id))
  }

  async save() {
    const promise = this.id ? this.service.put(this.id!, this) : this.service.store(this)
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
