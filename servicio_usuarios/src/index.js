const authentication = require("./routes/auth.routes");
const bodyParser = require('body-parser');
const express = require("express");
const cors = require("cors");
const authenticateJWT = require("./Middleware/auth");
require('dotenv').config();
const app = express();

// Define the server Port
const PORT = process.env.PORT || 3000;


// Basic Middleware
app.use(bodyParser.json());
app.use(cors());


// Running the express server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  

app.use("/auth",authentication);
app.use("/otro",authenticateJWT,authentication);
