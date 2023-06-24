import { request } from './generic'

// userType = Distributor/Wirehouse_owner
const getChatHistory = async (nameRoom) =>
  await request({
    url: `ChatHistory`,
    method: 'get',
    data: {
      nameRoom,
    },
  })

export { getChatHistory }
