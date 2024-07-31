"use client";
import React, { useEffect } from "react";
import TaskColumn from "./columns/TaskColumn";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/states/store";
import { DragDropContext } from "@hello-pangea/dnd";
import {
  fetchCards,
  reorderCards,
  transportCards,
} from "@/states/TasksDataSlice";
import { setLoading } from "@/states/LoadingSlice";

function reorder(list: TaskItem[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}
async function reorderServer(
  boardId: string,
  toIndex: number,
  fromIndex: number,
  columnId: number
) {
  try {
    const response = await fetch(`http://localhost:5000/api/task/reorder`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fromIndex,
        toIndex,
        boardId,
        columnId,
      }),
    });
    if (response.status != 200) throw "erroer happended";
  } catch (error) {
    console.log(error);
  }
}

async function moveCardServer(
  boardId: string,
  sourceColumnId: number,
  destinationColumnId: number,
  cardIndex: number,
  destinationIndex: number
) {
  try {
    const response = await fetch(`http://localhost:5000/api/task/move`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        boardId,
        sourceColumnId,
        destinationColumnId,
        cardIndex,
        destinationIndex,
      }),
    });
    if (response.status != 200) throw "error happended";
  } catch (error) {
    console.log(error);
  }
}
const DashboardColumns = () => {
  const columns = useSelector((state: RootState) => state.tasksData);
  const userLoginId = useSelector((state: RootState) => state.userState.userId);
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(setLoading(true));
    async function fetchData() {
      if (!userLoginId) return;
      try {
        const response = await fetch(
          `http://localhost:5000/api/task/${userLoginId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status != 200) throw { message: "error happended" };
        const data = await response.json();
        const allColumn = data.columns;
        setLoading(false);
        dispatch(fetchCards({ allColumn }));
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [userLoginId]);
  function onDragEnd(result: any) {
    const { destination, source } = result;

    if (!destination) return;

    //If dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    //If in same list
    if (destination.droppableId === source.droppableId) {
      const columnId: number = source.droppableId;
      console.log(columnId);
      const items = reorder(
        columns[columnId].cards,
        source.index,
        destination.index
      );
      reorderServer(userLoginId, destination.index, source.index, columnId);
      dispatch(reorderCards({ status: columnId, cardsList: items }));
    } else {
      moveCardServer(
        userLoginId,
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index
      );
      dispatch(
        transportCards({
          sourceIndex: source.index,
          sourceStatus: source.droppableId,
          finalIndex: destination.index,
          finalStatus: destination.droppableId,
        })
      );
    }
  }
  return (
    <div className="bg-white flex-1 flex gap-4 p-1">
      <DragDropContext onDragEnd={onDragEnd}>
        {columns.map((item) => (
          <TaskColumn id={item.id} key={item.id} />
        ))}
      </DragDropContext>
      {/* <TaskColumn id={1} />
      <TaskColumn id={2} />
      <TaskColumn id={3} />
      <TaskColumn id={4} /> */}
    </div>
  );
};

export default DashboardColumns;
