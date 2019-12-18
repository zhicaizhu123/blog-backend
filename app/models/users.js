const mongoose = require('mongoose')
const { Schema, model } = mongoose

const userSchema = new Schema(
  {
    __v: { type: Number, select: false },
    name: { type: String, required: true }, // 用户名
    password: { type: String, required: true, select: false }, // 密码
    avatar: { type: String, default: '' }, // 个人头像
    cover: { type: String, select: false }, // 个人封面图
    gender: { type: Number, enum: [1, 2], default: 1, select: false }, // 1-男 2-女
    headline: { type: String, default: '', select: false }, // 一句话简介
    github: { type: String, default: '', select: false }, // github地址
    homepage: { type: String, default: '', select: false }, // 个人主页地址
    employment: { type: String, default: '', select: false }, // 职业
    // 个人文章id列表
    articles: {
      type: [{ type: String, ref: 'Article' }],
      select: false
    },
    // 个人粉丝
    followers: {
      type: [{ type: String, ref: 'User' }],
      select: false
    },
    // 个人生活记录id列表
    lifes: {
      type: [{ type: String }],
      select: false
    }
  },
  { timestamps: true }
)

module.exports = model('User', userSchema)
