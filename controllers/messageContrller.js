const express = require('express');
const { User,Message } = require('../models');
const { QueryTypes } = require('sequelize');
const users = {};

const registerUser = (username, socket) => {
    console.log(`User ${username} connected with socket ID ${socket.id}`);
    users[username] = socket.id;
};

const handleDisconnect = (socket) => {
    console.log('user disconnected');
};

const sendMessage = async (msg, io) => {
    const { senderId, recipientId, content } = msg;
    try {
        const message = await Message.create({ userId: senderId, recipientId, content });
        // Emit the message back to the sender and recipient
        io.emit('receive message', {
            content: msg.content,
            userId: msg.senderId,
            recipientId: msg.recipientId,
        });
    } catch (error) {
        console.error('Error saving message:', error);
    }
};

module.exports = {
    registerUser,
    handleDisconnect,
    sendMessage
};
