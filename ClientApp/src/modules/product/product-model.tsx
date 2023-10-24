import Entity from 'src/modules/common/interfaces/entity'

import TextField from 'src/modules/common/fields/text'
import { DynamicField } from 'src/components/form/update'
import TextColumn from 'src/modules/common/columns/text'
import { AnyObjectSchema } from 'yup'

import * as yup from 'yup'
import ModelService from '../common/service/model-service'
import ProductInterface from './product-interface'
import CurrencyField from '../common/fields/currency'
import SimpleModel from '../common/interfaces/simple-model'
import AutocompleteField from '../common/fields/autocomplete'
import { currency } from 'src/@core/utils/format'

export default class Product implements ProductInterface, Entity {
  id!: number | null
  name!: string
  description?: string
  price!: number
  productTypeId!: number
  manufacturerId!: number
  createdAt?: Date
  updatedAt?: Date

  productTypeName?: string
  manufacturerName?: string

  ProductType?: SimpleModel
  Manufacturer?: SimpleModel

  productTypes: SimpleModel[] = []
  manufacturers: SimpleModel[] = []

  service: ModelService<ProductInterface>

  constructor(data?: ProductInterface) {
    if (data) this.setData(data)
    else this.clear()

    this.service = new ModelService<ProductInterface>('Products')

    const _productTypesService = new ModelService<SimpleModel>('ProductTypes')
    _productTypesService.fetch().then((data) => {
      this.productTypes = data
      this.ProductType = data.find(s => s.id === this.productTypeId)
    })

    const _manufacturersService = new ModelService<SimpleModel>('Manufacturers')
    _manufacturersService.fetch().then((data) => {
      this.manufacturers = data
      this.Manufacturer = data.find(s => s.id === this.manufacturerId)
    })
  }


  setData(data: ProductInterface) {
    this.id = data.id || null
    this.name = data.name || ''
    this.description = data.description
    this.price = data.price || 0
    this.productTypeId = data.productTypeId
    this.manufacturerId = data.manufacturerId

    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt

  }


  clear() {
    this.id =null
    this.name = ''
    this.description = undefined
    this.price = 0
    this.productTypeId = -1
    this.manufacturerId = -1

    this.createdAt = undefined
    this.updatedAt = undefined
  }

  fields(): DynamicField[] {
    return [
      {
        name: 'name',
        component: props => <TextField {...props} required label='Nome' />
      },
      {
        name: 'description',
        component: props => <TextField {...props} label='Descrição' />
      },
      {
        name: 'price',
        component: props => <CurrencyField {...props} required label='Valor unitário' />
      },
      {
        name: 'manufacturerId',
        component: props => <AutocompleteField options={this.manufacturers} valueTag='id' title='name' {...props} label='Fabricante' />
      },
      {
        name: 'productTypeId',
        component: props => <AutocompleteField options={this.productTypes} valueTag='id' title='name' {...props} label='Tipo do produto' />
      }
    ]
  }

  columns() {
    return [
      TextColumn({ name: 'name', headerName: 'Nome' }),
      TextColumn({ name: 'price', headerName: 'Valor unitário', formatValue: (record) => currency(record.price as number) }),
      TextColumn({ name: 'productTypeName', headerName: 'Tipo' }),
      TextColumn({ name: 'manufacturerName', headerName: 'Fabricante' })
  ]
  }

  schema(): AnyObjectSchema {
    return yup.object().shape({
      name: yup.string().min(4).max(120).required(),
      price: yup.string().required(),
      manufacturerId: yup.number().required(),
      productTypeId: yup.number().required(),
    })
  }

  title(type: 'list' | 'form') {
    switch (type) {
      case 'list':
        return 'Produtos'
      case 'form':
        if (!this.id) return 'Novo produto'

        return 'Editar produto'
    }
  }

  async get(id: number) {
    this.setData(await this.service.get(id))
  }

  async save() {
    const promise = this.id ? this.service.put(this.id!, {
      Id: this.id,
      ManufacturerId: this.manufacturerId,
      ProductTypeId: this.productTypeId,
      Name: this.name,
      Price: this.price,
      Description: this.description
    }) : this.service.store({
      ManufacturerId: this.manufacturerId,
      ProductTypeId: this.productTypeId,
      Name: this.name,
      Price: this.price,
      Description: this.description
    })
    promise.then(resp => {
      this.ProductType = this.productTypes.find(s => s.id === this.productTypeId)
      this.Manufacturer = this.manufacturers.find(s => s.id === this.manufacturerId)
      this.manufacturerName = this.Manufacturer!.name
      this.productTypeName = this.ProductType!.name
      this.setData({...resp, manufacturerName: this.manufacturerName, productTypeName: this.productTypeName})}
      )

    return promise
  }

  async delete() {
    if (!this.id) throw new Error('id is required for this!')
    const promise = this.service.delete(this.id!)
    promise.then(() => this.clear())

    return promise
  }
}
