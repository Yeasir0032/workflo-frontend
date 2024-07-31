import { openDrawer } from "@/states/Drawer-controller";
import { RootState } from "@/states/store";
import { setUserId } from "@/states/UserSlice";
import {
  BellDot,
  BookDashed,
  ChevronsRight,
  Download,
  GitGraphIcon,
  HomeIcon,
  PlusCircle,
  Settings,
  Users2,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const DashboardSidebar = () => {
  const router = useRouter();
  const name = useSelector((state: RootState) => state.userState.name);
  const dispatch = useDispatch();
  useEffect(() => {
    const item = localStorage.getItem("user");
    if (!item) {
      router.push("/login");
    } else {
      const id = JSON.parse(item)._id;
      const name = JSON.parse(item).fullName;
      dispatch(setUserId({ userId: id, name }));
    }
  }, []);
  const menuItems = [
    { item: "Home", icon: <HomeIcon />, id: 1 },
    { item: "Boards", icon: <BookDashed />, id: 2 },
    { item: "Settings", icon: <Settings />, id: 3 },
    { item: "Teams", icon: <Users2 />, id: 4 },
    { item: "Analytics", icon: <GitGraphIcon />, id: 5 },
  ];
  return (
    <div className="flex-1 p-4 bg-white h-screen flex flex-col sticky left-0 top-0">
      <div className="flex flex-1 gap-4 flex-col">
        <div className="flex gap-2">
          <div className="avatar">
            <div className="w-8 rounded-xl">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <div className="my-auto">{name}</div>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-6">
            <BellDot className="stroke-1 text-6xl cursor-pointer" />
            <Image
              src="/Frame.svg"
              alt="Fas"
              height={25}
              width={25}
              className="cursor-pointer"
            />
            <ChevronsRight className="stroke-1 text-6xl cursor-pointer" />
          </div>
          <button
            className="btn btn-sm btn-ghost bg-zinc-200 text-zinc-500"
            onClick={() => {
              if (localStorage.getItem("user")) {
                localStorage.removeItem("user");
              }
              router.push("/login");
            }}
          >
            Logout
          </button>
        </div>
        <ul className="">
          {menuItems.map((item) => (
            <div
              className={`flex gap-3 p-2 rounded-md cursor-pointer ${
                item.id === 1 && "bg-zinc-200 border border-zinc-400/50"
              }`}
              key={item.id}
            >
              <span>{item.icon}</span>
              <span>{item.item}</span>
            </div>
          ))}
        </ul>
        <input id="create-drawer" type="checkbox" className="drawer-toggle" />
        <button
          className="btn btn-primary text-white text-lg b-g"
          onClick={() => dispatch(openDrawer({ status: "" }))}
        >
          Create new task <PlusCircle />
        </button>
      </div>
      <button className="bg-zinc-200 flex items-center gap-2 p-1 px-2 rounded-md text-zinc-500">
        <Download className="text-lg" />
        <span className=" text-start text-zinc-800">
          <div>Download the app</div>
          <div className="text-sm">Get the full experience</div>
        </span>
      </button>
    </div>
  );
};

export default DashboardSidebar;
