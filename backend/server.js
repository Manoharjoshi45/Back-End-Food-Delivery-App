const express = require('express');
const app = express();
const db = require('./db');
const UserRoute = require('./routers/createUser');
const PORT = 5000;
db.connect();

app.use((req,res,next)=>{
    res.setHeader("Access-control-Allow-origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-with,Content-Type,Accept"
    );
    next();
})
app.use(express.json())
app.use('/api',UserRoute)
app.use('/api',require('./routers/displayData'));

app.listen(PORT,() => {
    console.log(`App listening on ${PORT}`);
})