import { openDrawer } from "@/states/Drawer-controller";
import { RootState } from "@/states/store";
import { deleteCard } from "@/states/TasksDataSlice";
import { Draggable } from "@hello-pangea/dnd";
import { Clock, EllipsisVertical, PenIcon, TrashIcon } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface taskitemprops extends TaskItem {
  index: number;
  columnId: number;
  status: TaskStatus;
}

function cropTime(stas: string) {
  const parts = stas.split("T");
  return parts[0];
}
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
}

const Task = (props: taskitemprops) => {
  const userLoginId = useSelector((state: RootState) => state.userState.userId);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef: any = React.createRef();

  const handleClickOutside = useCallback(
    (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    },
    [dropdownRef]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);
  function calculateUrgencyColor() {
    switch (props.priority) {
      case "Low":
        return "bg-[#0ecc5a]";
      case "Medium":
        return "bg-[#FFA235]";
      case "Urgent":
        return "bg-[#FF6B6B]";
    }
  }
  function calculateTimeAgo() {
    const time = new Date(props.createdAt);
    const now = new Date();
    const difference = now.getTime() - time.getTime();
    const minutes = Math.floor(difference / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (days > 0) {
      return `${days} days ago`;
    } else if (hours > 0) {
      return `${hours} hours ago`;
    } else if (minutes > 0) {
      return `${minutes} minutes ago`;
    } else {
      return "Just now";
    }
  }
  async function deleteTaskServer() {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

      const response = await fetch(`${backendUrl}/api/task/delete`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          boardId: userLoginId,
          status: calcStatusId(props.status),
          index: props.index,
        }),
      });
      const data = await response.json();
      if (data.message) {
        dispatch(deleteCard({ status: props.status, index: props.index }));
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Draggable
      draggableId={`${props.index} ${props.columnId}`}
      index={props.index}
    >
      {(provided) => {
        return (
          <div
            className="p-3 bg-[#f9f9f9] border border-[#dedede] rounded-lg"
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <div className="text-lg text-zinc-600 font-[600] flex justify-between items-center">
              {props.title}
              <div>
                <div
                  className={`${isOpen ? "block" : "hidden"} relative`}
                  ref={dropdownRef}
                >
                  <ul className="absolute menu top-7 bg-zinc-200 rounded-box z-[1] w-52 p-2 shadow">
                    <li>
                      <a
                        className="flex"
                        onClick={() => {
                          setIsOpen(false);
                          dispatch(
                            openDrawer({
                              status: props.status,
                              editData: {
                                createdAt: props.createdAt,
                                title: props.title,
                                index: props.index,
                                details: props.details,
                                deadline: props.deadline,
                                priority: props.priority,
                              },
                            })
                          );
                        }}
                      >
                        <PenIcon width={20} />
                        Edit
                      </a>
                    </li>
                    <li>
                      <a
                        className="flex"
                        onClick={() => {
                          setIsOpen(false);
                          deleteTaskServer();
                        }}
                      >
                        <TrashIcon width={20} />
                        Delete
                      </a>
                    </li>
                  </ul>
                </div>
                <button onClick={() => setIsOpen(!isOpen)}>
                  <EllipsisVertical width={20} />
                </button>
              </div>
            </div>
            <div className="text-zinc-600">{props.details}</div>
            <div
              className={`${calculateUrgencyColor()} px-3 py-1 my-2 rounded-md w-min font-[400] text-white text-sm`}
            >
              {props.priority}
            </div>
            <div className="flex gap-2 text-zinc-600 mt-2">
              <Clock />
              {cropTime(props.deadline)}
            </div>
            <div className="text-zinc-500 font-[500] mt-1">
              {calculateTimeAgo()}
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};

export default Task;
