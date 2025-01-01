import React, { useContext, useEffect, useState } from "react";
import { LuRefreshCw } from "react-icons/lu";
import UserContext from "../../context/UserContext";
import showToastMessage from "../../util/toast/Toast";
import axios from "axios";
import getFormattedDate from "../../util/date/getFormattedDate";
import { FaExternalLinkAlt } from "react-icons/fa";
import Spinner from "../../util/animation/Spinner";
import PulseLoader from "../../util/animation/PulseLoader";

const Announcements = ({ifSuspendedOrInactive}) => {
  const { user, token } = useContext(UserContext);
  const [announcements, setAnnouncements] = useState([]);
  const [loading,setLoading] = useState(false);
  const getAllAnnouncements = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
      };
      const { data } = await axios.get(
        `http://localhost:4000/api/user/getAllAnnouncements/${user._id}`,
        config
      );
      console.log(data);
      if (data.success) {
        const temp = data.data.sort(
          (a, b) => new Date(b.datePosted) - new Date(a.datePosted)
        );
        setAnnouncements(temp);
      }
      setLoading(false)
    } catch (error) {
      showToastMessage("error", `${error}`);
      setLoading(false)
    }
  };
  useEffect(() => {
    let temp = ifSuspendedOrInactive();
    if (temp) getAllAnnouncements();
  }, []);

  return (
    <>
      {/* heading  */}
      <div className="w-1/2  flex flex-col mx-auto justify-center  min-h-screen h-full">
        <p className="flex justify-center gap-2 items-center font-bold text-3xl text-blue-600 py-4">
          Announcements {loading?<Spinner size={"large"} /> :<LuRefreshCw className="text-2xl cursor-pointer" />  }
        </p>
        {loading?
        <PulseLoader repeat={5}/> :
        <div className="flex flex-col gap-4 w-full pb-5">
          {announcements.map((announcement, index) => (
            <div className="flex flex-col p-5 gap-2 shadow-md bg-white rounded-lg  text-blue-600 text-justify">
              <p className="font-semibold text-xl py-2">{announcement.title}</p>
              <p className="font-thin text-sm">{announcement.message}</p>
              {announcement.link ? (
                <p className="font-thin text-sm flex items-center underline gap-2 cursor-pointer">
                  <a href={announcement.link} target="_blank">{announcement.link}</a>
                  <FaExternalLinkAlt />
                </p>
              ) : (
                ""
              )}
              <p className="font-semibold text-sm">
                {getFormattedDate(announcement.datePosted)}
              </p>
            </div>
          ))}
        </div> }
      </div>
    </>
  );
};

export default Announcements;
