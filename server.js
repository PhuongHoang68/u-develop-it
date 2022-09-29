const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const db = require('./db/connection');
const apiRoutes = require("./routes/apiRoutes");

//Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', apiRoutes);

app.get ('/', (req, res)=> {
    res.json({
        message: 'Hello World'
    });
});



//Default response for any other request (Not Found). Needs to be the last one otherwise will overwrite all GET/POST routes. CATCHALL route
app.use((req, res)=>{
    res.status(404).end();
});


//Start server after DB connection
db.connect(err=> {
    if(err) throw err;
    console.log('Database connected.');
    //app port listen functions
app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`);
});

})
