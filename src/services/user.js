import { requestAuth } from './generic'

// userType = Distributor/Wirehouse_owner
const getUser = async (id, userType) =>
  await requestAuth({ url: `${userType}/${id}`, method: 'get' })

const getUsers = async (userType) =>
  await requestAuth({ url: `${userType}`, method: 'get' })

const createUser = async (data, userType) =>
  await requestAuth({ url: `${userType}`, method: 'post', data })

export { getUser, getUsers, createUser }
