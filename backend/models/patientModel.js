import mongoose from 'mongoose';


const patientSchema = new mongoose.Schema({
    
    userRef:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },

    fullName: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Non-binary', 'Prefer not to say', 'Other']
    },
    
    // Physical Measurements
    height: {
        type: Number, // in cm
        min: 40,
        max: 300,
    },
    weight: {
        type: Number, // in kg
        min: 2,
        max: 600,
    },
    
     mobileNumber: {
        type: String,
    },
    
    bloodType: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown'],
    },
    
    // Medical Information
    medicalInfo: {
        bloodPressure: {
            systolic: {
                type: Number,
            },
            diastolic: {
                type: Number,
            }
        },
        allergies: [{
            type: String,
        }],
        medications: [{
                type: String,
        }],
        conditions: [{        
                type: String,
        }],
       
    },

     lifestyleHabits: {
            smoking: {
                type: String,
                 default: ''
            },
            alcohol: {
                type: String,
                 default: ''
            },
            exercise: {
                type: String,
                 default: ''
            },
            diet: {
                type: String,
                 default: ''
            }
        },

    // Health Goals
    healthGoals: [{
            type: String,
    }],
    
    // Emergency Contact
    emergencyContact: {
        name: {
            type: String,
             default: ''
        },
        relationship: {
            type: String,
            default: ''
        },
        phone: {
            type: String,
            default: ''
        },
    },
    // Insurance Information
    insurance: {
        provider: String,
        policyNumber: String,
        groupNumber: String,
        coverageDetails: String,
        validUntil: Date
    },
    
    // Medical History
    medicalHistory: [{
        type: {
            type: String,
            enum: ['Surgery', 'Hospitalization', 'Diagnosis', 'Treatment', 'Vaccination', 'Other']
        },
        description: {
            type: String
        },
        date: {
            type: Date
        },
        provider: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Doctor'
        },
        facility: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Clinic'
        },
        documents: [String] // URLs to medical documents
    }],
    
    // Family Medical History
    familyMedicalHistory: [{
        relation: {
            type: String,
        },
        condition: {
            type: String,
        },
        notes: String
    }],
    
    // Appointments
    appointments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment'
    }],
    
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
    },

    // Privacy Settings
    privacySettings: {
        shareDataWithDoctors: {
            type: Boolean,
            default: false
        },
        shareDataWithPharmacies: {
            type: Boolean,
            default: false
        },
        allowResearchParticipation: {
            type: Boolean,
            default: false
        }
    }
}, {
    timestamps: true
});


const Patient = mongoose.models.Patient || mongoose.model('patientProfile',patientSchema)
export default Patient;
