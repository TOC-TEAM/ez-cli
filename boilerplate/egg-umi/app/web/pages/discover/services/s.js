import { get } from 'js/request'

export function fetchList() {
  return get('/restapi/shopping/v2/menu')
}
