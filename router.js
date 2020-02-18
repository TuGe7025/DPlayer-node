const Router = require('koa-router');
const router = new Router();

router.get('/v2', require('./routes/get'));
router.post('/v2', require('./routes/post'));
router.get('/v3/bilibili', require('./routes/bilibili'));

module.exports = router;