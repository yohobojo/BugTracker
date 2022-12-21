const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());
app.use(cors());
const port = 5500;

// courses = [{ id: 1, name: 'test' }];

var users;

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

connection.query('SELECT * FROM users', (err, result) => {
  users = result;
});

app.get('/bugs', (req, res) => {
  connection.query(
    'SELECT * FROM bugs WHERE done = "false" AND approved = "true"',
    (err, result) => {
      res.send(result);
    }
  );
});

app.get('/newBugs', (req, res) => {
  connection.query(
    'SELECT * FROM bugs WHERE approved = "false";',
    (err, result) => {
      console.log(result);
      res.send(result);
    }
  );
});

app.get('/doneBugs', (req, res) => {
  connection.query('SELECT * FROM bugs WHERE done = "true";', (err, result) => {
    res.send(result);
  });
});

app.get('/userHome', (req, res) => {
  connection.query('SELECT * FROM bugs;', (err, result) => {
    res.send(result);
  });
});

app.get('/users', (req, res) => {
  console.log('here');
  connection.query('SELECT name FROM users;', (err, result) => {
    res.send(result);
    // users.push(result);
  });
});

app.post('/newUser', async (req, res) => {
  try {
    console.log(req.body);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { name: req.body.name, password: hashedPassword };
    connection.query(
      'INSERT INTO users VALUES ("' +
        user.name +
        '","' +
        user.password +
        '","admin");'
    );
    res.status(201).send('code 201');
  } catch (error) {
    res.status(500).send('code 500');
  }
});

app.post('/users/login', async (req, res) => {
  console.log(users);
  //   const user = users.find((user) => user.name === req.body.name);
  var user;
  for (let i = 0; i < users.length; i++) {
    const data = users[i];
    console.log(data.name);
    console.log(req.body.name);
    if (data.name == req.body.name) {
      user = data;
      break;
    } else {
      user = null;
    }
  }
  //   console.log(user);
  if (user == null) {
    return res.status(400).send('Cannot find user');
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send(user.type);
    } else {
      res.send('Not Allowed');
    }
  } catch (error) {
    res.status(500).send();
  }
});

app.post('/newBug', async (req, res) => {
  console.log(req.body);

  connection.query(
    'INSERT INTO bugs VALUES ("' +
      req.body.id +
      '","' +
      req.body.name +
      '","' +
      req.body.description +
      '","' +
      req.body.done +
      '","' +
      req.body.descriptionExt +
      '","' +
      req.body.approved +
      '");'
  );
});
app.put('/approveBug', async (req, res) => {
  console.log(req);
  connection.query(
    'UPDATE bugs SET approved = "true" WHERE id = ' + req.body.id + ';'
  );
});
