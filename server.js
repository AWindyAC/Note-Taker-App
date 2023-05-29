const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
// Initialize app and new port
const app = express();
const PORT = process.env.PORT || 3001;
// Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// Routes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);
// Starts the server to begin listening
app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
});