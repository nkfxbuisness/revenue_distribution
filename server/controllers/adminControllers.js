const Admin = require("../models/adminModel");
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

/**
 * Route     /api/admin/createAdmin/
 * Des       add a admin with specefic accessablity
 * Params    none
 * Access    private
 * Method    post
 */

const createAdmin = async (req, res) => {
  const { name, password, mobileNo, email, roles } = req.body;
  if ((!name || !password || !roles || !email)) {
    return res.status(400).json({
      success: false,
      message: "mandatory fields not provided !!",
    });
  }

  try {
    const newAdmin = new Admin({
      name,
      password,
      mobileNo,
      email,
      roles,
      isSuperAdmin: roles.includes("superAdmin"),
    });

    // Saving the new admin to the database
    await newAdmin.save();

    res
      .status(201)
      .json({
        success: true,
        message: "Admin created successfully",
        data: newAdmin,
      });
  } catch (error) {
    console.error("Error creating admin:", error);
    res.status(500).json({ message: "Error creating admin", error });
  }
};

/**
 * Route     /api/admin/getAllAdmins/
 * Des       get all existing admins
 * Params    none
 * Access    private
 * Method    get
 */
const getAllAdmins = async(req,res)=>{
  try {
    const admins = await Admin.find({isSuperAdmin:false});
    return res.status(200).json({
      success:true,
      message:"all admins except superadmin",
      data:admins
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

/**
 * Route     /api/admin/changeAccessablity/:id
 * Des       change accessiblity for an admin
 * Params    none
 * Access    private
 * Method    put
 */

const changeAccessablity = async(req,res)=>{
  const {id} = req.params;
  const {roles} = req.body ;
  try {
    const updatedAdmin = await Admin.findByIdAndUpdate(
      id,
      { $set: { roles : roles } },
      { new: true, runValidators: true }
    )
    if(!updatedAdmin){
      return res.status(400).json({
        success:false,
        message:"Failed to update admin accessiblity"
      })
    }
    return res.status(200).json({
      success:true,
      message:`accessiblity updated for ${updatedAdmin.name}`,
      data:updatedAdmin
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

/**
 * Route     /api/admin/deleteAdmin/:id
 * Des       delete an an admin
 * Params    none
 * Access    private
 * Method    delete
 */

const deleteAdmin = async(req,res)=>{
  try {
    const {id} = req.params;
    const deletedAdmin = await Admin.findByIdAndDelete(id);

    if (!deletedAdmin) {
      return res.status(404).json({success:false, message: 'Admin not found' });
    }

    res.status(200).json({ success:true , message: `Admin ${deleteAdmin.name} deleted successfully`, });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}


module.exports = {
  accountActivation,
  accountActivationById,
  activationRequestRejectById,
  createAdmin,
  getAllAdmins,
  changeAccessablity,
  deleteAdmin
};
