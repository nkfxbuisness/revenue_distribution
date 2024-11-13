const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: false }, 
  datePosted: { type: Date, default: Date.now },
  link : {type:String , required:false}
});

const Announcement = mongoose.model('Announcement', announcementSchema);
module.exports = Announcement;