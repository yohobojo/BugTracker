const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());
app.use(cors({ origin: '*' }));
const port = 5500;

// courses = [{ id: 1, name: 'test' }];

const users = [];

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'yohoDB123!',
  database: 'sys',
});

connection.connect((error) => {
  if (error) {
    console.log('An error as occured while connecting to db');
    throw error;
  }
});

app.listen(port, () => console.log(`Listening on port ${port}...`));

// app.get('/', (req, res) => {
//   //   res.send(courses);
//   connection.query('SELECT * FROM bugs', (err, result) => {
//     res.send(result);
//   });
// });

app.get('/userHome', (req, res) => {
  console.log('here');
  connection.query('SELECT * FROM bugs', (err, result) => {
    res.send(result);
  });
});

app.get('/users', (req, res) => {
  res.json(users);
});

app.post('/newUser', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { name: req.body.name, password: hashedPassword };
    users.push(user); //use db
    connection.query('INSERT INTO users VALUES ' + user + ';');
    res.status(201).send();
  } catch (error) {
    res.status(500).send();
  }
});

app.post('/users/login', async (req, res) => {
  const user = users.find((user) => user.name === req.body.name);
  if (user == null) {
    return res.status(400).send('Cannot find user');
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send('Success');
    } else {
      res.send('Not Allowed');
    }
  } catch (error) {
    res.status(500).send();
  }
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
