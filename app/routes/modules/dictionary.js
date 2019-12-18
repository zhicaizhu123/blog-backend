const Router = require('koa-router')
const router = new Router({ prefix: '/api/dictionary' })
const auth = require('../../middlewares/auth')
const {
  find: findArticle,
  create: createArticle,
  update: updateArticle,
  delete: deleteArticle
} = require('../../controllers/dictionary/article-types')
const {
  find: findLife,
  create: createLife,
  update: updateLife,
  delete: deleteLife
} = require('../../controllers/dictionary/life-types')

// 查询文章类型列表
router.get('/article', findArticle)

// 新增文章类型
router.post('/article', auth, createArticle)

// 修改文章类型
router.patch('/article/:id', auth, updateArticle)

// 删除文章类型
router.delete('/article/:id', auth, deleteArticle)

// 查询生活记录类型列表
router.get('/life', findLife)

// 新增生活记录类型
router.post('/life', auth, createLife)

// 修改生活记录类型
router.patch('/life/:id', auth, updateLife)

// 删除生活记录类型
router.delete('/life/:id', auth, deleteLife)

module.exports = router
