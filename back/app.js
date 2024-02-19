const express = require('express');
const allRoutes = require('./route/allRoute');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.use('/', allRoutes)
app.listen(3002, () => {
    console.log('App is listen on port 3002');
});