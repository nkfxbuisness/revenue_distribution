const express = require("express");
const {
  accountActivation,
  accountActivationById,
  activationRequestRejectById,
} = require("../controllers/adminControllers");
const { authenticate, authorizeRoles } = require("../middleware/accessablityMidddleWare");
const Router = express.Router();

Router.get("/accountActivation",authenticate, authorizeRoles(['superAdmin']), accountActivation);
Router.put("/accountActivation/:id",authenticate, authorizeRoles(['superAdmin']), accountActivationById);
Router.put("/activationRequestReject/:id",authenticate, authorizeRoles(['superAdmin']), activationRequestRejectById);

module.exports = Router;
