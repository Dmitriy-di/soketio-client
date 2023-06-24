// const getModules = require('../services/modules.service')
const users = require('./user')
const chatHistory = require('./chatHistory')
const room = require('./room')

module.exports = {
  ...users,
  ...chatHistory,
  ...room,
}
