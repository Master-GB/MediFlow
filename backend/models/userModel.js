import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['patient','clinicAdmin','doctor','pharmacist'],
        default:'patient'
    },
    verifyOtp:{
        type:String,
        default:''
    },
    verifyOtpExpiry:{
        type:Number,
        default:0
    },
    isAccountVerified:{
        type:Boolean,
        default:false
    },
    resetOtp:{
        type:String,
        default:''
    },
    resetOtpExpiry:{
        type:Number,
        default:0
    }
})

const User = mongoose.models.users || mongoose.model('users',userSchema);
export default User;