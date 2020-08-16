import { get, post } from 'js/request'

export const createUser = data => {
  return post('/admin/create/user', data)
}
