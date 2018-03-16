const express = require('express');
const hbs = require('hbs');

const fs = require ('fs');
const port = process.env.PORT || 3000;

// Check out expressjs.com to see more about API
var app = express();

//Get directory
hbs.registerPartials(__dirname + '/views/partials');

// get the hbs
app.set('view engine', 'hbs');

// app.use((req,res, next) => {
//     res.render('maintance.hbs');
// });

//Next is used to proceed
app.use((req, res, next) => {

    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    // Write the request 
    fs.appendFileSync ('server.log', log + `\n`, (err) => {
        if (err){
            Console.log('Unable to connect to the server');
        }
    });
    next();
});

app.use(express.static(__dirname + '/public'))

// Create Helper for function
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('index.hbs', {
        pageTitle: 'Index',
        welcomeMessage: 'Welcome to Seto'
    });
});

app.get("/about", (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
});

app.get("/bad", (req, res) => {
    res.send('Unable to handle request');
});

app.listen(port);

app.get ("/project", (req, res) => {
    res.render("project.hbs", {
        pageTitle : "Project"
    });
});
