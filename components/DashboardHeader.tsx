import { RootState } from "@/states/store";
import { HelpCircle } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

const DashboardHeader = () => {
  const name = useSelector((state: RootState) => state.userState.name);
  return (
    <div>
      <div className="flex justify-between">
        <div className="text-3xl font-bold">
          Good morning, {name.split(" ")[0]}!
        </div>
        <div className="my-auto text-sm flex gap-2 items-center cursor-pointer hover:bg-zinc-200 p-2 rounded-md">
          Help and feedback <HelpCircle className="stroke-1" />
        </div>
      </div>
      <div className="flex gap-3 w-full">
        <div className="flex  p-4 gap-3 bg-white items-center">
          <Image src="/log1.svg" alt="Log1" width={77} height={61} />
          <div>
            <div className=" text-lg text-zinc-500 font-bold">
              Introducing tags
            </div>
            <div className=" text-wrap text-zinc-400 text-[14px]">
              Easily categorize and find your notes by adding tags. Keep your
              workspace clutter-free and efficient.
            </div>
          </div>
        </div>
        <div className="flex p-4 gap-3 bg-white">
          <Image src="/log2.svg" alt="Log1" width={77} height={61} />
          <div>
            <div className=" text-lg text-zinc-500 font-bold">
              Share Notes Instantly
            </div>
            <div className=" text-wrap text-zinc-400">
              Effortlessly share your notes with others via email or link.
              Enhance collaboration with quick sharing options.
            </div>
          </div>
        </div>
        <div className="flex p-4 gap-3 bg-white">
          <Image src="/log3.svg" alt="Log1" width={77} height={61} />
          <div>
            <div className=" text-lg text-zinc-500 font-bold">
              Access Anywhere
            </div>
            <div className=" text-wrap text-zinc-400">
              Sync your notes across all devices. Stay productive whether
              you&apos;re on your phone, tablet, or computer.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
