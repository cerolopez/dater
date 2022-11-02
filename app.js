// Made by Cecilia and Tim

import {} from 'dotenv/config';

import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import router from './routes/routes.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static('public'));
app.use(
  session({
    secret: 'New session',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 360000},
  })
);

// Code for router 
app.use("/", router);

app.listen(port, () => {
  console.log('Server listening on 3000');
});
