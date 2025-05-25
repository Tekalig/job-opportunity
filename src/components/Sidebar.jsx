import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BarChart,
  User,
  Calendar,
  Search,
  PieChart,
  Settings,
  ChevronLeft,
  ChevronRight,
  BriefcaseBusiness,
} from "lucide-react"; // Import lucide-react icons

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  // Define menus with lucide-react icons instead of image sources
  const Menus = [
    { title: "Dashboard", icon: BarChart, to: "/" },
    { title: "Schedule", icon: Calendar, to: "/schedule" },
    { title: "Search job", icon: Search, to: "/post-job" },
    { title: "Project Analytics", icon: PieChart, to: "/project-analytics" },
    { title: "Accounts", icon: User, to: "/accounts", gap: true },
    { title: "Setting", icon: Settings, to: "/setting" },
  ];

  return (
    <div className="flex">
      <div
        className={` ${
          open ? "w-72" : "w-20"
        } bg-gray-900 h-screen relative p-5 pt-8 duration-300`}
      >
        <button
          className="absolute cursor-pointer -right-3 top-9 w-7 border-orange-400
           border-2 rounded-full"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <ChevronLeft className="text-white" />
          ) : (
            <ChevronRight className="text-white" />
          )}
        </button>

        <div className="flex gap-x-4 items-center">
          <div className="text-white text-2xl">
            <Link to="/">{open ? "Job " : <BriefcaseBusiness />} </Link>
          </div>
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Opportunity
          </h1>
        </div>

        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <Link to={`${Menu.to.toLowerCase()}`} key={index}>
              <li
                className={`flex rounded-md p-2 cursor-pointer hover:bg-slate-500 text-gray-300 text-md items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                  index === 0 && "bg-light-white"
                } `}
              >
                {/* Use Lucide-react icons instead of img */}
                <Menu.icon className="text-white" size={20} />
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {Menu.title}
                </span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
