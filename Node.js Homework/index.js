//import express module 
var express = require('express');
//create  an express app
var app = express();
//require express middleware body-parser
var bodyParser = require('body-parser');
//require express session
var session = require('express-session');
var cookieParser = require('cookie-parser');

//set the view engine to ejs
app.set('view engine', 'ejs');
//set the directory of views
app.set('views', './views');
//specify the path of static directory
app.use(express.static(__dirname + '/public'));

//use body parser to parse JSON and urlencoded request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//use cookie parser to parse request headers
app.use(cookieParser());
//use session to store user data between HTTP requests
app.use(session({
    secret: 'cmpe_273_secure_string',
    resave: false,
    saveUninitialized: true
}));

//Allowed users
var Users = [{
    "username": "admin",
    "password": "admin"
},{
    "username": "deep",
    "password": "deep1"
}
];

//By Default we have 3 books
var books = [
    { "BookID": "1", "Title": "Book 1", "Author": "Author 1" },
    { "BookID": "2", "Title": "Book 2", "Author": "Author 2" }
]
//route to root
app.get('/', function (req, res) {
    //check if user session exits
    if (req.session.user) {
        res.render('./home');
    } else
        res.render('login',{message:""});
});

app.post('/login', function (req, res) {
    if (req.session.user) {
        res.redirect('/home');
    } else {
        user = Users.filter(user => user.username === req.body.username && user.password === req.body.password);
        if (user.length !== 0){
            req.session.user = user;
            res.redirect('/home');
        }else{
            res.render('login',{message:"invalid username or password"});
        }       
    }
});

app.post('/logout', function (req, res) {
    req.session.user = undefined;
    res.redirect('/');
});

app.get('/home', function (req, res) {
    if (!req.session.user) {
        res.redirect('/');
    } else {
        // console.log("Session data : ", req.session);
        res.render('home', {
            books: books
        });
    }
});

app.get('/create', function (req, res) {
    if (!req.session.user) {
        res.redirect('/');
    } else {
        res.render('create',{message_create:""});
    }
});

app.post('/create', function (req, res) {
    let {bookid, title, author} = req.body
    book = books.filter(({BookID}) => BookID === req.body.bookid)

    if(book.length === 0){
        books.push({ "BookID": bookid, "Title": title, "Author": author });
        res.redirect('/home');
    }else{
        res.render('create',{message_create:"Book has been already added"});
   }
});

app.get('/delete', function (req, res) {
    if (!req.session.user) {
        res.redirect('/');
    } else {
        res.render('delete',{message_delete:""});
    }
});

app.post('/delete', function (req, res) {
    let newBooks = books.filter(({BookID}) => BookID != req.body.bookid)
    if(books.length === newBooks.length){
        res.render('delete',{message_delete:"Book does not exists!"});
    }else{
        books = newBooks
        res.redirect('/home');
    }
});

var server = app.listen(3000, function () {
    console.log("Server listening on port 3000");
});
