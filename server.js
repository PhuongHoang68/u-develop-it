const mysql = require('mysql2');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const inputCheck = require('./utils/inputCheck');

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

// Get all candidates
app.get('/api/candidates', (req, res) => {
    const sql = `SELECT * FROM candidates`;
  
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
  });

// Get a single candidate
app.get('/api/candidate/:id', (req, res) => {
    const sql = `SELECT * FROM candidates WHERE id = ?`;
    const params = [req.params.id];
  
    db.query(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: row
      });
    });
  });


// //Create a candidate
app.post('/api/candidate', ({body}, res)=> {
    const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
    if (errors) {
        res.status(400).json({ error: errors});
        return;
    }
    const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected) 
    VALUES (?,?,?,?)`;
const params = [1, 'Ronald', 'Firbank', 1];

db.query(sql, params, (err, result) => {
if (err) {
console.log(err);
}
console.log(result);
});
});



// Delete a candidate
app.delete('/api/candidate/:id', (req, res) => {
    const sql = `DELETE FROM candidates WHERE id = ?`;
    const params = [req.params.id];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        res.statusMessage(400).json({ error: res.message });
      } else if (!result.affectedRows) {
        res.json({
          message: 'Candidate not found'
        });
      } else {
        res.json({
          message: 'deleted',
          changes: result.affectedRows,
          id: req.params.id
        });
      }
    });
  });

//Default response for any other request (Not Found). Needs to be the last one otherwise will overwrite all GET/POST routes. CATCHALL route
app.use((req, res)=>{
    res.status(404).end();
});

//app port listen functions
app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`);
});