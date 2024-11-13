const Announcement = require("../../models/announcementModel");

const postAnnouncement = async (req, res) => {
  try {
    const { title, message, postedBy, link } = req.body;
    // console.log(req.body)
    const announcement = await Announcement.create({ title, message,  link });
    console.log(announcement);
    
    // await announcement.save();
    return res
      .status(201)
      .json({ success: true, message: "announcement posted successfully" });
  } catch (error) {
    return res.status(500).json({ success:false, message: "Error creating announcement" });
  }
};

const deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Announcement.findByIdAndDelete(id);
    return res.status(200).json({success:true, message: `${deleted.title} deleted` });
  } catch (error) {
    return res.json({success:false, message: "Error deleting announcement" });
  }
};

const getAllAnnouncements = async (req,res) =>{
    try {
        const announcements = await Announcement.find().select("_id title datePosted");
        return res.status(200).json({success:true,data:announcements});
      } catch (error) {
        return res.json({ success:false ,message: 'Error retrieving announcements' });
      }
}
module.exports = {postAnnouncement , deleteAnnouncement , getAllAnnouncements};
