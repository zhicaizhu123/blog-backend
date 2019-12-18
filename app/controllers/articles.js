// const ArticleType = require('../models/dictionary/acticle-types')
const Article = require('../models/articles')

class ArticleCtl {
  // 查询文章列表
  async find(ctx) {
    const { type, keyword, pageSize = 10, pageIndex = 1 } = ctx.query
    const size = Math.max(+pageSize, 1)
    const index = Math.max(+pageIndex, 1) - 1
    const reg = new RegExp(keyword, 'i')
    const params = {
      $or: [{ title: reg }, { content: reg }]
    }
    if (type) {
      params.type = type
    }
    const total = await Article.count(params)
    const list = await Article.find(params)
      .limit(size)
      .skip(index * size)
      .populate('type author')

    ctx.success({
      data: {
        list,
        page: {
          size,
          index,
          total,
          count: Math.ceil(total / size)
        }
      }
    })
  }

  // 查询文章信息
  async findById(ctx) {
    const article = await Article.findById(ctx.params.id).populate(
      'type author'
    )
    if (!article) {
      ctx.throw(404, '文章不存在')
    }
    ctx.success({ data: article, msg: '查询成功' })
  }

  // 创建文章
  async create(ctx) {
    ctx.verifyParams({
      title: { type: 'string' }, // 文章标题
      description: { type: 'string', required: false }, // 文章描述
      type: { type: 'array', itemType: 'string' }, // 文章分类id列表
      cover: { type: 'string', required: false }, // 文章封面
      content: { type: 'string' } // 文章内容
    })
    const article = await new Article({
      ...ctx.request.body,
      author: ctx.state.user.id
    }).save()
    ctx.success({ data: article, msg: '创建成功' })
  }

  // 更新文章信息
  async update(ctx) {
    ctx.verifyParams({
      title: { type: 'string', required: false }, // 文章标题
      description: { type: 'string', required: false }, // 文章描述
      type: { type: 'array', itemType: 'string', required: false }, // 文章分类id列表
      cover: { type: 'string', required: false }, // 文章封面
      content: { type: 'string', required: false } // 文章内容
    })
    const article = await Article.findById(ctx.params.id)
    if (!article) {
      ctx.throw(404, '文章不存在')
    }
    console.log(article.author)
    if (article.author !== ctx.state.user.id) {
      ctx.throw(403, '没有权限')
    }
    Object.keys(ctx.request.body).forEach(key => {
      article[key] = ctx.request.body[key]
    })
    const data = await article.save()
    ctx.success({ data, msg: '文章更新成功' })
  }

  // 删除某个文章
  async delete(ctx) {
    const article = await Article.findByIdAndRemove(ctx.params.id)
    if (!article) {
      ctx.throw(404, '文章不存在')
    }
    ctx.success({ msg: '删除成功' })
  }
}

module.exports = new ArticleCtl()
