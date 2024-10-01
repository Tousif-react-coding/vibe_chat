const express = require('express')
const router = express.Router();
const bcrypt = require("bcrypt"); // To compare hashed passwords
const jwt = require("jsonwebtoken"); // For generating JWT tokens
const User = require('../models/userModel');

//signup
router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
 

  bcrypt.hash(password, 10)
      .then((hashedPassword) => {
          let user = new User({
              name,
              email,
              password: hashedPassword,
             
          });
          return user.save();
      })
      .then((result) => {
          res.status(201).send({
              message: "User Created Successfully",
              result: {
                  id: result._id,
                  name: result.name,
                  email: result.email,
                 
              }
          });
      })
      .catch((error) => {
          console.error('Error creating user:', error); // Improved error logging
          res.status(500).send({
              message: "Error creating user",
              error: error.message, // Send back a simpler error message
          });
      });
});

// login
router.post("/login", (request, response) => {
  let name = request.body.name
  // Check if email exists
  User.findOne({ email: request.body.email })
    .then((user) => {
      // If no user is found
      if (!user) {
        console.error("Login failed: Email not found:", request.body.email);
        return response.status(404).send({
          message: "Email not found",
        });
      }

      // Compare the password entered and the hashed password found
      return bcrypt.compare(request.body.password, user.password)
        .then((passwordCheck) => {
          // If the passwords don't match
          if (!passwordCheck) {
            console.error("Login failed: Passwords do not match for email:", request.body.email);
            return response.status(400).send({
              message: "Passwords do not match",
            });
          }

          // Create JWT token
          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );

          // Return success response
          return response.status(200).send({
            message: "Login Successful",
            email: user.email,
            name: user.name,
            token,
          });
        });
    })
    // Catch error if there's an issue with finding the user
    .catch((error) => {
      console.error("An error occurred while processing the login:", error);
      return response.status(500).send({
        message: "An error occurred while processing your request",
        error,
      });
    });
});



module.exports = router;