import React from "react";
import { FcBullish } from "react-icons/fc";
import { DASHBOARD_SIDEBAR_BOTTOM_LINKS, DASHBOARD_SIDEBAR_LINKS } from "../lib/consts/navigation";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import { HiOutlineLogout } from "react-icons/hi";

const linkClasses =
  " flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base";

const Sidebar = () => {
  return (
    <div className="flex flex-col bg-neutral-900 w-60 p-3 text-white">

      <div className="flex items-center gap-2 px-1 py-3">
        <FcBullish fontSize={24} />
        <span className="text-2xl text-green-500">MacoyShop</span>
      </div>

      <div className="flex-1 py-8 flex flex-col gap-1">
        {DASHBOARD_SIDEBAR_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} />
        ))}
      </div>




      <div className=" py-8 flex flex-col gap-1 pt-2  border-t border-neutral-700">{DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item)=>(
        <SidebarLink key={item.key} item={item}/>
      ))}
       <Link to="/"
      className={classNames(
        " text-red-500 cursor-pointer",
        linkClasses
      )}
    >
      <span className="text-xl"><HiOutlineLogout/></span>
      Logout
    </Link>
      </div>


      
    </div>
  );
};

function SidebarLink({ item }) {
  const { pathname } = useLocation();
  return (
    <Link
      to={item.path}
      className={classNames(
        pathname === item.path
          ? "bg-neutral-700 text-white"
          : "text-neutral-400",
        linkClasses
      )}
    >
      <span className="text-xl">{item.icon}</span>
      {item.label}
    </Link>
  );
}

export default Sidebar;
