const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  taskName: { type: String, required: true, unique: true }, // e.g., "commissionCalculation"
  totalUsers: { type: Number, required: true }, // Total number of users to process
  processedUsers: { type: Number, default: 0 }, // Users processed so far
  status: { type: String,enum: ["in-progres","completed","failed"], default: "in-progres" }, 
  // "in-progress", "completed", or "failed"
  totalProfit:{type:Number,required:true},
  totalComissionDistributed:{type:Number,default:0,required:false},
  lastUpdated: { type: Date, default: Date.now }, // Last update timestamp
});
const Progress = mongoose.model("Progress", progressSchema);
module.exports = Progress;
