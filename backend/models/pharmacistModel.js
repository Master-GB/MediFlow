import mongoose from 'mongoose';
import BaseUser from './baseUserModel.js';

const pharmacistSchema = new mongoose.Schema({
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
        pharmacyRegistrationNumber: {
            type: String,
            required: true,
            unique: true
        },
        licenseNumber: {
            type: String,
            required: true,
            unique: true
        },
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
                pharmacy: String,
                position: String,
                startDate: Date,
                endDate: Date,
                description: String
            }]
        },
        specializations: [{
            type: String,
            enum: [
                'Clinical Pharmacy', 'Hospital Pharmacy', 'Community Pharmacy',
                'Industrial Pharmacy', 'Regulatory Affairs', 'Pharmacology',
                'Toxicology', 'Nuclear Pharmacy', 'Compounding',
                'Geriatric Pharmacy', 'Pediatric Pharmacy', 'Oncology Pharmacy'
            ]
        }]
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
    
    // Pharmacy Affiliation
    affiliations: [{
        pharmacy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Pharmacy'
        },
        position: String,
        startDate: Date,
        endDate: Date,
        isCurrent: {
            type: Boolean,
            default: true
        },
        workSchedule: {
            days: [String],
            startTime: String,
            endTime: String
        }
    }],
    
    // Work Schedule & Availability
    workSchedule: {
        workingDays: [{
            type: String,
            enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        }],
        workingHours: {
            startTime: {
                type: String,
                required: true
            },
            endTime: {
                type: String,
                required: true
            }
        },
        breakTime: {
            startTime: String,
            endTime: String
        },
        onCallAvailability: {
            available: {
                type: Boolean,
                default: false
            },
            phoneNumber: String,
            hours: String
        }
    },
    
    // Services Offered
    services: {
        prescriptionFilling: {
            type: Boolean,
            default: true
        },
        medicationCounseling: {
            type: Boolean,
            default: true
        },
        healthScreening: {
            type: Boolean,
            default: false
        },
        vaccinationServices: {
            type: Boolean,
            default: false
        },
        compounding: {
            type: Boolean,
            default: false
        },
        homeDelivery: {
            type: Boolean,
            default: false
        },
        onlineConsultation: {
            type: Boolean,
            default: false
        },
        specializedServices: [String]
    },
    
    // Expertise & Knowledge
    expertise: {
        therapeuticAreas: [{
            type: String,
            enum: [
                'Cardiovascular', 'Endocrinology', 'Gastroenterology', 'Infectious Diseases',
                'Mental Health', 'Neurology', 'Oncology', 'Pain Management',
                'Pediatrics', 'Respiratory', 'Women\'s Health', 'Geriatrics'
            ]
        }],
        medicationCategories: [{
            type: String,
            enum: [
                'Antibiotics', 'Antihypertensives', 'Antidiabetics', 'Analgesics',
                'Antidepressants', 'Antipsychotics', 'Vaccines', 'Vitamins',
                'Herbal Medicines', 'Dermatological', 'Ophthalmic', 'ENT'
            ]
        }],
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
    
    // Prescription Management
    prescriptionManagement: {
        digitalPrescriptionSupport: {
            type: Boolean,
            default: true
        },
        electronicHealthRecords: {
            type: Boolean,
            default: false
        },
        drugInteractionChecking: {
            type: Boolean,
            default: true
        },
        allergyChecking: {
            type: Boolean,
            default: true
        },
        dosageValidation: {
            type: Boolean,
            default: true
        }
    },
    
    // Inventory Management
    inventoryManagement: {
        managedCategories: [String],
        preferredSuppliers: [{
            name: String,
            contactPerson: String,
            phone: String,
            email: String,
            specialties: [String]
        }],
        stockManagement: {
            automatedReordering: {
                type: Boolean,
                default: false
            },
            expiryTracking: {
                type: Boolean,
                default: true
            },
            temperatureControlled: {
                type: Boolean,
                default: false
            }
        }
    },
    
    // Patient Information
    patients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    }],
    prescriptions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Prescription'
    }],
    
    // Consultations & Counseling
    consultations: [{
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Patient'
        },
        type: {
            type: String,
            enum: ['Medication Counseling', 'Health Screening', 'Vaccination', 'General Consultation']
        },
        date: {
            type: Date,
            default: Date.now
        },
        duration: Number, // in minutes
        notes: String,
        followUpRequired: {
            type: Boolean,
            default: false
        },
        followUpDate: Date
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
        totalPrescriptions: {
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
    
    // Compliance & Legal
    compliance: {
        gdprCompliant: {
            type: Boolean,
            default: true
        },
        hipaaCompliant: {
            type: Boolean,
            default: true
        },
        localRegulationsCompliant: {
            type: Boolean,
            default: true
        },
        lastComplianceCheck: Date,
        nextComplianceCheck: Date
    },
    
    // Settings & Preferences
    settings: {
        appointmentReminders: {
            type: Boolean,
            default: true
        },
        prescriptionReminders: {
            type: Boolean,
            default: true
        },
        automaticRefillReminders: {
            type: Boolean,
            default: false
        },
        consultationFee: {
            type: Number,
            default: 0
        }
    }
}, {
    timestamps: true
});

// Virtual for full name
pharmacistSchema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName}`;
});

// Virtual for current affiliations
pharmacistSchema.virtual('currentAffiliations').get(function() {
    return this.affiliations.filter(aff => aff.isCurrent);
});

// Indexes for better performance (remove duplicates from unique fields)
pharmacistSchema.index({ firstName: 1, lastName: 1 });
pharmacistSchema.index({ 'professionalInfo.specialization': 1 });
pharmacistSchema.index({ verificationStatus: 1 });
pharmacistSchema.index({ 'statistics.averageRating': 1 });
pharmacistSchema.index({ 'contactInfo.address.city': 1 });
// pharmacyRegistrationNumber and licenseNumber already have unique: true

const Pharmacist = BaseUser.discriminator('pharmacist', pharmacistSchema);

export default Pharmacist;
