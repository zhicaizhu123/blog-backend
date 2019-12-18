// 授权
const checkUserIsSelf = async (ctx, next) => {
  if (ctx.params.id !== ctx.state.user.id) {
    ctx.throw(403, '没有权限')
  }
  await next()
}

module.exports = checkUserIsSelf
