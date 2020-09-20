import Axios, { AxiosRequestConfig } from 'axios'
import process from 'process'

export interface DefaultRequestProps {
  codigoSituacao: number;
  nomeSituacao: string;
}

interface FetcherProps {
  (url: string, config?: AxiosRequestConfig): Promise<any>;
}

function isJSON (text: string) {
  try {
    JSON.parse(text)
  } catch (e) {
    return false
  }
  return true
}

function isNumber (text: string) {
  if (/^[-|+]{0,1}\d+$/.test(text)) {
    return true
  }
  return false
}

function transform (text: string) {
  if (isJSON(text)) {
    return JSON.parse(text, (key, value) => {
      if (isNumber(value) && /(cpf|cnpj)/i.test(key) === false) {
        if (typeof value === 'number') {
          return value
        }
        return parseInt(value, 10)
      }
      return value
    })
  }
  return text
}

const axios = Axios.create({
  baseURL: 'http://177.136.123.146',
  method: 'POST',
  headers: {
    token: 'f1b28efe-fc70-4822-8da9-99ea2f2bfde3',
    sys: 'ADM'
  },
  timeout: 30000,
  timeoutErrorMessage: 'Tente novamente em instantes',
  transformResponse: transform
})

axios.interceptors.response.use((response) => response, ({ message }) => Promise.reject(message))

export const fetcher: FetcherProps = async (url, config) => {
  const { data } = await axios({ url, ...config })
  return data
}

export default axios
