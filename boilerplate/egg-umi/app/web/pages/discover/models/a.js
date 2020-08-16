import { fetchList } from '../services/s'

export default {
  namespace: 'discover',
  state: {
    name: 'dis',
    age: 0,
  },
  effects: {
    *fetchList({ payload }, { call, put }) {
      const rs = yield call(fetchList, payload)
      yield put({
        type: 'setList',
        payload: rs.data.result,
      })
    },
  },
  reducers: {
    setList(state, { payload }) {
      return { ...state, ...payload }
    },
  },
}
