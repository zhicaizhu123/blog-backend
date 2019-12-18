// 授权
const checkUserIsNotSelf = async (ctx, next) => {
  if (ctx.params.id === ctx.state.user.id) {
    ctx.throw(417, '本人不能关注自己')
  }
  await next()
}

module.exports = checkUserIsNotSelf
