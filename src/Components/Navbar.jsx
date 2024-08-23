import { NavLink } from "react-router-dom";
import { IoPerson, IoPeople, IoPeopleCircle } from "react-icons/io5";

// ========== Navbar Component ==========
export default function Navbar() {
  return (
    <div className="fixed inset-x-0 bottom-0 shadow-cyan-500/50 bg-slate-900 shadow-inner z-1">
      <div className="flex justify-center">
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex flex-col mx-10 items-center p-2 text-xs ${
              isActive ? "text-blue-500" : "text-gray-500"
            }`
          }
        >
          <IoPerson className="text-2xl" />
          Profile
        </NavLink>
        <NavLink
          to="/cupbuds"
          className={({ isActive }) =>
            `flex flex-col mx-10 items-center p-2 text-xs ${
              isActive ? "text-blue-500" : "text-gray-500"
            }`
          }
        >
          <IoPeople className="text-2xl" />
          CupBuds
        </NavLink>
        <NavLink
          to="/irl"
          className={({ isActive }) =>
            `flex flex-col mx-10 items-center p-2 text-xs ${
              isActive ? "text-blue-500" : "text-gray-500"
            }`
          }
        >
          <IoPeopleCircle className="text-2xl" />
          IRL
        </NavLink>
      </div>
    </div>
  );
}
