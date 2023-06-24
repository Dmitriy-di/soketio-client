import { requestAuth } from './generic'

const enter = async (data) =>
  await requestAuth({ url: `login`, data, method: 'post' })

export { enter }
