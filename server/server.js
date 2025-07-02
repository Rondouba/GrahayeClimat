
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

// Load env vars
dotenv.config({ path: './server/.env' });

// Passport config
require('./config/passport')(passport);

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Enable CORS
app.use(cors({
    origin: 'http://localhost:5173', // Adjust for your frontend URL
    credentials: true
}));

// Express session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Mount routers
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/courses', require('./routes/api/courses'));
app.use('/api/blog', require('./routes/api/blog'));
app.use('/api/challenges', require('./routes/api/challenges'));
app.use('/api/data', require('./routes/api/data'));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
