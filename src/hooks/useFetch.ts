import { AxiosRequestConfig } from 'axios'
import useSWR from 'swr'

import { fetcher } from '~/services/request'

const useFetch = <Data = any, Error = any>(url: string, config?: AxiosRequestConfig) => {
  const { data, error } = useSWR<Data, Error>(url, fetcher.bind(this, url, config))
  return { data, error }
}

export default useFetch
