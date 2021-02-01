const router = require('koa-router')()
const controller = require('../controllers/userController')
router.prefix('/users')

router.post('/login', controller.login)


module.exports = router
