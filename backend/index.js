const express = require("express");
const rootRouter = require('./routes/index');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

// middlewares
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173/'] // Add your front-end domain here
  }));
app.use(express.json());


// routes
app.use('/api/v1', rootRouter);

app.get('/', (req, res)=>{
    res.status(200).send("Deployed");
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, function(){
    console.log(`server listening on ${PORT}`);
});


