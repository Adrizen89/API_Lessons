const {Router} = require('express')
const v1Route = require('./v1')

const router = Router()

router.use('/v1', v1Route)
module.exports = router
