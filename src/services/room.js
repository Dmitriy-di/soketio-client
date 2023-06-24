import { request } from './generic'

// userType = Distributor/Wirehouse_owner
const getRoom = async (id) =>
  await request({ url: `Room/${id}`, method: 'get' })

const getRooms = async () => await request({ url: `Room`, method: 'get' })

const createRoom = async (data) =>
  await request({ url: `Room`, method: 'post', data })

export { getRoom, getRooms, createRoom }
