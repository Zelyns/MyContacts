require("dotenv").config();
const express = require("express");
const app = express();
const connection = require("./db");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const contactRoutes = require('./routes/contact');
const session = require('express-session');
const cors = require('cors');

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // l'adresse de ton frontend
  credentials: true
}));

app.use(session({
  secret: 'mycontacts_secret', // choisis une clé secrète forte
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // true si HTTPS
    httpOnly: true,
    sameSite: 'lax'
  }
}));

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/contacts', contactRoutes);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));