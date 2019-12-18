const path = require('path')

class CommonCtl {
  // 用户登录
  async upload(ctx) {
    const file = ctx.request.files.file
    const basename = path.basename(file.path)
    ctx.success({
      data: { url: `${ctx.origin}/upload/${basename}` },
      msg: '上传成功'
    })
  }
}

module.exports = new CommonCtl()
