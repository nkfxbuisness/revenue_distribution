const User = require("../models/userModel");
const generateToken = require('../config/generateToken')
const generateReferralCode = require('../config/generateReferralCode');
const Admin = require("../models/adminModel");

/**
 * Route     /api/auth/user/login
 * Des       login of user
 * Params    none
 * Access    Public
 * Method    POST
 */
const userLogin = async (req, res) => {
  // localStorage = new LocalStorage('./local')
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "credentials not provideded !!",
    });
  }

  let user = await User.findOne({ email: email });
  console.log(user)
  console.log(await user.matchPassword(password));
  
  if (user && (user.matchPassword(password))) {
    // Convert the user document to a plain object and remove the password field
    console.log("hello");
    
    user = user.toObject();
    delete user.password;
    console.log("userwithoutpassword",user);
    
    const newUser = user;
    return res.status(200).json({
      message: "login successful !",
      user: newUser,
      token: generateToken(user),
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "invalid credentials !!",
    });
  }
};

/**
 * Route     /api/auth/user/signup
 * Des       user registration
 * Params    none
 * Access    Public
 * Method    POST
 */

const userSignup = async (req, res) => {
  // console.log(req.body)
  const {
    name,
    email,
    mobileNo,
    DOB,
    address,
    accountNo,
    IFSCcode,
    bank,
    PANno,
    PANcardUrl,
    aadhaarNo,
    aadhaarCardUrl,
    password,
    confPassword,
    referral
  } = req.body;

  if (
    !name ||
    !email ||
    !mobileNo ||
    !DOB ||
    !address ||
    !accountNo ||
    !IFSCcode ||
    !bank ||
    !PANno ||
    !aadhaarNo ||
    !password ||
    !confPassword ||
    !referral
  ) {
    return res.status(400).json({
      success: false,
      message: "All fields are required !",
    });
  }

  if (password !== confPassword) {
    return res.status(400).json({
      success: false,
      message: "Passwords do not match!",
    });
  }

  const parent = await User.findOne({referralCode:referral});
  if(!parent){
    return res.status(400).json({
      success:false,
      message:"Invalid referral code !!"
    })
  }
  console.log("parent",parent)
 
  const referralCode = await generateReferralCode(name.split(' ')[0])

  const user = await User.findOne({ email: email, mobileNo: mobileNo });
  if (user) {
    return res.status(400).json({
      success: false,
      message: "User with this email or mobile number already exists",
    });
  }

  const newUser = await User.create({
    name,
    email,
    mobileNo,
    DOB,
    address,
    accountNo,
    IFSCcode,
    bank,
    PANno,
    PANcardUrl,
    aadhaarNo,
    aadhaarCardUrl,
    password,
    referralCode:referralCode,
    parent:parent
  });
  console.log("newUser",newUser);

  // If a referring user was found, update their child field
  if (parent) {
    parent.child.push(newUser._id);
    await parent.save();
  }
  console.log("updatedParent",parent);
  

  if (newUser) {
    res.status(201).json({
      success: true,
      data: newUser,
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "Failed to craeate user !",
    });
  }
};

/**
 * Route     /api/auth/admin/signup
 * Des       admin creation
 * Params    none
 * Access    Public
 * Method    POST
 */
const adminSignup = async (req,res)=>{
  const {
    name,
    email,
    roles,
    password
  } = req.body;

  if(
    !name,
    !email,
    !roles,
    !password
  ){
    return res.status(400).json({
      success: false,
      message: "All fields are required !",
    });
  }

  const admin = await Admin.findOne({ email: email });
  if (admin) {
    return res.status(400).json({
      success: false,
      message: "Admin with this email already exists",
    });
  }

  const newAdmin = await Admin.create({
    name,
    email,
    password,
    roles
  });
  console.log("newAdmin",newAdmin);

  if (newAdmin) {
    res.status(201).json({
      success: true,
      data: newAdmin,
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "Failed to craeate user !",
    });
  }
}

/**
 * Route     /api/auth/admin/login
 * Des       admin login
 * Params    none
 * Access    Public
 * Method    POST
 */
const adminLogin = async(req,res)=>{
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "credentials not provideded !!",
    });
  }

  let admin = await Admin.findOne({ email: email });
  if (admin && (await admin.matchPassword(password))) {
    // Convert the user document to a plain object and remove the password field
    admin = admin.toObject();
    delete admin.password;
    console.log("adminWithoutpassword",admin);
    
    const newAdmin = admin;
    return res.status(200).json({
      message: "login successful !",
      admin: newAdmin,
      token: generateToken(newAdmin),
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "invalid credentials !!",
    });
  }
}
module.exports = { userLogin, userSignup,adminSignup,adminLogin };
