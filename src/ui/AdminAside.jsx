import React from "react";
import { Flag, LayoutDashboard, LogOut, Settings, ShieldCheck, Users } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { adminSignOut } from "../lib/appStore";

const links = [
  { label: "Dashboard", to: "/admindashboard", icon: LayoutDashboard },
  { label: "Tutors", to: "/admintutors", icon: Users },
  { label: "Reports", to: "/adminreports", icon: Flag },
  { label: "Settings", to: "/adminsettings", icon: Settings },
];

export default function AdminAside() {
  const navigate = useNavigate();
  const onLogout = () => {
    adminSignOut();
    navigate("/adminsignin");
  };

  return (
    <>
      <aside className="sticky top-4 hidden h-[calc(100vh-2rem)] w-64 rounded-2xl border border-violet-100 bg-white p-4 shadow-lg lg:block">
        <p className="flex items-center gap-2 px-2 text-xl font-black text-slate-900">
          <ShieldCheck size={18} className="text-violet-600" />
          Admin Panel
        </p>
        <nav className="mt-4 space-y-2">
          {links.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-bold ${
                    isActive ? "bg-violet-600 text-white" : "text-slate-700 hover:bg-violet-50"
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
          onClick={onLogout}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-sm font-bold text-white"
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
                  isActive ? "bg-violet-600 text-white" : "text-slate-700"
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
          onClick={onLogout}
          className="flex h-14 w-14 flex-col items-center justify-center rounded-full text-[10px] font-bold text-red-600"
        >
          <LogOut size={15} />
          <span>Logout</span>
        </button>
      </div>
    </>
  );
}
