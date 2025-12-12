import userModel from "../models/userModel.js";

export const getUserData = async (req, res) => {

    try {
        const id = req.user.id;
        const user = await userModel.findById(id);
        if(!user){
            return res.status(404).json({success:false,message:"User not found"});
        }

        return res.status(200).json({
            success:true,
            message:"User data fetched successfully",
            userData:{
                name:user.name,
                email:user.email,
                isAccountVerified:user.isAccountVerified
            }
        });

    } catch (error) {
        return res.status(500).json({success:false,message:"Error fetching user data",error:error.message});
    }

}
