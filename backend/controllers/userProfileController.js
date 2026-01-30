import patientModel from '../models/patientModel.js'
import clinicModel from '../models/clinicModel.js'
import userModel from "../models/userModel.js";

export const patientProfileCreation = async (req,res) =>{
    const {fullName, dateOfBirth, gender, height, weight, mobileNumber, bloodType, medicalInfo, lifestyleHabits, healthGoals, emergencyContact,userRef } = req.body;

    
    if(!fullName || !userRef){
        return res.status(400).json({success:false, message:"Missing Details"});
    }

    try{
        
    const existingUser = await userModel.findById(userRef)
    const existingPatient = await patientModel.findOne({ userRef })
     if (!existingUser) {
      return res.status(400).json({ success: false, message: "User not found" });
    }
    else if(existingPatient){
        return res.status(400).json({ success: false, message: "Patient profile already exists" });
    }

   const newPatientProfile = new patientModel({
            userRef,
            fullName,
            dateOfBirth,
            gender,
            height,
            weight,
            mobileNumber,
            bloodType,
            medicalInfo,
            lifestyleHabits,
            healthGoals,
            emergencyContact
        });
        await newPatientProfile.save();
        res.status(201).json({ 
            success: true, 
            message: "Patient profile created successfully",
            data: newPatientProfile
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Failed to create patient profile",
            error: error.message 
        });
    }

}

