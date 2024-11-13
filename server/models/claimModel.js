const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name:{type:String , required:false},
    milestone: { type: Number, required: true }, 
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    approvedOn: { type: Date, required: false },
  },
  { timestamps: true }
);

const Claim = mongoose.model('Claim', claimSchema);
module.exports = Claim;
