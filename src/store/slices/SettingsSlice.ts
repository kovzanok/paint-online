import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: SettingsState = {
  color: "#000",
  stroke: "#000",
  weight: 1,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    changeColor: (state, action: PayloadAction<string>) => {
      state.color = action.payload;
    },
    changeStroke: (state, action: PayloadAction<string>) => {
      state.stroke = action.payload;
    },
    changeWeight: (state, action: PayloadAction<number>) => {
      state.weight = action.payload;
    },
  },
});

export default settingsSlice.reducer;

export const { changeColor, changeStroke, changeWeight } =
  settingsSlice.actions;

export const colorSelector = (state: RootState) => {
  return state.settings.color;
};
