const Router = require('koa-router')
const router = new Router({ prefix: '/api/lifes' })
const auth = require('../../middlewares/auth')
const checkUserIsSelf = require('../../middlewares/check-user-is-self')
const {
  find,
  findById,
  create,
  update,
  delete: delLife
} = require('../../controllers/lifes')

// 查询生活记录列表
router.get('/', find)

// 查询某个生活记录
router.get('/:id', findById)

// 创建生活记录
router.post('/', auth, create)

// 更新生活记录
router.patch('/:id', auth, checkUserIsSelf, update)

// 删除生活记录
router.delete('/:id', auth, checkUserIsSelf, delLife)

module.exports = router
