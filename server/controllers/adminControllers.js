const User = require("../models/userModel");

/**
 * Route     /api/admin/accountActivation
 * Des       get list of non active users
 * Params    none
 * Access    Public
 * Method    get
 */
const accountActivation = async (req, res) => {
  try {
    const users = await User.find({
      active: false,
      activationRequestSubmitted: true,
    });
    return res.status(200).json({
      success: true,
      message: "not active users",
      data: users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Route     /api/admin/accountActivation/:id
 * Des       activate a user by id
 * Params    none
 * Access    Public
 * Method    put
 */
const accountActivationById = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: { active: true } },
      { new: true, runValidators: true }
    );
    return res.status(200).json({
      success: true,
      message: "not active users",
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
/**
 * Route     /api/admin/activationRequestReject/:id
 * Des       activation request reject
 * Params    none
 * Access    Public
 * Method    put
 */
const activationRequestRejectById = async (req, res) => {
  const { id } = req.params;
  const { remarks } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          activationRequestRejected: true,
          activationRejectionRemarks: remarks,
        },
      },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: `rejected activation request for ${updatedUser.name}`,
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  accountActivation,
  accountActivationById,
  activationRequestRejectById,
};
