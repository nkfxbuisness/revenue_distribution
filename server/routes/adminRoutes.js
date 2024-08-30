const express = require("express");
const {
  accountActivation,
  accountActivationById,
  activationRequestRejectById,
  createAdmin,
  getAllAdmins,
  deleteAdmin,
  changeAccessablity,
  profitUpdate,
  getLastProfitEntry,
} = require("../controllers/adminControllers");
const { authenticate, authorizeRoles } = require("../middleware/accessablityMidddleWare");
const Router = express.Router();

Router.get("/accountActivation",authenticate, authorizeRoles(['superAdmin','accountActivation']), accountActivation);
Router.put("/accountActivation/:id",authenticate, authorizeRoles(['superAdmin']), accountActivationById);
Router.put("/activationRequestReject/:id",authenticate, authorizeRoles(['superAdmin']), activationRequestRejectById);
Router.get("/getAllAdmins",authenticate, authorizeRoles(['superAdmin']),  getAllAdmins);
Router.post("/createAdmin",authenticate, authorizeRoles(['superAdmin']),  createAdmin);
Router.put("/changeAccessablity/:id",authenticate, authorizeRoles(['superAdmin']),  changeAccessablity);
Router.delete("/deleteAdmin/:id",authenticate, authorizeRoles(['superAdmin']),  deleteAdmin);
Router.get("/getLastProfitEntry",authenticate, authorizeRoles(['superAdmin']),  getLastProfitEntry);
Router.post("/profitUpdate",authenticate, authorizeRoles(['superAdmin']),  profitUpdate);

module.exports = Router;
