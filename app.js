const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const app = express();

const siteName = "ANP"

mongoose.set("strictQuery", false);


// MongoDB connection

mongoose.connect('mongodb+srv://haseebjanhamraz:haseeb@cluster0.urtdhxt.mongodb.net/?retryWrites=true&w=majority')
// Use environment variables

// Connection string to your MongoDB Atlas cluster
// const mongoURI = process.env.MONGODB_URI; // Replace with your MongoDB Atlas connection string

// async function connectToDatabase() {
//   try {
//     await mongoose.connect(mongoURI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//     console.log('Connected to MongoDB Atlas!');
//   } catch (error) {
//     console.error('Error connecting to MongoDB Atlas:', error);
//   }
// }
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const authRoutes = require('./routes/auth');
app.use('/', authRoutes); // Mount the auth routes


// Express session
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));


// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

const User = require('./models/user'); // Create a User model

// Passport local strategy for authentication
passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });

      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return done(null, false, { message: 'Incorrect password' });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});