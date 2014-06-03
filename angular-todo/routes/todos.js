module.exports = function(app) {

var Todo = require('../models/todo.js');

findAllTodos = function(req, res) {
	console.log("GET - /todos");
	return Todo.find(function(err, todos) {
		if(!err) {
			return res.json(todos);
		} else {
			res.statusCode = 500;
  			console.log('Internal error(%d): %s',res.statusCode,err.message);
  			return res.send({ error: 'Server error' });
		}
		
	});
};

addTodo = function(req, res) {
	return Todo.create({
		text: req.body.text,
		done: false
	}, function(err, todo){
		if(err) {
			res.send(err);
		}

	return Todo.find(function(err, todos) {
			if(err){
				res.send(err);
			}
			return res.json(todos);
		});
	});
};

deleteTodo =  function(req, res) {
	return Todo.remove({
		_id: req.params.todo
	}, function(err, todo) {
		if(err){
			res.send(err);
		}

		return 	Todo.find(function(err, todos) {
			if(err){
				res.send(err);
			}
			return	res.json(todos);
		});

	});
}

app.get('/api/todos', findAllTodos);
app.post('/api/todos', addTodo);
app.delete('/api/todos/:todo', deleteTodo);

}