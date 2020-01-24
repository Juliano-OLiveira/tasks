const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/taskdb');
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    title: String,
    categoria: String,
    textarea: String,
   
    descricao: String,
    status: Boolean,
    // status:{type:Boolean,
    // default: true}
});


const Task = mongoose.model('tasks', TaskSchema);
module.exports = Task;