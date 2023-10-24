export interface ModelServiceInterface {
  fetch: () => Promise<any[]>
  get: (id: number) => Promise<any>
  put: (id: number, data: any) => Promise<any>
  store: (data: any) => Promise<any>
  delete: (id: number) => Promise<boolean>
}
