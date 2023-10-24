import SimpleModel from "../common/interfaces/simple-model";

export default interface ProductInterface extends SimpleModel {
  description?: string
  price: number | 0
  productTypeId: number | -1
  manufacturerId: number | -1

  productTypeName?: string
  manufacturerName?: string
}
