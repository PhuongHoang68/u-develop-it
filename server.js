const mysql = require('mysql2');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

//Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//connect our app to mysql database
const db = mysql.createConnection(
    {
        host: 'localhost',
        //Your mysql username
        user: 'root',
        // Your mySQL password
        password: 'PhuongHoang68',
        database: 'election'
    },
    console.log('Connected to the election database.')
);

app.get ('/', (req, res)=> {
    res.json({
        message: 'Hello World'
    });
});


//query to return all the data in the candidates table
db.query(`SELECT* FROM candidates`, (err, rows)=> {
    console.log(rows);
});

//query to return a single candidate
db.query(`SELECT * FROM candidates WHERE id =1`, (err, row)=>{
    if(err) {
        console.log(err);
    }
    console.log(row);
});

//Create a candidate
const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected) 
              VALUES (?,?,?,?)`;
const params = [1, 'Ronald', 'Firbank', 1];

db.query(sql, params, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});

//Default response for any other request (Not Found). Needs to be the last one otherwise will overwrite all GET/POST routes. CATCHALL route
app.use((req, res)=>{
    res.status(404).end();
});

//app port listen functions
app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`);
});