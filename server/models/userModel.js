const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const depositSchema = new mongoose.Schema({
    depositAmount:{type:Number,required:false},
    octaRequestNo:{type:String,required:false},
    depositReceiptUrl:{type:String,required:false},
    depositDate:{type:Date,required:false}
})

const userSchema = new mongoose.Schema({
    name:{type : String , required : true},
    email : {type:String,required:true},
    mobileNo:{type:Number,required :true},
    DOB:{type:Date,required :true},
    address:{type:String,required:true},
    accountNo:{type:Number,required:true},
    IFSCcode:{type:String,required:true},
    bank:{type:String,required:true},
    PANno:{type:String,required:true},
    PANcardUrl:{type:String,required:false},
    aadhaarNo:{type:Number,required:true},
    aadhaarCardUrl:{type:String,required:false},
    password:{type:String,required:true},
    copyProportion:{type:Number,required:true,default:1},
    parent:{type:mongoose.Schema.Types.ObjectId,ref:"Admin"},
    child:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
    referralCode:{type:String,required:true},
    active:{type:Boolean,default:false},
    activationRequestSubmitted:{type:Boolean,default:false},
    activationRequestRejected:{type:Boolean,default:false},
    activationRejectionRemarks:{type:String,required:false},
    suspended:{type:Boolean,default:false},
    initialDepositedAmount:{type:Number,required:false},
    octaAccountBalance:{type:Number,required:false},
    walletBalance:{type:Number,required:false},
    regFeesReciptUrl:{type:String,required:false},
    regFeesTransactionId:{type:String,required:false},
    regFeesPaymentDate:{type:Date,required:false},
    depositData:[depositSchema],
    role:{type:String , default:"user"}
    },
    { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  console.log("form matchPassword !!");
  console.log("entered password",enteredPassword);
  console.log("result", bcrypt.compare(enteredPassword, this.password))
  
  
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);
module.exports = User;