import express from "express";
import {patientProfileCreation,clinicProfileCreation} from '../controllers/userProfileController.js'
import { uploadClinicDocuments } from "../middleware/imageUploadMiddleware.js";

const userProfileRouter = express.Router();

userProfileRouter.post('/patient-profile-creation',patientProfileCreation);
userProfileRouter.post('/clinic-profile-creation', uploadClinicDocuments, clinicProfileCreation);

export default userProfileRouter;