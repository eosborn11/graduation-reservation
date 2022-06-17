const express = require("express");
const port = 2000;
const bodyParser = require("body-parser");
const app = express();
//const dbConn = require('./dbConn');

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())
const dotenv = require('dotenv');
dotenv.config();
const Pool = require('pg').Pool;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    post: 5432
})

app.get("/", (req, res) => {
    res.send("Welcome to my Backend/API")
})

app.post("/", (req, res) => {
    console.log(req.body)
    const { name, phone_number, attendees, meal_preference } = req.body;
    pool.query('INSERT INTO users_info (name, phone_number, attendees, meal_preference) VALUES ($1, $2, $3, $4) RETURNING *', [name, phone_number, attendees, meal_preference], (error, results) => {
        if (error) {
          throw error
        }
        res.status(201).send(`User added with ID: ${results.rows[0].id}`)
      })
})


app.listen(port, () => {
    console.log("app is running on port", port)
})