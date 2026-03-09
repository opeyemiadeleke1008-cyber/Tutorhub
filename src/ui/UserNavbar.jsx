import React, { useState } from "react";
import { Search, BookOpen, User, House, Heart, MessageCircle, Flag } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function UserNavbar() {
  const [showMore, setShowMore] = useState(false);

  // Helper function to manage active vs inactive styles
  const navLinkStyle = ({ isActive }) => 
    `text-sm font-semibold flex flex-col items-center p-2 rounded-full border border-gray-800 border-solid w-15 h-15 cursor-pointer transition-colors ${
      isActive ? "bg-black text-white" : "bg-white/80 text-black"
    }`;

  return (
    <>
      {/* Pop-up Menu */}
      <div 
        className={`fixed bottom-20 justify-self-center w-[90%] bg-white/95 backdrop-blur-md rounded-2xl border border-gray-800 border-solid shadow-xl transition-all duration-300 ease-out z-50 overflow-hidden sm:hidden ${
          showMore ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-10 pointer-events-none"
        }`}
      >
        <div className="flex flex-col p-2">
            <NavLink to="/likedtutors">
          <button className="flex items-center gap-3 p-4 hover:bg-gray-100 rounded-xl transition-colors text-gray-800 font-semibold">
            <Heart size={18} />
            <span>Liked Tutors</span>
          </button>
          </NavLink>
          <NavLink to="/usermessages">
          <button className="flex items-center gap-3 p-4 hover:bg-gray-100 rounded-xl transition-colors text-gray-800 font-semibold border-t border-gray-100">
            <MessageCircle size={18} />
            <span>Messages</span>
          </button>
          </NavLink>
          <NavLink to="/userreport">
          <button className="flex items-center gap-3 p-4 hover:bg-gray-100 rounded-xl transition-colors text-red-600 font-semibold">
            <Flag size={18} />
            <span>Report</span>
          </button>
          </NavLink>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="flex justify-between items-center w-[95%] justify-self-center py-2 px-4 bg-black/10 backdrop-blur-sm rounded-full fixed bottom-2 sm:hidden z-50">
        
        <NavLink to="/userdashboard" className={navLinkStyle}>
          <House size={18} />
          <span>Home</span>
        </NavLink>

        <NavLink to="/tutors" className={navLinkStyle}>
          <Search size={18} />
          <span>Tutors</span>
        </NavLink>

        <NavLink to="/userbookings" className={navLinkStyle}>
          <BookOpen size={18} />
          <span>Fixed</span>
        </NavLink>

        <NavLink to="/userprofile" className={navLinkStyle}>
          <User size={18} />
          <span>Profile</span>
        </NavLink>

        {/* More Button with OnClick */}
        <div 
          onClick={() => setShowMore(!showMore)}
          className={`text-sm font-semibold flex flex-col items-center p-2 rounded-full border border-gray-800 border-solid transition-colors w-15 h-15 justify-center cursor-pointer ${
            showMore ? 'bg-black text-white' : 'bg-white/80 text-black'
          }`}
        >
          <div className="flex flex-col gap-1 items-center">
            <span className={`w-6 h-0.5 ${showMore ? 'bg-white' : 'bg-gray-800'}`}></span>
            <span className={`w-5 h-0.5 ${showMore ? 'bg-white' : 'bg-gray-800'}`}></span>
          </div>
          <span>More</span>
        </div>
      </div>

      {/* Background Overlay to close menu when clicking outside */}
      {showMore && (
        <div 
          className="fixed inset-0 bg-transparent sm:hidden z-40" 
          onClick={() => setShowMore(false)}
        />
      )}
    </>
  );
}