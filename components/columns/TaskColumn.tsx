import { MenuIcon, Plus } from "lucide-react";
import React, { ReactNode } from "react";
import Task from "./Task";
import { useDispatch, useSelector } from "react-redux";
import { openDrawer } from "@/states/Drawer-controller";
import { RootState } from "@/states/store";
import { Droppable } from "@hello-pangea/dnd";

interface props {
  id: number;
}

const TaskColumn = ({ id }: props) => {
  const cardlist = useSelector((state: RootState) => state.tasksData[id].cards);
  const dispatch = useDispatch();
  let columnStatus: TaskStatus = "To do";
  switch (id) {
    case 0:
      columnStatus = "To do";
      break;
    case 1:
      columnStatus = "In progress";
      break;
    case 2:
      columnStatus = "Under review";
      break;
    case 3:
      columnStatus = "Finished";
      break;

    default:
      break;
  }
  return (
    <div className="flex-1 p-2 bg-white">
      <div className="">
        <div className="flex justify-between text-lg text-zinc-600 mb-2">
          {columnStatus} <MenuIcon />
        </div>
        {/* tasklist */}
        <Droppable droppableId={id.toString()} type="card" direction="vertical">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className=""
            >
              {cardlist.map((item, index) => (
                <Task
                  title={item.title}
                  // id={item.id}
                  columnId={id}
                  index={index}
                  status={columnStatus}
                  key={index}
                  details={item.details}
                  deadline={item.deadline}
                  createdAt={item.createdAt}
                  priority={item.priority}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <button
          className="text-zinc-100 btn-new font-light mt-2 flex text-lg justify-center w-full"
          onClick={() => dispatch(openDrawer({ status: columnStatus }))}
        >
          Add new <Plus />
        </button>
      </div>
    </div>
  );
};

export default TaskColumn;
