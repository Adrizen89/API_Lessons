const { Router } = require("express");
const LessonRoute = require('./lessons.routes')



const router = Router()

router.use('/chapters', LessonRoute)


module.exports = router