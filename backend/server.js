dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const connectDB = require('./src/config/db');
const cors = require('cors');
const {clerkMiddleware, requireAuth} = require('@clerk/express');
const projectRoutes = require('./src/routes/projectRoutes');

const PORT = process.env.PORT || 5000;

// CORS — allow the configured frontend URL + any Vercel preview deployments
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'http://localhost:5174',
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    // Allow configured origins
    if (allowedOrigins.includes(origin)) return callback(null, true);
    // Allow any *.vercel.app preview deployment
    if (origin.endsWith('.vercel.app')) return callback(null, true);
    callback(new Error('Not allowed by CORS'));
  },
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

// Health check — hit this to verify env vars are loaded
app.get('/health',(req,res)=>{
  res.json({
    status: 'ok',
    db: !!process.env.MONGODB_URI,
    gemini: !!process.env.GEMINI_API_KEY,
    clerk: !!process.env.CLERK_SECRET_KEY,
    frontendUrl: process.env.FRONTEND_URL || 'not set',
  })
})

app.listen(PORT, () => {
  console.log('Server is running on port '+PORT);
});

