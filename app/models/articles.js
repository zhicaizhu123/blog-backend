const mongoose = require('mongoose')
const { Schema, model } = mongoose

const ArticleScheme = new Schema(
  {
    __v: { type: Number, select: false },
    title: { type: String, maxlength: 20, required: true }, // 文章标题
    description: { type: String, maxlength: 100, default: '' }, // 文章描述
    type: [{ type: String, required: true, ref: 'ArticleType' }],
    cover: { type: String, required: false, default: '' }, // 文章封面
    content: { type: String, required: true }, // 文章内容
    author: { type: String, required: true, ref: 'User' } // 文章作者
  },
  { timestamps: true }
)

module.exports = model('Article', ArticleScheme)
