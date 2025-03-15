// Import Express
import express from 'express';

// Instantiate an Express application
const app = express();

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// In-memory array to store workout entries
const workouts = [];

// Home route: Display the workout form
app.get('/', (req, res) => {
  res.render('home');
});

// Handle form submissions
app.post('/add-workout', (req, res) => {
  if (!req.body.workoutType || !req.body.duration || !req.body.intensity || !req.body.date) {
    return res.send('Invalid Input: All fields except notes are required.');
  }

  // Store workout details
  const workout = {
    workoutType: req.body.workoutType,
    duration: req.body.duration,
    intensity: req.body.intensity,
    date: req.body.date,
    notes: req.body.notes || 'None',
    timestamp: new Date().toLocaleString()
  };

  workouts.push(workout);
  console.log('New workout entry:', workout);

  res.redirect('/summary');
});

// Summary route: Display all workouts
app.get('/summary', (req, res) => {
  res.render('summary', { workouts });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
