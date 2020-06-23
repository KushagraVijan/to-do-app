var bodyParser = require('body-parser');
var urlencoderParser = bodyParser.urlencoded({ extended: false });
const mongoose = require('mongoose');
var uri = require('./public/assets/pass');
// connect to database
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log("succesfulluy connected to mongodb");
    })
    .catch((error) => { console.log("error in connnecting to mongo server", error) });

// create a scheema Blueprint
var todoSchema = new mongoose.Schema({
    item: String
})

var Todo = mongoose.model('Todo', todoSchema);

//var data = [{item: "Make a cup of Tea"},{item: "Make a cup of Coffee"},{item: "Make a glass of Juice"}];

module.exports = function(app) {

    app.get('/', function(req, res) {
            res.send("This website is for todo app.");
        })
        //GET DATA
    app.get('/todo', function(req, res) {
        Todo.find({}, function(err, data) {
            if (err) throw err;
            res.render('to-do-list', { todo: data });
        });
    });

    //POST DATA
    app.post('/todo', urlencoderParser, function(req, res) {

        var newTodo = Todo(req.body).save(function(err, data) {
            if (err) throw err;
            res.json(data);
        })
    });

    //DELETE DATA
    app.delete('/todo/:item', function(req, res) {
        console.log("1");

        Todo.find({ item: req.params.item.replace(/\-/g, " ") }).remove(function(err, data) {
            if (err) throw err;
            res.json(data);
        })
    });

}