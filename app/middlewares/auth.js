const jsonwebtoken = require('jsonwebtoken')
const config = require('../config')

const auth = async (ctx, next) => {
  const { authorization = '' } = ctx.header
  const token = authorization.replace('Bearer ', '')
  try {
    const user = jsonwebtoken.verify(token, config.secret)
    ctx.state.user = user
  } catch (err) {
    ctx.throw(401, err.message)
  }
  await next()
}

module.exports = auth
