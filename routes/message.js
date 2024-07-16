const express = require('express');
const { Message } = require('../models');
const { Model } = require('sequelize');
const router = express.Router();

// Get all messages between a sender and a receiver
router.get('/api/messages/:senderId/:recipientId', async (req, res) => {
   // Assuming `req.user` contains the logged-in user's info
  const { senderId,recipientId } = req.params;

  try {
    // const updateReadOrNot=await Message.update({
    //   isRead:1
    // },{
    //   where:{
    //     recipientId:recipientId
    //   }
    // })
    const messages = await Message.findAll({
      where: {
        userId:[senderId,recipientId],
        recipientId:[senderId,recipientId]
      },
      order: [['createdAt', 'ASC']]
    });
    console.log(messages);
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).send('Server error');
  }
});
module.exports = router;
