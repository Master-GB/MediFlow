import patientModel from "../models/patientModel.js";
import clinicModel from "../models/clinicModel.js";
import userModel from "../models/userModel.js";

export const patientProfileCreation = async (req, res) => {
  const {
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
    emergencyContact,
    userRef,
  } = req.body;

  if (!fullName || !userRef) {
    return res.status(400).json({ success: false, message: "Missing Details" });
  }

  try {
    const existingUser = await userModel.findById(userRef);
    const existingPatient = await patientModel.findOne({ userRef });
    if (!existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    } else if (existingPatient) {
      return res
        .status(400)
        .json({ success: false, message: "Patient profile already exists" });
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
      emergencyContact,
    });
    await newPatientProfile.save();
    res.status(201).json({
      success: true,
      message: "Patient profile created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create patient profile",
      error: error.message,
    });
  }
};

export const clinicProfileCreation = async (req, res) => {
  const {
    clinicBasicData,
    contactInfo,
    operatingHours,
    staffInfo,
    legalVerification,
    facilities,
    languages,
    branding,
    notifications,
    userRef,
  } = req.body;

  try {
    const existingUser = await userModel.findById(userRef);
    const existingClinic = await clinicModel.findOne({ userRef });
    if (!existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    } else if (existingClinic) {
      return res
        .status(400)
        .json({ success: false, message: "Clinic profile already exists" });
    }

    const newClinicProfile = new clinicModel({
      clinicBasicData,
      contactInfo,
      operatingHours,
      staffInfo,
      legalVerification,
      facilities,
      languages,
      branding,
      notifications,
      userRef,
    });
     await newClinicProfile.save();
    res.status(201).json({
      success: true,
      message: "Clinic profile created successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create Clinic profile",
      error: error.message,
    });
  }
};
