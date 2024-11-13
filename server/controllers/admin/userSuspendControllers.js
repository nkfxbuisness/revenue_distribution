const User = require("../../models/userModel");

const findUserBy = async(req,res) =>{
    const {findby,value} = req.body;
    console.log(findby,value);
    
    try {
        if(findby === "name"){
            const user = await User.find({
                name: { $regex: value, $options: 'i' }
            }).select("name email mobileNo activationStatus");
            return res.json({success:true,data:user});
        }else if(findby === "email"){
            const user = await User.find({email:value}).select("name email mobileNo activationStatus");;
            return res.json({success:true,data:user});
        }else if(findby === "mobileNo"){
            const user = await User.find({mobileNo:value}).select("name email mobileNo activationStatus");;
            return res.json({success:true,data:user});
        }
        return res.json({success:false,message:"user not found !"});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
}

const suspendAUser = async(req,res)=>{
    const {id}=req.params;
    const {suspentionRemarks} = req.body;
    try {
        const user = await User.findByIdAndUpdate(
            id,
            {
                $set: {
                  "activationStatus.suspended": true,
                  "activationStatus.suspentionRemarks":suspentionRemarks ,
                },
              },
        )
        return res.status(200).json({success:true,message:`${user.name} suspended`})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
}
module.exports = {findUserBy,suspendAUser}