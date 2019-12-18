const Router = require('koa-router')
const router = new Router({ prefix: '/api/users' })
const auth = require('../../middlewares/auth')
const checkUserIsSelf = require('../../middlewares/check-user-is-self')
const checkUserIsNotSelf = require('../../middlewares/check-user-is-not-self')
const {
  login,
  find,
  findById,
  findMe,
  create,
  update,
  delete: delUser,
  findUserArticle,
  follow,
  unfollow,
  followers,
  followList
} = require('../../controllers/users')

router.post('/login', login)

// 查询用户列表
router.get('/', find)

// 查询某个用户
router.get('/:id', findById)

// 获取默认用户信息
router.get('/me/info', auth, findMe)

// 创建用户
router.post('/', create)

// 更新用户
router.patch('/:id', auth, checkUserIsSelf, update)

// 删除用户
router.delete('/:id', auth, delUser)

// 获取用户文章列表
router.get('/:id/articles', auth, findUserArticle)

// 关注某人
router.patch('/follow/:id', auth, checkUserIsNotSelf, follow)

// 取消关注某人
router.delete('/follow/:id', auth, checkUserIsNotSelf, unfollow)

// 获取用户粉丝列表
router.get('/:id/followers', followers)

// 获取用户关注了谁
router.get('/:id/followList', followList)

module.exports = router
