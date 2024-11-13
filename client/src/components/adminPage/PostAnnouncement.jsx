import React, { useContext, useEffect, useState } from "react";
import getFormattedDate from "../toast/getFormattedDate";
import AdminContext from "../../context/AdminContext";
import axios from "axios";
import showToastMessage from "../toast/Toast";
import Spinner from "../toast/animation/Spinner";
import PulseLoader from "../toast/animation/PulseLoader";
import WhiteSpinner from "../toast/animation/WhiteSpinner";

const PostAnnouncement = () => {
  const { token } = useContext(AdminContext);
  const [announcements, setAnnouncements] = useState([]);
  const [title,setTitle]=useState("");
  const [message,setMessage]=useState("");
  const [link,setLink]=useState("");
  const [loading1,setLoading1]=useState(false);
  const [loading2,setLoading2]=useState(false);
  const postAnnouncement = async () =>{
    if(! title || ! message){
      showToastMessage("warn","title and message cannot be blank")
      return;
    }
    try {
      setLoading1(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
      };
      const { data } = await axios.post(
        `http://localhost:4000/api/admin/postAnnouncement`,
        {
          title,
          message,
          link,
          datePosted:Date.now()
        },
        config
      );
      console.log(data);

      const temp = {
        title:title,
        datePosted:Date.now()
      }
      setTitle("");
      setMessage("");
      setLink("");
      addAnnouncementOnList(temp);
      if (data.success) {
        setLoading1(false);
        showToastMessage("success", data.message);
      } else {
        setLoading1(false);
        showToastMessage("error", data.message);
      }
    } catch (error) {
      setLoading1(false);
      showToastMessage("error", `${error}`);
    }
  }

  const getAllAnnouncement = async () =>{
    try {
      setLoading2(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
      };
      const { data } = await axios.get(
        `http://localhost:4000/api/admin/getAllAnnouncements`,
        config
      );
      console.log(data.data);
      const temp = data.data.sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted));
      console.log(temp);
      
      
      if (data.success) {
        setAnnouncements(temp)
        setLoading2(false)
        // showToastMessage("success", "yes");
      } else {
        setLoading2(false)
        showToastMessage("error", "Failed to get all announcements");
      }
    } catch (error) {
      setLoading2(false)
      showToastMessage("error", `${error}`);
    }
  }

  const deleteAnAnnouncement = async(id)=>{
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
      };
      const { data } = await axios.delete(
        `http://localhost:4000/api/admin/deleteAnnouncement/${id}`,
        config
      );
      console.log(data.data);
      if (data.success) {
        deleteAnnouncement(id);
        showToastMessage("success", data.message);
      } else {
        showToastMessage("error", data.message);
      }
    } catch (error) {
      showToastMessage("error", `${error}`);
    }
  }
  const addAnnouncementOnList = (announcement)=>{
    setAnnouncements((prevAnnouncements) => [announcement, ...prevAnnouncements]);
  }
  const deleteAnnouncement = (idToDelete) => {
    setAnnouncements((temp) => temp.filter((announcement) => announcement._id !== idToDelete));
  };

  useEffect(() => {
    getAllAnnouncement();
  }, [])
  
  return (
    <>
      <div className="flex min-h-screen h-full justify-center items-center ">

        {/* post an announcement  */}
        <div className="w-1/2 flex flex-col gap-2 px-8">
          <p className="flex justify-center font-bold text-2xl text-blue-600 py-5">
            Post Announcement
          </p>

          <div className="flex flex-col gap-1  items-start">
            <div className="flex flex-col w-full">
              <label
                htmlFor="title"
                className="font-bold text-lg text-blue-600 py-2 text-left"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                className="py-1 rounded-md w-full shadow-md focus:outline-blue-400"
              />
            </div>

            <div className="flex flex-col gap-1 w-full">
              <label
                htmlFor="message"
                className="font-bold text-lg text-blue-600 py-2 text-left"
              >
                Message
              </label>
              <textarea
                rows={5}
                id="message"
                value={message}
                onChange={(e)=>setMessage(e.target.value)}
                className="py-1 rounded-md w-full shadow-md focus:outline-blue-400"
              ></textarea>
            </div>

            <div className="flex flex-col gap-1 w-full">
              <label
                htmlFor="link"
                className="font-bold text-lg text-blue-600 py-2 text-left"
              >
                Link
              </label>
              <input
                type="text"
                id="link"
                value={link}
                onChange={(e)=>setLink(e.target.value)}
                className="py-1 rounded-md w-full shadow-md focus:outline-blue-400"
              />
            </div>
          </div>

          <button className="flex gap-2 items-center p-2 bg-blue-600 text-white font-semibold mt-3 rounded-md w-fit shadow-md" onClick={postAnnouncement}>
            Post Announcement {loading1?<WhiteSpinner size={"small"}/>:""}
          </button>
        </div>

        {/* Announcements  */}
        <div className="text-2xl text-blue-600 font-bold w-1/2 mr-4 h-5/6 bg-blue-100 py-5 px-5 rounded-lg overflow-y-auto">
          <p className="flex gap-2 items-center justify-center font-bold text-2xl text-blue-600 py-5">
            Announcements  {loading2?<Spinner size={"large"}/>:""}
          </p>
          {loading2? <PulseLoader repeat={5}/> :
          <div className="flex flex-col gap-2 w-full ">
            {announcements.map((announcement,index) => (
              <div className="flex px-3 py-1 text-sm w-full bg-white text-center font-semibold rounded-md items-center text-wrap shadow-md">
                <div class=" text-center px-2  w-1/6">{index+1}</div>
                <div class=" text-center px-2 border-l-2 border-white w-2/6">
                  {announcement.title}
                </div>
                <div className=" text-center px-2 border-l-2 border-white w-2/6">
                  {getFormattedDate(announcement.datePosted)}
                </div>
                <div className=" text-center px-2 border-l-2 border-white w-1/6">
                  <button className="p-2 bg-blue-600 text-white font-semibold rounded-md w-fit" onClick={()=>deleteAnAnnouncement(announcement._id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          }
        </div>

      </div>
    </>
  );
};

export default PostAnnouncement;
