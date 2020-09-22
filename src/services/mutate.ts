import { AxiosRequestConfig } from 'axios'
import { mutate as mutation } from 'swr'

import { fetcher } from './request'

const mutate = async <Response = Promise<any>>(url: string, config?: AxiosRequestConfig, shouldRevalidate?: boolean) => {
  const data: Response = await mutation(url, fetcher.bind(this, url, config), shouldRevalidate)
  return data
}

export default mutate
