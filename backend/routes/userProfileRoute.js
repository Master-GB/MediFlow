import express from "express";
import {patientProfileCreation,clinicProfileCreation} from '../controllers/userProfileController.js'

const userProfileRouter = express.Router();

userProfileRouter.post('/patient-profile-creation',patientProfileCreation);
userProfileRouter.post('/clinic-profile-creation',clinicProfileCreation);

export default userProfileRouter;