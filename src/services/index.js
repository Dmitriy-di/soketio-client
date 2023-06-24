// const getModules = require('../services/modules.service')
const users = require('./user')
const chatHistory = require('./chatHistory')

module.exports = {
  ...users,
  ...chatHistory,
}
