const { Lesson } = require("../../database/models/Lesson.model");

//Fonction pour créer une leçon
module.exports.createLesson = async (req, res, next) => {
    try{
        const body = req.body
        console.log(body);
        
        const newLesson = new Lesson({
            ...body
        })

        await newLesson.save()
        return res.jsonSuccess(newLesson, 201)
    } catch(error){
        next(error)
    }
}

// Fonction qui récupére toutes les leçons
module.exports.getAllLessons = async (req, res, next) => {
    try{
        const lessons = await Lesson.find()
        return res.jsonSuccess(lessons, 200)
    } catch(error){
        next(error)
    }
}

//Fonction qui supprime une leçon par son id
module.exports.deleteLesson = async (req, res, next) => {
    try{
        const { id } = req.params
        const lesson = await Lesson.findById(id)
        console.log(lesson)
        if(!lesson) {
            return res.jsonError(`No Lesson available with id: ${id}`, 404)
        }
        await Lesson.findByIdAndDelete(id)
        return res.jsonSuccess(lesson, 200)
    } catch(error){
        next(error)
    }
}