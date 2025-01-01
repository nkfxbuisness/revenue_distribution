const mongoose = require('mongoose');

const monthlyProfitSchema = new mongoose.Schema({
    totalprofit:{type:Number,required:true},
    month:{type:Date,required:true}
},{timestamps:true})

const MonthlyProfit = mongoose.model('MonthlyProfit',monthlyProfitSchema);
module.exports = MonthlyProfit;