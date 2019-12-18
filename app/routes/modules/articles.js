const Router = require('koa-router')
const router = new Router({ prefix: '/api/articles' })
const auth = require('../../middlewares/auth')
const {
  find,
  findById,
  create,
  update,
  delete: delArticle
} = require('../../controllers/articles')

// 查询文章列表
router.get('/', find)

// 查询某个文章
router.get('/:id', findById)

// 创建文章
router.post('/', auth, create)

// 更新文章
router.patch('/:id', auth, update)

// 删除文章
router.delete('/:id', auth, delArticle)

module.exports = router
