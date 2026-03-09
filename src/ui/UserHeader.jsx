import { User } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

export default function UserHeader() {
  return (
    <div className="flex items-center justify-between px-5 py-2 bg-gray-200 sticky top-0 z-50">
      <h1 className="text-2xl font-bold">
        Tutor<span className="text-blue-500">Hub</span>
      </h1>
      <nav className="sm:flex hidden items-center gap-5 list-none text-md font-semibold">
        <NavLink
          to="/userdashboard"
          className="hover:underline"
          activeclassname="underline"
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/tutors"
          className="hover:underline"
          activeclassname="underline"
        >
          Tutors
        </NavLink>
        <NavLink
          to="/userbookings"
          className="hover:underline"
          activeclassname="underline"
        >
          My Bookings
        </NavLink>
        <NavLink
          to="/usermessages"
          className="hover:underline"
          activeclassname="underline"
        >
          Messages
        </NavLink>
        <NavLink
          to="/userreport"
          className="hover:underline"
          activeclassname="underline"
        >
          Report
        </NavLink>
        <NavLink
          to="/userprofile"
          className="p-2 rounded-full border border-black"
        >
          <User size={18} />
        </NavLink>
      </nav>
    </div>
  );
}
