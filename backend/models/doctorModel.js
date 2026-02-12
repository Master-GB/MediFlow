import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
    // Basic Information
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    
    // Professional Information
    professionalInfo: {
        medicalRegistrationNumber: {
            type: String,
            required: true,
            unique: true
        },
        specialization: {
            type: String,
            enum: [
                'General Practice', 'Cardiology', 'Dermatology', 'Endocrinology',
                'Gastroenterology', 'Neurology', 'Oncology', 'Pediatrics',
                'Psychiatry', 'Radiology', 'Surgery', 'Orthopedics',
                'Gynecology', 'Ophthalmology', 'ENT', 'Anesthesiology',
                'Pathology', 'Urology', 'Nephrology', 'Pulmonology',
                'Rheumatology', 'Infectious Disease', 'Emergency Medicine',
                'Family Medicine', 'Internal Medicine', 'Sports Medicine'
            ],
            required: true
        },
        subSpecialties: [String],
        qualifications: [{
            degree: {
                type: String,
                required: true
            },
            institution: {
                type: String,
                required: true
            },
            year: {
                type: Number,
                required: true
            },
            certificate: String // URL to certificate
        }],
        experience: {
            totalYears: {
                type: Number,
                required: true
            },
            currentRoleStartYear: Number,
            previousExperience: [{
                hospital: String,
                position: String,
                startDate: Date,
                endDate: Date,
                description: String
            }]
        }
    },
    
    // Contact & Location
    contactInfo: {
        phone: {
            type: String,
            required: true
        },
        alternatePhone: String,
        address: {
            street: String,
            city: String,
            province: String,
            postalCode: String,
            country: {
                type: String,
                default: 'Sri Lanka'
            }
        }
    },
    
    // Clinic/Hospital Affiliation
    affiliations: [{
        clinic: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Clinic'
        },
        position: String,
        startDate: Date,
        endDate: Date,
        isCurrent: {
            type: Boolean,
            default: true
        },
        consultationHours: {
            days: [String],
            startTime: String,
            endTime: String
        }
    }],
    
    // Consultation Details
    consultationDetails: {
        consultationFee: {
            type: Number,
            required: true
        },
        consultationDuration: {
            type: Number, // in minutes
            default: 30
        },
        availableDays: [{
            type: String,
            enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        }],
        availableTimeSlots: [{
            startTime: String,
            endTime: String,
            maxPatients: {
                type: Number,
                default: 1
            }
        }],
        onlineConsultation: {
            available: {
                type: Boolean,
                default: false
            },
            platforms: [String],
            onlineFee: Number
        },
        homeVisit: {
            available: {
                type: Boolean,
                default: false
            },
            fee: Number,
            areasCovered: [String]
        }
    },
    
    // Specializations & Expertise
    expertise: {
        areasOfExpertise: [String],
        procedures: [{
            name: String,
            experience: String, // e.g., "5+ years", "100+ cases"
            successRate: Number
        }],
        conditions: [String], // Medical conditions they specialize in treating
        languages: [{
            type: String,
            enum: [
                'Sinhala', 'Tamil', 'English', 'Hindi', 'Arabic',
                'French', 'German', 'Spanish', 'Chinese', 'Japanese'
            ]
        }]
    },
    
    // Professional Memberships & Certifications
    professionalMemberships: [{
        organization: String,
        membershipNumber: String,
        joinDate: Date,
        expiryDate: Date,
        status: {
            type: String,
            enum: ['Active', 'Expired', 'Suspended'],
            default: 'Active'
        }
    }],
    certifications: [{
        name: String,
        issuingAuthority: String,
        issueDate: Date,
        expiryDate: Date,
        certificateUrl: String
    }],
    
    // Research & Publications
    research: {
        publications: [{
            title: String,
            journal: String,
            year: Number,
            doi: String,
            coAuthors: [String]
        }],
        researchInterests: [String],
        clinicalTrials: [{
            title: String,
            role: String,
            startDate: Date,
            endDate: Date,
            status: String
        }]
    },
    
    // Patient Information
    patients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    }],
    appointments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment'
    }],
    
    // Reviews & Ratings
    reviews: [{
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Patient'
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: true
        },
        comment: String,
        date: {
            type: Date,
            default: Date.now
        },
        helpful: {
            type: Number,
            default: 0
        }
    }],
    
    // Statistics
    statistics: {
        totalPatients: {
            type: Number,
            default: 0
        },
        totalConsultations: {
            type: Number,
            default: 0
        },
        averageRating: {
            type: Number,
            min: 0,
            max: 5,
            default: 0
        },
        totalReviews: {
            type: Number,
            default: 0
        },
        responseTime: {
            type: Number, // in hours
            default: 24
        }
    },
    
    // Verification & Status
    verificationStatus: {
        type: String,
        enum: ['Pending', 'Verified', 'Rejected', 'Suspended'],
        default: 'Pending'
    },
    verificationDocuments: [{
        type: String, // URLs to documents
        description: String
    }],
    rejectionReason: String,
    
    // Availability Settings
    availabilitySettings: {
        advanceBookingDays: {
            type: Number,
            default: 30
        },
        cancellationPolicy: String,
        emergencyContact: {
            name: String,
            phone: String,
            relationship: String
        }
    },
    
    // Prescription Settings
    prescriptionSettings: {
        digitalPrescription: {
            type: Boolean,
            default: true
        },
        signature: String, // Digital signature URL
        prescriptionTemplate: String,
        defaultMedications: [String]
    }
}, {
    timestamps: true
});

// Virtual for full name
doctorSchema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName}`;
});

// Virtual for current affiliations
doctorSchema.virtual('currentAffiliations').get(function() {
    return this.affiliations.filter(aff => aff.isCurrent);
});


const Doctor = mongoose.models.doctor || mongoose.model('doctorProfile',doctorSchema);

export default Doctor;
