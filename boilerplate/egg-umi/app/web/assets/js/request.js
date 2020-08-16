import axios from 'axios'

const config = {
  baseURL: '',
}

export const get = (url, config) => {
  return axios.request({
    url,
    method: 'GET',
    ...config,
  })
}

export const post = (url, data, config) => {
  return axios.request({
    url,
    data,
    method: 'POST',
    ...config,
  })
}
