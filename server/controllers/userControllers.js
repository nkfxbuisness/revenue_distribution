const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const WithdrawalRequest = require("../models/withdrawalRequestModel");

/**
 * Route     /api/user/activateAccount/:id
 * Des       login of user
 * Params    none
 * Access    Public
 * Method    POST
 */
const activateAccount = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  const { regFeesReciptUrl, regFeesTransactionId, octaRequestNo } = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    // Set activationRequestSubmitted to true
    user.activationRequestSubmitted = true;

    // Set registration fee details from req.body
    user.regFeesReciptUrl = regFeesReciptUrl;
    user.regFeesTransactionId = regFeesTransactionId;
    user.regFeesPaymentDate = new Date(); // Set to current date

    // Calculate depositAmount based on copyProportion
    const depositAmount = 100 * user.copyProportion;

    // Set deposit data
    const depositData = {
      depositAmount: depositAmount,
      octaRequestNo: octaRequestNo,
      depositDate: new Date(), // Current date in YYYY-MM-DD format
    };

    // Add the deposit data to the depositData array
    user.depositData.push(depositData);

    // Save the updated user document
    await user.save();
    res.status(200).json({
      success: false,
      data: user, // Include the updated user details in the response
      message:
        "User activation request submitted and deposit data updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Route     /api/user/reactivateAccount/:id
 * Des       activate account once activation request rejected
 * Params    none
 * Access    Public
 * Method    put
 */
const reActiveAccount = async (req, res) => {
  const { id } = req.params; // Get user ID from the URL parameter
  const { regFeesReciptUrl, regFeesTransactionId, octaRequestNo } = req.body; // Get fields from request body

  try {
    // Update the user document with new field values
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          regFeesReciptUrl,
          regFeesTransactionId,
          octaRequestNo,
          activationRequestRejected: false,
          activationRejectionRemarks: "",
          activationRequestSubmitted: true,
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Successfully updated
    res.status(200).json({
      success: true,
      message: "User fields updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * Route     /api/user/withdrawalRequest/:id
 * Des       send a new withdrawl request
 * Params    id
 * Access    Protected
 * Method    post
 */
const postWithdrawalRequest = async (req, res) => {
  const { amount } = req.body;
  const { id } = req.params;
  const walletBalance = 300;

  // Validate request
  if (!amount || !id) {
    return res.json({
      success: false,
      message: "User ID or amount not provided",
      data: {},
    });
  }
  if (amount > walletBalance) {
    return res.json({
      success: false,
      message: "Entered amount exceeded wallet balance",
      data: {},
    });
  }

  try {
    // Find user by ID
    const user = await User.findById(id);
    if (!user) {
      return res.json({
        success: false,
        message: "User with this ID not found!",
        data: {},
      });
    }
    console.log(user.name)

    // Check if a withdrawal request is already submitted
    if (user.withdrawalRequestSubmitted) {
      return res.json({
        success: false,
        message: "Withdrawal request already submitted!",
        data: {},
      });
    }

    // Create withdrawal request
    const withdrawalRequest = await WithdrawalRequest.create({
      user: id,
      amount: amount,
      date: Date.now(),
    });
    console.log(withdrawalRequest)

    
    user.withdrawalRequestSubmitted = true;
    user.withdrawalRequests.push(withdrawalRequest._id)
    const updateResult = await user.save();
    console.log(updateResult)
    

    return res.status(200).json({
      success: true,
      message: "Withdrawal request submitted successfully!",
      data: withdrawalRequest,
      updateResult:updateResult,
      // user:upda
    });

  } catch (error) {
    console.error("Error submitting withdrawal request:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * Route     /api/user/changePassword/:id
 * Des       change user password
 * Params    none
 * Access    Public
 * Method    POST
 */
const changePassword = async (req, res) => {
  const { id } = req.params;
  const { currentPassword, newPassword } = req.body;

  // Find the authenticated user
  // const user = await User.findById(req.user._id);
  const user = await User.findById(id);

  // if (user && (await user.matchPassword(currentPassword))) {
  //   // Check if the new password is different from the current password
  //   if (await bcrypt.compare(newPassword, user.password)) {
  //     return res.status(400).json({
  //       message: "New password cannot be the same as the current password.",
  //     });
  //   }

  // Hash the new password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);

  // Save the updated user
  await user.save();

  res.json({ message: "Password updated successfully" });
  // } else {
  return res.status(401).json({ message: "Current password incorrect" });
  // }
};

module.exports = { activateAccount, reActiveAccount,postWithdrawalRequest, changePassword };
