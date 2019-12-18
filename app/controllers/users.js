const jsonwebtoken = require('jsonwebtoken')
const User = require('../models/users')
const config = require('../config')

// 获取某用户的基本信息
const getUserById = async (ctx, id) => {
  const user = await User.findById(id).select(
    '+avatar +cover +gender +headline +github +homepage +articles +followers +lifes'
  )
  if (!user) {
    ctx.throw(404, '用户不存在')
  }
  ctx.success({ data: user, msg: '查询成功' })
}

class UserCtl {
  // 用户登录
  async login(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: true },
      password: { type: 'string', required: true }
    })
    const user = await User.findOne(ctx.request.body)
    if (!user) {
      ctx.throw(401, '账号或密码不正确')
    }
    const token = jsonwebtoken.sign({ id: user._id }, config.secret, {
      expiresIn: '1d'
    })
    ctx.success({ data: { token }, msg: '登录成功' })
  }

  // 查询用户列表
  async find(ctx) {
    const users = await User.find()
    ctx.success({ data: users })
  }

  // 查询某用户信息
  async findById(ctx) {
    await getUserById(ctx, ctx.params.id)
  }

  async findMe(ctx) {
    await getUserById(ctx, ctx.state.user.id)
  }

  // 创建用户
  async create(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: true },
      password: { type: 'string', required: true }
    })
    const { name } = ctx.request.body
    const repeatedUser = await User.findOne({ name })
    if (repeatedUser) {
      ctx.throw(409, '用户已存在')
    }
    const user = await new User(ctx.request.body).save()
    ctx.success({ data: user, msg: '创建成功' })
  }

  // 更新用户信息
  async update(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: false }, // 用户名称
      password: { type: 'string', required: false }, // 密码
      avatar: { type: 'string', required: false }, // 头像 // 个人主页封面
      cover: { type: 'string', required: false }, // 个人博客页面封面
      gender: { type: 'number', required: false }, // 1-男 2-女
      headline: { type: 'string', required: false }, // 一句话简介
      github: { type: 'string', required: false }, // github连接
      homepage: { type: 'string', required: false }, // 个人主页
      articles: { type: 'array', itemType: 'string', required: false }, // 个人文章id
      followers: { type: 'array', itemType: 'string', required: false }, // 个人粉丝id
      lifes: { type: 'array', itemType: 'string', required: false } // 个人生活记录id
    })
    const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body)
    if (!user) {
      ctx.throw(404, '用户不存在')
    }
    ctx.success({ data: user, msg: '用户更新成功' })
  }

  // 删除某个用户
  async delete(ctx) {
    const user = await User.findByIdAndRemove(ctx.params.id)
    if (!user) {
      ctx.throw(404, '用户不存在')
    }
    ctx.success({ msg: '删除成功' })
  }

  // 获取用户文章列表
  async findUserArticle(ctx) {
    const { id } = ctx.params
    User.findand
    const user = await User.findById(id).populate('articles')
    ctx.success({ data: user.articles })
  }

  // 关注成为某人的粉丝
  async follow(ctx) {
    const { id } = ctx.params
    const user = await User.findById(id).select('+followers')
    if (!user) {
      ctx.throw(404, '用户不存在')
    }
    if (user.followers.includes(ctx.state.user.id)) {
      ctx.success({ msg: '您已经关注过该用户' })
    } else {
      user.followers.push(ctx.state.user.id)
      user.save()
      ctx.success({ data: null, msg: '关注成功' })
    }
  }

  // 取消关注为某人的粉丝
  async unfollow(ctx) {
    const { id } = ctx.params
    const user = await User.findById(id).select('+followers')
    if (!user) {
      ctx.throw(404, '用户不存在')
    }
    const index = user.followers.indexOf(ctx.state.user.id)
    if (index === -1) {
      ctx.success({ msg: '您还未关注过该用户' })
    } else {
      user.followers.splice(index, 1)
      user.save()
      ctx.success({ data: null, msg: '取消成功' })
    }
  }

  // 获取某人的粉丝
  async followers(ctx) {
    const { id } = ctx.params
    const user = await User.findById(id).populate('followers')
    if (!user) {
      ctx.throw(404, '用户不存在')
    }
    ctx.success({ data: user.followers })
  }

  // 获取关注了谁
  async followList(ctx) {
    const { id } = ctx.params
    const users = await User.find({ followers: id }).select('+avatar')
    ctx.success({ data: users })
  }
}

module.exports = new UserCtl()
