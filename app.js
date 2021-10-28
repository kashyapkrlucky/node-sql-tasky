// Import modules
const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();


// Setting middleware
require('./middleware')(app);

// listening app
app.listen(PORT, () => {
    console.log(`Your server is running on PORT ${PORT}`);
});


// hhecdagjci $2a$10$J7tTNyArZgpnkYEsiCYqsO/nIlGkYvKP1agSNK7tCv8hPYvuBOazG