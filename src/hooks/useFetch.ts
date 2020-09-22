import { AxiosRequestConfig } from 'axios'
import useSWR, { ConfigInterface } from 'swr'
import { fetcherFn } from 'swr/dist/types'

import { fetcher } from '~/services/request'

const useFetch = <Data = any, Error = any>(
  url: string,
  axiosConfig?: AxiosRequestConfig,
  swrConfig?: ConfigInterface<Data, Error, fetcherFn<Data>>
) => {
  const swr = useSWR<Data, Error>(url, fetcher.bind(this, url, axiosConfig), swrConfig)
  return { ...swr }
}

export default useFetch
