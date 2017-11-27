const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();
// partials es para poder hacer partes de paginas parciales
//asi como hacer el footer generico
//para q funcione correr nodemon server.js -e js,hbs
//-e es q nodemon este mirando las extesiones
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('currentYear', ()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});


app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile("server.log", log + "\n", (err)=>{
    if (err) {
        console.log('unable to append to the server.log.');
    }
  });
  next();
});

//haciendo un middlewear the maintenance page
// al descomentarlo nos lleva siempre a maintenance y nos deja alli. no nos permite ir a ningun lugar
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// })

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.get('/', (request, response) => {
  // response.send('<h1>Hello express!</h1>'); ejemplo1
  // response.send({     ejemplo 2
  //   name: 'Walter',
  //   likes: [
  //     'moto',
  //     'autos'
  //   ]
    response.render('home.hbs',{
      pageTitle: 'Homepage',
      Message: 'Welcome Felloks'
    });
});

app.get('/about', (req, res) => {
  res.render('about.hbs',{
    pageTitle: 'About Pageeeee'
  });
});

app.get('/project', (req, res) => {
  res.render('project.hbs',{
    pageTitle: 'Projects Pages'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    page: '/bad',
    error: 'Houston we have a problem!'
  });
});

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
