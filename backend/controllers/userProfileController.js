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
  // This endpoint is used with multipart/form-data.
  // Non-file fields are sent as a single JSON string in req.body.clinicData.
  let clinicBasicData;
  let contactInfo;
  let operatingHours;
  let staffInfo;
  let legalVerification;
  let facilities;
  let languages;
  let branding;
  let notifications;
  let userRef;

  try {
    const parsed = req.body?.clinicData ? JSON.parse(req.body.clinicData) : {};
    ({
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
    } = parsed);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid clinicData JSON",
      error: error.message,
    });
  }

  try {
    if (!userRef) {
      return res.status(400).json({ success: false, message: "Missing userRef" });
    }

    const existingUser = await userModel.findById(userRef);
    const existingClinic = await clinicModel.findOne({ userRef });
    const existingRegNumber = await clinicModel.findOne({ 'legalVerification.registrationNumber': legalVerification.registrationNumber })
    if (!existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    } else if (existingClinic) {
      return res
        .status(400)
        .json({ success: false, message: "Clinic profile already exists" });
    }else if(existingRegNumber){
       return res
        .status(400)
        .json({ success: false, message: "Registation Number already exist",isRegExist:true });
    }

    // Process uploaded files
    const logoData = req.files?.logo?.[0];
    const documentData = req.files?.verificationDocument?.[0];

    const newClinicProfile = new clinicModel({
      clinicBasicData,
      contactInfo,
      operatingHours,
      staffInfo,
      legalVerification: {
        ...legalVerification,
        verificationDocument: documentData
          ? {
              data: documentData.buffer,
              contentType: documentData.mimetype,
              fileName: documentData.originalname,
            }
          : undefined,
      },
      facilities,
      languages,
      branding: {
        ...branding,
        logo: logoData
          ? {
              data: logoData.buffer,
              contentType: logoData.mimetype,
              fileName: logoData.originalname,
            }
          : undefined,
      },
      notifications,
      userRef,
    });
     await newClinicProfile.save();
    res.status(201).json({
      success: true,
      message: "Clinic profile created successfully",
    });

  } catch (error) {
    console.error('clinicProfileCreation error:', error);

    // Return validation errors as 400 so frontend can show proper messages
    if (error?.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Clinic profile validation failed",
        error: error.message,
        details: error.errors,
      });
    }

    if (error?.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Clinic profile validation failed',
        error: error.message,
      });
    }

    if (error?.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Duplicate key error',
        error: error.message,
        keyValue: error.keyValue,
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create Clinic profile",
      error: error.message,
    });
  }
};
