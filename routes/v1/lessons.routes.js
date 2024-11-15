const { Router } = require('express')
const {createLesson, deleteLesson, getAllLessons} = require('../../controllers/v1/lesson.controllers')

const router = Router()

router.post('/lesson', createLesson)
router.delete('/lesson/:id', deleteLesson)
router.get('/lesson', getAllLessons)

module.exports = router