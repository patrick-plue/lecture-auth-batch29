require('dotenv').config();
const express = require('express');
// const session = require('express-session');

const jwt = require('jsonwebtoken');

const { verifyToken } = require('./middleware/verifyToken');

port = 8000;

const app = express();

app.use(express.json());

//JWT
const generateToken = (data, secret) => {
  return jwt.sign(data, secret, { expiresIn: '1800s' });
};

app.post('/set-token', (req, res) => {
  const token = generateToken(req.body.user, process.env.SECRET);
  res.set('token', token);
  res.send('token generated');
});

app.get('/get-token', verifyToken, (req, res) => res.send(req.data));

app.delete('/user', verifyToken, (req, res) => {
  if (req.data.role === 'admin') {
    res.send('succesfull');
  } else {
    res.send('Unauthorized');
  }
});

//express-session
// app.use(
//   session({
//     secret: process.env.SECRET,
//     resave: true,
//     saveUninitialized: true,
//     cookie: { maxAge: 600000 },
//   })
// );

// app.get('/route1', (req, res) => {
//   req.session.myNewSession = 'You have visited this route before';
//   res.send('Visiting');
// });

// app.get('/route2', (req, res) => {
//   res.send(req.session.myNewSession || 'not visited yet');
// });

// app.get('/route3', (req, res) => {
//   req.session.destroy();
//   res.send('session destroyed');
// });

app.listen(port, () => console.log('app listening'));
