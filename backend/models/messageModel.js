import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true, 
  },
  phone: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'read', 'replied'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field on save
messageSchema.pre('save', function() {
  this.updatedAt = Date.now();
});

const Message = mongoose.model('messages',messageSchema);
export default Message;