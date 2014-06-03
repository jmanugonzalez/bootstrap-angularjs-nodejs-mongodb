// Incluímos las dependencias que vamos a usar
var express = require('express'),
	app = express(),
	mongoose = require('mongoose');

// Conexión con la base de datos
mongoose.connect('mongodb://localhost:27017/angular-todo', function(err, res) {
	if (err) {
		console.log('ERROR: connecting to Database. ' + err);
	} else {
		console.log('Connected to Database');
	}
});

// Configuración
app.configure(function() {
	app.use(express.static(__dirname + '/public')); 
	app.use(express.logger('dev'));
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());
});

routes = require('./routes/todos')(app);

app.get('*', function(req, res) {
	res.sendfile('./public/index.html'); // Angular Manejará el Frontend
});

// Escucha y corre el server
app.listen(8080, function() {
	console.log('App listening on port 8080');
});
