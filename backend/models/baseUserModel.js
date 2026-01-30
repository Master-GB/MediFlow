import mongoose from 'mongoose';

const baseUserSchema = new mongoose.Schema({
    // Common authentication fields
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    
    // Role management - handled by discriminator
    role: {
        type: String,
        enum: ['patient', 'clinic', 'doctor', 'pharmacist'],
        required: true
    },
    
    // Account status
    isAccountVerified: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    
    // OTP fields for email verification
    verifyOtp: {
        type: String,
        default: ''
    },
    verifyOtpExpiry: {
        type: Number,
        default: 0
    },
    
    // Password reset fields
    resetOtp: {
        type: String,
        default: ''
    },
    resetOtpExpiry: {
        type: Number,
        default: 0
    },
    
    // Common profile fields
    profileImage: {
        type: String,
        default: ''
    },
    phoneNumber: {
        type: String,
        default: ''
    },
    
    // Timestamps
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    
    // Last login tracking
    lastLogin: {
        type: Date,
        default: null
    },
    
    // Preferences
    preferences: {
        emailNotifications: {
            type: Boolean,
            default: true
        },
        smsNotifications: {
            type: Boolean,
            default: false
        },
        language: {
            type: String,
            default: 'en'
        },
        timezone: {
            type: String,
            default: 'UTC'
        }
    }
}, {
    timestamps: true,
    discriminatorKey: 'role'
});

// Indexes for better performance (remove duplicates from unique fields)
// email already has unique: true, no need for separate index
baseUserSchema.index({ role: 1 });
baseUserSchema.index({ isAccountVerified: 1 });

// Pre-save middleware to update timestamp
baseUserSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

const BaseUser = mongoose.models.baseusers || mongoose.model('baseusers', baseUserSchema);

export default BaseUser;
