import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "./slices/SettingsSlice";
import canvasImgReducer from "./slices/CanvasImgSlice";

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    canvasImg: canvasImgReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
