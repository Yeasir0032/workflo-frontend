"use client";
import { openDrawer } from "@/states/Drawer-controller";
import {
  CalendarDays,
  Filter,
  PlusCircle,
  Search,
  Share2,
  Stars,
} from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";

const DashboardMenus = () => {
  const dispatch = useDispatch();
  return (
    <div className="flex my-4 w-full justify-between">
      <label className="input text-zinc-400 text-lg ct gap-2 bg-white">
        <input type="text" className="grow bg-white" placeholder="Search" />
        <Search />
      </label>
      <div className="flex gap-4 text-zinc-500 text-lg items-center">
        <div className="p-2 bg-zinc-100 rounded-md cursor-pointer gap-2 flex">
          Calender view <CalendarDays />
        </div>
        <div className="p-2 bg-zinc-100 rounded-md cursor-pointer gap-2 flex">
          Automation <Stars />
        </div>
        <div className="p-2 bg-zinc-100 rounded-md cursor-pointer gap-2 flex">
          Filter <Filter />
        </div>
        <div className="p-2 bg-zinc-100 rounded-md cursor-pointer gap-2 flex">
          Share <Share2 />
        </div>
        <button
          className="btn b-g text-white flex text-xl font-[400]"
          onClick={() => dispatch(openDrawer({ status: "" }))}
        >
          Create new <PlusCircle />
        </button>
      </div>
    </div>
  );
};

export default DashboardMenus;
