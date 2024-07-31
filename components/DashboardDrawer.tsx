"use client";
import { closeDrawer } from "@/states/Drawer-controller";
import { setLoading } from "@/states/LoadingSlice";
import { RootState } from "@/states/store";
import { addCard, editCard } from "@/states/TasksDataSlice";
import {
  Calendar,
  CheckCircle,
  Loader,
  PencilIcon,
  Plus,
  Share2,
  ShieldAlert,
  Star,
  X,
} from "lucide-react";
import Image from "next/image";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
const taskStatus = [
  "Not selected",
  "To do",
  "In progress",
  "Under review",
  "Finished",
];
const priorities = ["Not selected", "Low", "Medium", "Urgent"];
const DashboardDrawer = () => {
  //Calculate todays date
  const today = new Date();
  const date = today.toISOString().split("T")[0];
  const [errMsg, setEM] = React.useState("");
  const [formData, setFormData] = useState({
    status: "",
    title: "",
    priority: "",
    deadline: date,
    description: "",
  });
  const myStatus = useSelector((state: RootState) => state.drawer.status);
  const editData = useSelector((state: RootState) => state.drawer.editData);
  const userLoginId = useSelector((state: RootState) => state.userState.userId);
  const dispatch = useDispatch();

  //Form data to handle form
  useEffect(() => {
    if (myStatus) {
      setFormData({ ...formData, status: myStatus });
    }
    if (editData) {
      setFormData({
        ...formData,
        title: editData.title,
        description: editData.details,
        deadline: cropTime(editData.deadline),
        status: myStatus,
        priority: editData.priority,
      });
    }
  }, []);

  //Form schema
  const formSchema = z.object({
    status: z.enum(["To do", "In progress", "Under review", "Finished"]),
    title: z.string().min(1, "Title must not be empty"),
    priority: z.enum(["Low", "Medium", "Urgent"]),
    deadline: z.string().min(1, "Deadline is required"),
    description: z.string().min(1, "Description is required"),
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  async function onCardEdited() {
    if (editData) {
      try {
        const myData = formSchema.parse(formData);
        setEM("");
        const finalItem: TaskItem = {
          title: myData.title,
          details: myData.description,
          createdAt: editData.createdAt,
          deadline: myData.deadline,
          priority: myData.priority,
        };
        const response = await fetch("http://localhost:5000/api/task/edit", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            boardId: userLoginId,
            oldStatus: calcStatusId(myStatus),
            newStatus: calcStatusId(myData.status),
            index: editData.index,
            item: finalItem,
          }),
        });
        const data = await response.json();
        if (response.status != 200) {
          throw { server: data.message };
        }
        dispatch(
          editCard({
            oldStatus: myStatus,
            index: editData.index,
            newStatus: myData.status,
            item: finalItem,
          })
        );
        dispatch(closeDrawer());
      } catch (error: any) {
        if (error.server) {
          setEM(error.server);
        } else {
          setEM(error.issues?.[0]?.message);
        }
      }
    }
  }
  async function onCardAdded() {
    try {
      const myData = formSchema.parse(formData);
      setEM("");
      const currentTime = Date.now();
      const finalItem: TaskItem = {
        // id: 1,
        title: myData.title,
        details: myData.description,
        createdAt: currentTime,
        deadline: myData.deadline,
        priority: myData.priority,
      };

      const response = await fetch("http://localhost:5000/api/task/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userLoginId,
          statusId: calcStatusId(myData.status),
          priorityId: myData.priority,
          title: myData.title,
          details: myData.description,
          deadline: myData.deadline,
          createdAt: currentTime,
        }),
      });
      const data = await response.json();
      if (response.status != 200) {
        throw { server: data.message };
      }
      const newItem: TaskItem = {
        title: data.title,
        details: data.details,
        priority: data.priority,
        deadline: data.deadline,
        createdAt: data.createdAt,
      };
      dispatch(addCard({ item: newItem, status: myData.status }));
      dispatch(closeDrawer());
    } catch (error: any) {
      if (error.server) {
        setEM(error.server);
      } else {
        setEM(error.issues?.[0]?.message);
      }
    }
  }
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (editData) {
      onCardEdited();
    } else {
      onCardAdded();
    }
    // dispatch(setLoading(true));
  };
  return (
    <div
      className={`fixed h-screen w-screen transition-all opa-anim top-0 right-0 bg-black/50 z-10`}
    >
      <div className="right-0 entry-anim top-0 w-[640px] h-full overflow-hidden overscroll-contain bg-white fixed">
        <div className="p-4">
          <div className="flex justify-between">
            <div className="ct gap-2">
              <X
                className=" text-zinc-500 cursor-pointer"
                onClick={() => dispatch(closeDrawer())}
              />
              <Image src="/Enlarge.svg" alt="Enlarge" width={24} height={24} />
            </div>
            <div className="flex gap-4 text-zinc-500 font-light">
              <div className="p-2 bg-zinc-100 rounded-md cursor-pointer gap-2 flex">
                Share <Share2 className="stroke-1" />
              </div>
              <div className="p-2 bg-zinc-100 rounded-md cursor-pointer gap-2 flex">
                Favourite <Star className="stroke-1" />
              </div>
            </div>
          </div>
          <form className="mt-7" onSubmit={handleSubmit}>
            <input
              type="text"
              className="input input-ghost w-full text-4xl bg-white"
              placeholder="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
            <div className="flex flex-col gap-10 text-zinc-500 mt-5">
              <div className="flex items-center gap-5">
                <Loader />
                Status
                <select
                  className="select select-bordered ml-10 select-sm bg-white"
                  value={formData.status}
                  onChange={handleChange}
                  name="status"
                >
                  {taskStatus.map((status, index) => (
                    <option key={index}>{status}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-5">
                <ShieldAlert />
                Priority
                <select
                  className="select select-bordered select-sm ml-10 bg-white"
                  value={formData.priority}
                  onChange={handleChange}
                  name="priority"
                >
                  {priorities.map((status, index) => (
                    <option key={index}>{status}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-5 items-center">
                <Calendar />
                Deadline
                <input
                  type="date"
                  className="input input-sm bg-zinc-200 rounded-md text-zinc-800 ml-5"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                />
              </div>
              <div className="flex gap-5">
                <PencilIcon />
                Description
                <textarea
                  className="textarea textarea-bordered bg-white w-full mr-4 min-h-36 text-lg "
                  placeholder="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="flex gap-5 text-zinc-800 cursor-pointer">
                <Plus />
                Add custom properties
              </div>
              <div className="ct">
                <button className="btn b-g btn-md text-white text-lg gap-3">
                  Save <CheckCircle />
                </button>
              </div>
            </div>
            <div className="divider" />
            <div className="text-zinc-400/80">
              Start writing or drag your own files here
            </div>
          </form>
        </div>
      </div>
      {errMsg && (
        <div className="toast toast-end">
          <div className="alert alert-error font-normal">
            {errMsg}
            <X
              className="cursor-pointer hover:stroke-yellow-300 stroke-2"
              onClick={() => setEM("")}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardDrawer;

function calcStatusId(status: TaskStatus) {
  switch (status) {
    case "To do":
      return 0;
    case "In progress":
      return 1;
    case "Under review":
      return 2;
    case "Finished":
      return 3;
  }
  return 1;
}
function cropTime(stas: string) {
  const parts = stas.split("T");
  return parts[0];
}
