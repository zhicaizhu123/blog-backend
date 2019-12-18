const ArticleType = require('../../models/dictionary/acticle-types')

class ArticleTypeCtl {
  // 查询文章类型列表
  async find(ctx) {
    const articleTypes = await ArticleType.find()
    ctx.success({ data: articleTypes })
  }

  // 创建文章类型
  async create(ctx) {
    ctx.verifyParams({
      label: { type: 'string' } // 文章分类
    })
    const articleType = await new ArticleType(ctx.request.body).save()
    ctx.success({ data: articleType, msg: '创建成功' })
  }

  // 更新文章类型
  async update(ctx) {
    ctx.verifyParams({
      label: { type: 'string' } // 文章分类
    })
    const { label } = ctx.request.body
    const articleType = await ArticleType.findByIdAndUpdate(
      ctx.params.id,
      {
        label
      },
      { new: true }
    )
    if (!articleType) {
      ctx.throw(404, '文章类型不存在')
    }
    ctx.success({ data: articleType, msg: '文章更新成功' })
  }

  // 删除文章类型
  async delete(ctx) {
    const articleType = await ArticleType.findByIdAndRemove(ctx.params.id)
    if (!articleType) {
      ctx.throw(404, '文章类型不存在')
    }
    ctx.success({ msg: '删除成功' })
  }
}

module.exports = new ArticleTypeCtl()
