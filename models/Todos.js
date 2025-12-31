import mongoose from "mongoose"

const TodoSchema = new mongoose.Schema({
    title:{type:String,required: true},
    location:{type: String,required: true},
    description:{type: String,required: true},
    status:{type: String,required: true}

})

const TodoModel = mongoose.model("todos", TodoSchema)

export  {TodoModel};