import { AxiosRequestConfig } from 'axios'
import { mutate as mutation } from 'swr'

import { fetcher } from './request'

const mutate = async <Response = Promise<any>>(url: string, config?: AxiosRequestConfig) => {
  const data: Response = await mutation(url, fetcher.bind(this, url, config))
  return data
}

export default mutate
