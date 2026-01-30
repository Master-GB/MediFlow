import mongoose from 'mongoose';

const clinicSchema = new mongoose.Schema({

    clinicBasic:{
         clinicName: {
        type: String,
        required: true,
    },
    clinicType: {
        type: String,
        required: true
    },
    specialties: [{
        type: String
    }],
    yearEstablished: {
        type: Number,
        min: 1800,
        max: new Date().getFullYear()
    },
    clinicDescription: {
        type: String,
        maxlength: 1000
    }
    },
   
    // Contact & Location (nested structure)
    contactInfo: {
        phone: {
            type: String,
            required: true
        },
        emergencyPhone: String,
        address: {
            street: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            },
            province: {
                type: String,
                required: true
            },
            country: {
                type: String,
                default: 'Sri Lanka'
            },
            googleMapsLink: String
        }
    },
    
    // Operating Hours (nested structure)
    operatingHours: {
        workingDays:[{
            type:String,
            required:true
        }],
        openingTime: {
            type: String,
            required: true
        },
        closingTime: {
            type: String,
            required: true
        },
        consultationDuration: Number,
        walkInAvailable: String
    },
    
    // Staff & Doctors (nested structure)
    staffInfo: {
        totalDoctors: {
            type: Number,
            default: 0
        },
        totalStaff: {
            type: Number,
            default: 0
        },
        leadDoctor: {
            leadDoctorName: String,
            leadDoctorSpecialty: String,
            leadDoctorRegistration: String
        }
    },
    legalVerification:{

     registrationNumber: {
        type: String,
        required: true,
        unique: true
    },

     verificationDocument: String,

    },
    // Facilities & Services (nested structure)
    facilities: {
        availableFacilities: [{
            type:String,
            required:true
        }],
        additionalServices: [String]
    },
    
    // Languages (flat array to match frontend)
    languages: [{
        type:String,
        required:true
    }],
    
    // Branding (nested structure)
    branding: {
        logo: String,
        themeColor: {
            type: String,
            default: '#3B82F6'
        }
    },
    
    // Notifications (nested structure)
    notifications: {
        emailNotifications: {
            type:Boolean,
            default:false
        },
        smsNotifications:{
            type:Boolean,
            default:false
        }
    },

     userRef:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
    
}, {
    timestamps: true
});


const Clinic = mongoose.models.Clinic || mongoose.model('clinicProfile',clinicSchema)
export default Clinic;
