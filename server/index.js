const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors')
app.use(cors())

dotenv.config();
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("listining to port");
})

app.get("*", (req, res) => {
    res.status(404).json({
        success:false,
        message: "This route does no exist",
    });
  });

const PORT = process.env.PORT;

app.listen(4000,console.log(`Server listining on ${PORT}`));