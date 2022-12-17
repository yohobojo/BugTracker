const express = require('express');
const app = express();
app.use(express.json());
const port = 5500;

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '********************',
  database: 'sys',
});

connection.connect((error) => {
  if (error) {
    console.log('An error as occured while connecting to db');
    throw error;
  }
});
app.listen(port, () => console.log(`Listening on port ${port}...`));

app.get('/', (req, res) => {
  res.send('Hello World!');
  connection.query('SELECT * FROM bugs', (err, result) => {
    console.log(result);
  });
});

app.get('/api', (req, res) => {
  console.log('here');
  res.send(courses);
});

app.post('/api/courses', (req, res) => {
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send('The course with the given ID was not found.');
  res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send('The course with the given ID was not found.');
  //implement validation later
  course.name = req.body.name;
  res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send('The course with the given ID was not found.');

  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});
