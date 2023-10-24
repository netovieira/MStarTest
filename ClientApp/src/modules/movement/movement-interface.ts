import Model from "../common/interfaces/model";

export default interface MovementInterface extends Model {
  type: number
  typeText: string
  quantity: number
  movementedAt: Date | null
  stockId: number
  stockName?: string
  productId: number
  productName?: string
}
