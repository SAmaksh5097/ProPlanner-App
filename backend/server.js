dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const connectDB = require('./src/config/db');
const cors = require('cors');
const {clerkMiddleware, requireAuth} = require('@clerk/express');
const projectRoutes = require('./src/routes/projectRoutes');

const PORT = process.env.PORT || 5000;
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(clerkMiddleware());


// connect to database
connectDB().then(()=>{
  console.log("DB connected");
}).catch((error)=>{
  console.error("error occured in db connection", error);
  process.exit(1);
})

app.use('/projects', projectRoutes);

app.get('/protected',requireAuth(),(req,res)=>{
  res.json({msg:"This is a protected route", user:req.auth.userId})
})
app.get('/',(req,res)=>{
  res.json({msg:"HELLo user"})
})

app.listen(PORT, () => {
  console.log('Server is running on port '+PORT);
});

