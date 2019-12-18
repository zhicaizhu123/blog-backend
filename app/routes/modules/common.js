const Router = require('koa-router')
const router = new Router()
const { upload } = require('../../controllers/common')

// 上传文件
router.post('/api/upload', upload)

module.exports = router
