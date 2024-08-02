const express = require("express");
const rootRouter = require('./routes/index');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

// middlewares
app.use(cors());
app.use(express.json());


// routes
app.use('/api/v1', rootRouter);


const PORT = 3000;
app.listen(PORT, function(){
    console.log(`server listening on ${PORT}`);
});


