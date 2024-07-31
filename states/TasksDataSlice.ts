import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: TaskColumnDataType[] = [
  {
    id: 0,
    status: "To do",
    cards: [],
  },
  {
    id: 1,
    status: "In progress",
    cards: [],
  },
  {
    id: 2,
    status: "Under review",
    cards: [],
  },
  {
    id: 3,
    status: "Finished",
    cards: [],
  },
];
export const taskDataSlice = createSlice({
  name: "TaskDataSlice",
  initialState,
  reducers: {
    addCard(
      state,
      action: PayloadAction<{ item: TaskItem; status: TaskStatus }>
    ) {
      const status = getIdFromTaskStatus(action.payload.status);
      const newItem = action.payload.item;
      // newItem.id = state[status].cards.length;
      state[status].cards.push(newItem);
    },
    reorderCards(
      state,
      action: PayloadAction<{ status: number; cardsList: TaskItem[] }>
    ) {
      state[action.payload.status].cards = action.payload.cardsList;
    },
    transportCards(
      state,
      action: PayloadAction<{
        sourceStatus: number;
        finalStatus: number;
        sourceIndex: number;
        finalIndex: number;
      }>
    ) {
      const [item] = state[action.payload.sourceStatus].cards.splice(
        action.payload.sourceIndex,
        1
      );
      state[action.payload.finalStatus].cards.splice(
        action.payload.finalIndex,
        0,
        item
      );
    },
    fetchCards(
      state,
      action: PayloadAction<{ allColumn: TaskColumnDataType[] }>
    ) {
      for (let i = 0; i < 4; i++) {
        state[i].cards = action.payload.allColumn[i].cards;
      }
    },
    editCard(
      state,
      action: PayloadAction<{
        oldStatus: TaskStatus;
        index: number;
        newStatus: TaskStatus;
        item: TaskItem;
      }>
    ) {
      if (action.payload.oldStatus == action.payload.newStatus) {
        state[getIdFromTaskStatus(action.payload.oldStatus)].cards[
          action.payload.index
        ] = action.payload.item;
      } else {
        const [item1] = state[
          getIdFromTaskStatus(action.payload.oldStatus)
        ].cards.splice(action.payload.index, 1);
        state[getIdFromTaskStatus(action.payload.newStatus)].cards.push(
          action.payload.item
        );
      }
    },
    deleteCard(
      state,
      action: PayloadAction<{ status: TaskStatus; index: number }>
    ) {
      state[getIdFromTaskStatus(action.payload.status)].cards.splice(
        action.payload.index,
        1
      );
    },
  },
});
export const {
  addCard,
  reorderCards,
  transportCards,
  fetchCards,
  editCard,
  deleteCard,
} = taskDataSlice.actions;
export default taskDataSlice.reducer;
function getIdFromTaskStatus(value: TaskStatus) {
  switch (value) {
    case "To do":
      return 0;
    case "In progress":
      return 1;
    case "Under review":
      return 2;
    case "Finished":
      return 3;
  }
  return 0;
}
