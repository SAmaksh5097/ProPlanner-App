const express = require('express');
const app = express();
const connectDB = require('./src/config/db');

// connect to database
connectDB().then(()=>{
  console.log("DB connected");
}).catch((err)=>{
  console.log("error occured in db connection");
})

app.get('/',(req,res)=>{
  res.json({msg:"HELLo user"})
})
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

