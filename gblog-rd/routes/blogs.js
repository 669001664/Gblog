
const controller = require('../controllers/blogController')
const router = require('koa-router')()
router.prefix('/blog')


router.get('/index', controller.welcome)

router.get("/detail",  controller.getDetail);

router.post('/pusharticle',controller.saveArticle)

router.post('/comment', controller.saveComment)

router.post('/reply', controller.saveReply)

router.post('/revert',controller.getReply)

module.exports = router
