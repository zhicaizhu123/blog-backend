const mongoose = require('mongoose')
const { Schema, model } = mongoose

const LifeScheme = new Schema(
  {
    __v: { type: Number, select: false },
    title: { type: String, maxlength: 20, required: true }, // 生活记录标题
    description: { type: String, maxlength: 100, default: '' }, // 生活记录描述
    type: [{ type: String, required: true, ref: 'LifeType' }],
    cover: { type: String, default: '' }, // 生活记录封面
    pictures: {
      type: [
        {
          title: String,
          url: String
        }
      ],
      default: [],
      select: false
    }, // 生活记录照
    content: { type: String, required: true }, // 生活记录内容
    author: { type: String, required: true, ref: 'User' } // 生活记录作者
  },
  { timestamps: true }
)

module.exports = model('Life', LifeScheme)
