import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type CanvasImgStateType = {
  undoList: string[];
  redoList: string[];
};

const initialState: CanvasImgStateType = {
  undoList: [],
  redoList: [],
};

const canvasImgSlice = createSlice({
  name: "canvasImg",
  initialState,
  reducers: {
    addToUndoList: (state, action: PayloadAction<string>) => {
      state.undoList.push(action.payload);
    },
    undo: (state, action: PayloadAction<string>) => {
      const lastUndo = state.undoList.pop();
      if (lastUndo) {
        state.redoList.push(action.payload);
      }
    },
    redo: (state, action: PayloadAction<string>) => {
      const lastRedo = state.redoList.pop();
      if (lastRedo) {
        state.undoList.push(action.payload);
      }
    },
  },
});

export const { undo, redo, addToUndoList } = canvasImgSlice.actions;

export const listSelector = (state: RootState) => state.canvasImg;

export default canvasImgSlice.reducer;
