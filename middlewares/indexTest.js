const express = require('express');
const authApp = require('./auth');

const app = express();

// Mount the auth app at the root URL
app.use('/', authApp);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// const express = require('express');
// require('dotenv').config();
// const { getRefreshToken } = require('./middlewares/getRefreshToken');

// const app = express();

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//     getRefreshToken(); // Call getRefreshToken here if you want to get the refresh token when the server starts
// });


