const fs = require('fs');
const express = require('express');
const path = require('path');
const { notes } = require('./data/db.json');
const apiRoutes = require('./public/routes/apiRoutes');
const htmlRoutes = require('./public/routes/htmlRoutes');
const router = require('./public/routes/apiRoutes/noteRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);
app.delete('/api/notes/:id', router.delete);

app.listen(PORT, () => {
    console.log(`API server now on PORT ${PORT}`);
});