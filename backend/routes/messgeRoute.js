import express from 'express';
import { createMessage, getAllMessages, getMessageById, updateMessageStatus, deleteMessage, getMessageStats } from '../controllers/messageController.js';


const Messgerouter = express.Router();


// Public routes
Messgerouter.post('/send-message', createMessage); // Submit new message

// Admin routes (add authentication middleware later)
Messgerouter.get('receive-messages/', getAllMessages); // Get all messages
Messgerouter.get('get-summary-message/stats', getMessageStats); // Get message statistics
Messgerouter.get('receive-message/:id', getMessageById); // Get single message
Messgerouter.patch('edit-messge-status/:id', updateMessageStatus); // Update message status
Messgerouter.delete('delete-message/:id', deleteMessage); // Delete message

export default Messgerouter;