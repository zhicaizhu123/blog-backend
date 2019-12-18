module.exports = function(app, options) {
  const { defaultStatus, defaultMsg } = options || {}

  app.context.success = function({ status, msg, data }) {
    this.body = {
      status: status || defaultStatus || 200,
      msg: msg || defaultMsg || 'success',
      data: data || null
    }
  }

  return async function success(ctx, next) {
    try {
      await next()
    } catch (err) {
      throw err
    }
  }
}
