import React from "react";
import {
  BookOpen,
  Flag,
  House,
  LogOut,
  MessageCircle,
  User,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { tutorSignOut } from "../lib/appStore";

const links = [
  { label: "Dashboard", to: "/tutordashboard", icon: House },
  { label: "Bookings", to: "/tutorbookings", icon: BookOpen },
  { label: "Message", to: "/tutormessages", icon: MessageCircle },
  { label: "Profile", to: "/tutorprofile", icon: User },
  { label: "Report", to: "/tutorreport", icon: Flag },
];

export default function TutorAside() {
  const navigate = useNavigate();

  const handleLogout = () => {
    tutorSignOut();
    navigate("/tutorsignin");
  };

  return (
    <>
      <aside className="sticky top-4 hidden h-[calc(100vh-2rem)] w-64 rounded-2xl border border-cyan-100 bg-white p-4 shadow-lg lg:block">
        <h2 className="px-2 text-xl font-black text-slate-900">Tutor Panel</h2>
        <nav className="mt-4 space-y-2">
          {links.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-bold transition-colors ${
                    isActive ? "bg-cyan-600 text-white" : "text-slate-700 hover:bg-cyan-50"
                  }`
                }
              >
                <Icon size={16} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={handleLogout}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-sm font-bold text-white hover:bg-slate-800"
        >
          <LogOut size={16} />
          Logout
        </button>
      </aside>

      <div className="fixed bottom-2 left-1/2 z-50 flex w-[95%] -translate-x-1/2 items-center justify-between rounded-full border border-slate-200 bg-white p-2 shadow-lg lg:hidden">
        {links.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `flex h-14 w-14 flex-col items-center justify-center rounded-full text-[10px] font-bold ${
                  isActive ? "bg-cyan-600 text-white" : "text-slate-700"
                }`
              }
            >
              <Icon size={15} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
        <button
          type="button"
          onClick={handleLogout}
          className="flex h-14 w-14 flex-col items-center justify-center rounded-full text-[10px] font-bold text-red-600"
        >
          <LogOut size={15} />
          <span>Logout</span>
        </button>
      </div>
    </>
  );
}
