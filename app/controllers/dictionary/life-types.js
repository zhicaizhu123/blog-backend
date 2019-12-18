const LifeType = require('../../models/dictionary/life-types')

class LifeTypeCtl {
  // 查询生活记录类型列表
  async find(ctx) {
    const lifeTypes = await LifeType.find()
    ctx.success({ data: lifeTypes })
  }

  // 创建生活记录类型
  async create(ctx) {
    ctx.verifyParams({
      label: { type: 'string' } // 生活记录分类
    })
    const lifeType = await new LifeType({ ...ctx.request.body }).save()
    ctx.success({ data: lifeType, msg: '创建成功' })
  }

  // 更新生活记录类型
  async update(ctx) {
    ctx.verifyParams({
      label: { type: 'string' } // 生活记录分类
    })
    const { label } = ctx.request.body
    const lifeType = await LifeType.findByIdAndUpdate(
      ctx.params.id,
      {
        label
      },
      { new: true }
    )
    if (!lifeType) {
      ctx.throw(404, '生活记录类型不存在')
    }
    ctx.success({ data: lifeType, msg: '生活记录更新成功' })
  }

  // 删除生活记录类型
  async delete(ctx) {
    const lifeType = await LifeType.findByIdAndRemove(ctx.params.id)
    if (!lifeType) {
      ctx.throw(404, '生活记录类型不存在')
    }
    ctx.success({ msg: '删除成功' })
  }
}

module.exports = new LifeTypeCtl()
