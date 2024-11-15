const {Schema, default: mongoose } = require("mongoose");

const LessonSchema = new Schema({
    title: {type:String, required:true},
    numberOfLessons:{type: Number, required:true},
    isActive:{type:Boolean, default:false, required:true}
},
{
    timestamps: true,
    toJSON: {
        transform: function(doc, ret) {
            delete ret.createdAt;
            delete ret.updatedAt;
            delete ret.__v;
        }
    }
}
)

module.exports.Lesson = mongoose.model('lesson', LessonSchema)