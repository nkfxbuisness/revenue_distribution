const express = require("express");

const { authenticate, authorizeRoles } = require("../middleware/accessablityMidddleWare");
const { accountActivation, accountActivationById, activationRequestRejectById } = require("../controllers/admin/accountActivation")
const { getAllAdmins, createAdmin, changeAccessablity, deleteAdmin } = require("../controllers/admin/adminManagement")
const { addVariable, getVariable, updateVariable } = require("../controllers/admin/variableControllers");
const { getLastProfitEntry, profitUpdate } = require("../controllers/admin/profitUpdate")
const { getAllWithdrawalRequests, downloadInCSVformat, updatePaidStatus } = require("../controllers/admin/withdrawalRequests")
const { postAnnouncement, deleteAnnouncement, getAllAnnouncements } = require("../controllers/admin/announcementControllers")
const { settleAClaim, getUserDetailsForClaim, getAllClaims } = require("../controllers/admin/claimReward");
const { findUserBy, suspendAUser } = require("../controllers/admin/userSuspendControllers");
const calculateComissionForASingleUser = require("../controllers/admin/ComissionControllers");


const Router = express.Router();


// account activation 
Router.get("/accountActivation",authenticate, authorizeRoles(['superAdmin','accountActivation']), accountActivation);
Router.put("/accountActivation/:id",authenticate, authorizeRoles(['superAdmin']), accountActivationById);
Router.put("/activationRequestReject/:id",authenticate, authorizeRoles(['superAdmin']), activationRequestRejectById);

// admin management 
Router.get("/getAllAdmins",authenticate, authorizeRoles(['superAdmin']),  getAllAdmins);
Router.post("/createAdmin",authenticate, authorizeRoles(['superAdmin']),  createAdmin);
Router.put("/changeAccessablity/:id",authenticate, authorizeRoles(['superAdmin']),  changeAccessablity);
Router.delete("/deleteAdmin/:id",authenticate, authorizeRoles(['superAdmin']),  deleteAdmin);

// profit update 
Router.get("/getLastProfitEntry",authenticate, authorizeRoles(['superAdmin']),  getLastProfitEntry);
Router.post("/profitUpdate",authenticate, authorizeRoles(['superAdmin']),  profitUpdate);

// withdrawal requests 
Router.get("/getAllWithdrawalRequests",authenticate, authorizeRoles(['superAdmin']),getAllWithdrawalRequests  );
Router.post("/download-pending-requests",authenticate, authorizeRoles(['superAdmin']),downloadInCSVformat  );
Router.put("/update-paid-status",authenticate, authorizeRoles(['superAdmin']),updatePaidStatus  );

// variable management 
Router.post("/addVariable",addVariable  );
Router.get("/getVariable/:key",getVariable  );
Router.put("/updateVariable/:key",updateVariable  );

// comission calculation 
Router.post("/calculateComissionForASingleUser",calculateComissionForASingleUser  );

// post announcement 
Router.post("/postAnnouncement",postAnnouncement  );
Router.delete("/deleteAnnouncement/:id",deleteAnnouncement  );
Router.get("/getAllAnnouncements",getAllAnnouncements  );

// suspend user 
Router.post("/findUserBy",findUserBy  );
Router.post("/suspendAUser/:id",suspendAUser  );

// reward claims
Router.get("/getAllClaims",getAllClaims  );
Router.get("/getUserDetailsForClaim/:id",getUserDetailsForClaim  );
Router.get("/settleAClaim/:id",settleAClaim  );

module.exports = Router;