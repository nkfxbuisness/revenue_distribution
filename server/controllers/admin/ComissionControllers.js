 // Assuming User schema is already registered

const User = require("../../models/userModel");
let mongoose = require('mongoose');
// var id = mongoose.Types.ObjectId('4edd40c86762e0fb12000003');


const calculateComissionForASingleUser =  async (req, res) => {

  try {
    // const { userId } = req.params;
    const { userId,totalProfit, arr } = req.body; // Assume totalProfit and arr[] are passed in the request body

    // Step 1: Find the user with active and non-suspended status
    // let id = new mongoose.Types.ObjectId(userId);
    // console.log(id);
    const user = await User.findById(
    // {
    //   _id: id,
    //   "activationStatus.active": true,
    //   "activationStatus.suspended": false
    // }
    userId).lean();

    if (!user) {
      return res.status(404).json({ message: 'User not found or inactive/suspended' });
    }

    console.log(user);

    // Step 2: Use graphLookup to get descendants up to 20 levels deep
    const result = await User.aggregate([
      { $match: { _id: user._id } },
      {
        $graphLookup: {
          from: "users",
          startWith: "$_id",
          connectFromField: "_id",
          connectToField: "parent",
          depthField: "level",
          maxDepth: 20,
          as: "descendants",
          restrictSearchWithMatch: {
            "activationStatus.active": true,
            "activationStatus.suspended": false
          }
        }
      },
      {
        $project: {
          "descendants.copyProportion": 1,
          "descendants.level": 1,
          "descendants._id": 1 // Fetch only necessary fields
        }
      }
    ]);
    console.log(result);
    let totalCommission = 0;
    result[0].descendants.forEach(child => {
      const level = child.level;
      if (level < arr.length) {
        const commission = (totalProfit * child.copyProportion) * arr[level];
        totalCommission += commission;
      }
    });
    console.log(totalCommission);

    // await User.updateOne(
    //   { _id: user._id },
    //   { 
    //     $inc: { walletBalance: totalCommission }, 
    //     $set: { commissionProcessed: 'Completed' }
    //   },
    //   { session }
    // );

    // // Step 4: Update the user's credit data
    // const creditData = {
    //   amount: totalCommission,
    //   date: new Date()
    // };

    // await User.updateOne(
    //   { _id: user._id },
    //   { $push: { creditData } },
    //   { session }
    // );

    res.status(200).json({ message: 'Commission calculated and credited successfully' });
  } catch (error) {
    console.error("Error calculating commission: ", error);
    res.status(500).json({ message: 'An error occurred during commission calculation' });
  }
};

module.exports = calculateComissionForASingleUser;