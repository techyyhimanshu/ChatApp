const express = require('express');
const { User, sequelize } = require('../models');
const { QueryTypes } = require('sequelize');

// Register a new user
var registerUser=async(req,res)=>{
    try {
        const user = await User.create({ username, email, password });
        res.json(user);
      } catch (error) {
        res.status(500).json({ error: 'Failed to register user' });
      }
}

// Authenticate user
var authenticateUser=async (req,res)=>{
    const { email, password } = req.body;
    console.log(req.body);
    try {
      const user = await User.findOne({ where: { email, password } });
      if (user) {
        // Fetch all users from the database
        const allUsers = await sequelize.query("select id,username from Users where id!=? ", {
          replacements: [user.id],
          type: QueryTypes.SELECT
        });
           // Store user data in session
           req.session.user = user;
           req.session.allUsers = allUsers;
     
           // Redirect to chat page
           res.json({ success: true, redirectUrl: '/chats',currentUser:user,users:allUsers });
    
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: 'Failed to login' });
    }
}

module.exports={
    registerUser,
    authenticateUser
}
