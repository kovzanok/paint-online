import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type SettingsState = {
  color: string;
};

const initialState: SettingsState = {
  color: "#000",
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    changeColor: (state, action: PayloadAction<string>) => {
      state.color = action.payload;
    },
  },
});

export default settingsSlice.reducer;

export const {changeColor} = settingsSlice.actions;

export const colorSelector = (state: RootState) => {
  return state.settings.color;
};
