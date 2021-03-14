
const controller = require('../controllers/blogController')
const router = require('koa-router')()
const { verifyToken } = require('../auth');
router.prefix('/blog')


router.get('/index', controller.welcome)

router.get("/detail", controller.getDetail);

router.get('/pusharticle', verifyToken, controller.saveArticle)

router.post('/pusharticle', verifyToken, controller.saveArticle)

router.post('/comment', controller.saveComment)

router.post('/reply', controller.saveReply)

router.post('/revert', controller.getReply)

module.exports = router
