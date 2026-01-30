import express from "express";
import {patientProfileCreation} from '../controllers/userProfileController.js'

const userProfileRouter = express.Router();

userProfileRouter.post('/patient-profile-creation',patientProfileCreation)

export default userProfileRouter;