import axios from 'axios'
import Movement from './movement-model'
import ModelService from '../common/service/model-service'

export default class MovementService extends ModelService<Movement> {

  type: number

  constructor(type: number) {

    super()

    this.collectionName = 'Movements'
    this.type = type
  }

  public async fetch(): Promise<Movement[]> {
    try {
      const response = await axios.get(`${this.APIPath}/${this.collectionName}/${this.type}`)

      return response.data as Movement[]
    } catch (error) {
      throw error
    }
  }
}
