var express = require('express'),
    swig = require('swig'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    routes = require('./routes/index'),
    path = require("path");
var app = express();

app.use(morgan('dev'));
//swig stuff------------------------
app.engine("html", swig.renderFile);
app.set("view engine", "html");
app.set("views", __dirname + "/views");
swig.setDefaults({ cache: false });
//--------------------------------- 

app.use("/bootstrap", express.static('node_modules/bootstrap'));
app.use("/jquery", express.static('node_modules/jquery'));
app.use(express.static(path.join(__dirname, 'public')));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use("/", routes);

app.use(function(req,res,next){
	var err = new Error("Not found")
	err.status = 404;
	next(err);
});

app.use(function(err,req,res,next){
	res.status(err.status || 500).end(); //take this out when we do res.render
	// res.render("c")
})
app.listen(3000, function(err){
  console.log('Listening to port 3000');
});
