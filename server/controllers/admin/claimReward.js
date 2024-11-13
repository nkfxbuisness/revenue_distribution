const Claim = require("../../models/claimModel");

const getAllClaims = async(req,res)=>{
    try {
      const claims = await Claim.find({status:"pending"});
      return res.status(200).json({success:true,data:claims});
    } catch (error) {
      return res.json({ success:false ,message: 'Error retrieving announcements' });
    }
  }
  const getUserDetailsForClaim = async(req,res)=>{
    const { id } = req.params;
    try {
      // MongoDB aggregation to get user's activation status, address, and total copy proportion
      const result = await User.aggregate([
        {
          $match: { _id: new mongoose.Types.ObjectId(id) } // Start with the specified user
        },
        {
          $graphLookup: {
            from: 'users', // Collection name where User documents are stored
            startWith: '$_id', // Start from the user's ID
            connectFromField: '_id', // Connect from the ID of each user
            connectToField: 'parent', // Connect to the `parent` field of each user
            as: 'descendants', // The field to store the resulting hierarchy
            maxDepth: 20, // Maximum depth level
            restrictSearchWithMatch: {
              'activationStatus.active': true,
              'activationStatus.suspended': false
            }
          }
        },
        {
          $unwind: {
            path: '$descendants',
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $group: {
            _id: '$_id',
            totalCopyProportion: { $sum: '$descendants.copyProportion' },
            activationStatus: { $first: '$activationStatus' },
            address: { $first: '$address' }
          }
        },
        {
          $project: {
            _id: 0,
            totalCopyProportion: 1,
            activationStatus: 1,
            address: 1
          }
        }
      ]);
  
      // Check if the user exists
      if (result.length === 0) {
        return res.json({ success: false, message: 'User not found' });
      }
  
      // Return the result
      res.json({ success: true, data: result[0] });
    } catch (error) {
      console.error("Error calculating total business:", error);
      res.status(500).json({ success: false, message: "Error getting total business" });
    }
  }
  
  const settleAClaim = async(req,res)=>{
    const{id} = req.params;
    try {
      const claim = await Claim.findById(id);
      if(claim.status!="pending"){
        return res.json({
          success:false,
          message:`already settled !!` 
        })
      }
      const user = await User.findById(claim.user);
  
      claim.status = "approved";
      await claim.save();
  
      user.rewards[claim.milestone -1 ].rewardSettled = true;
      await user.save(); 
      return res.json({
        success:true,
        message:`claim of ${user.name} is settled for milestone ${claim.milestone}` 
      })
    } catch (error) {
      console.error("Error settling a claim", error);
      res.status(500).json({ success: false, message: "Error settling a claim" });
    }
  }

  module.exports = {
    getAllClaims,
    getUserDetailsForClaim,
    settleAClaim
  }