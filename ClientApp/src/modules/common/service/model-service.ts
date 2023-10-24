import axios from 'axios'
import Model from '../interfaces/model'
import { ModelServiceInterface } from './model-service-interface'

export default class ModelService<T extends Model> implements ModelServiceInterface {
  collectionName = ''
  APIPath = 'https://localhost:7025/api'
  constructor(collectionName?: string) {
    if (collectionName) this.collectionName = collectionName

  }

  public async fetch(): Promise<T[]> {
    try {
      const response = await axios.get(`${this.APIPath}/${this.collectionName}`)

      return response.data as T[]
    } catch (error) {
      throw error
    }
  }

  public async get(id: number): Promise<T> {
    try {
      const response = await axios.get(`${this.APIPath}/${this.collectionName}/${id}`)

        return response.data as T
    } catch (error) {
      throw error
    }
  }

  public async put(id: number, data: any): Promise<T> {
    try {
      const response = await axios.put(`${this.APIPath}/${this.collectionName}/${id}`, data)

        return response.data as T
    } catch (error) {
      throw error
    }
  }

  public async store(data: any): Promise<T> {
    try {
      const response = await axios.post(`${this.APIPath}/${this.collectionName}`, data)

        return response.data as T
    } catch (error) {
      throw error
    }
  }

  public async delete(id: number): Promise<boolean> {
    try {
      await axios.delete(`${this.APIPath}/${this.collectionName}/${id}`)

      return true
    } catch (error) {
      console.error(error)

      return false
    }
  }
}
