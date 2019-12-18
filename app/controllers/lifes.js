const Life = require('../models/lifes')

class LifeCtl {
  // 查询生活记录列表
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
    const total = await Life.count(params)
    const list = await Life.find(params)
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

  // 查询生活记录信息
  async findById(ctx) {
    const life = await Life.findById(ctx.params.id).populate('type author')
    if (!life) {
      ctx.throw(404, '生活记录不存在')
    }
    ctx.success({ data: life, msg: '查询成功' })
  }

  // 创建生活记录
  async create(ctx) {
    ctx.verifyParams({
      title: { type: 'string' }, // 生活记录标题
      description: { type: 'string', required: false }, // 生活描述
      type: { type: 'array', itemType: 'string', required: false }, // 生活记录分类id列表
      cover: { type: 'string', required: false }, // 生活记录封面
      content: { type: 'string' }, // 生活记录内容
      pictures: { type: 'array', itemType: 'object', required: false } // 生活记录照
    })
    const life = await new Life({
      ...ctx.request.body,
      author: ctx.state.user.id
    }).save()
    ctx.success({ data: life, msg: '创建成功' })
  }

  // 更新用户信息
  async update(ctx) {
    ctx.verifyParams({
      title: { type: 'string', required: false }, // 生活记录id
      description: { type: 'string', required: false }, // 生活描述
      type: { type: 'array', itemType: 'string', required: false }, // 生活记录分类id列表
      cover: { type: 'string', required: false }, // 生活记录封面
      content: { type: 'string', required: false } // 生活记录内容
    })
    const life = await Life.findById(ctx.params.id)
    if (!life) {
      ctx.throw(404, '生活记录不存在')
    }
    if (life.author !== ctx.state.user.id) {
      ctx.throw(403, '没有权限')
    }
    Object.keys(ctx.request.body).forEach(key => {
      life[key] = ctx.request.body[key]
    })
    const data = await life.save()
    ctx.success({ data, msg: '生活记录更新成功' })
  }

  // 删除某个用户
  async delete(ctx) {
    const life = await Life.findByIdAndRemove(ctx.params.id)
    if (!life) {
      console.log('haha')
      ctx.throw(404, '生活记录不存在')
    }
    ctx.success({ msg: '删除成功' })
  }
}

module.exports = new LifeCtl()
