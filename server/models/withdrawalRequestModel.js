const mongoose = require('mongoose')

const withdrawalRequestSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    date:{type:Date,required:true},
    amount:{type:Number,required:true},
    success:{type:Boolean,default:false},
    gateway:{type:mongoose.Schema.Types.ObjectId,ref:'WithdrawalGateway'}
})

const WithdrawalRequest = mongoose.model('WithdrawalRequest',withdrawalRequestSchema)

module.exports = WithdrawalRequest