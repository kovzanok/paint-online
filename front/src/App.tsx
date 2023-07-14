import Canvas from "./components/Canvas";
import SettingsBar from "./components/SettingsBar";
import ToolBar from "./components/ToolBar";
import "./style/App.scss";
import { Provider } from "react-redux";
import { CanvasContext, ToolContext } from "./context";
import { store } from "./store/store";
import { useState } from "react";
import Tool from "./tools/Tool";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

function App() {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const [tool, setTool] = useState<Tool | null>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path='/:id'
            element={
              <ToolContext.Provider value={{ tool, setTool }}>
                <CanvasContext.Provider
                  value={{
                    canvas,
                    setCanvas,
                    undoList,
                    setUndoList,
                    redoList,
                    setRedoList,
                  }}
                >
                  <Provider store={store}>
                    <ToolBar />
                    <SettingsBar />
                    <Canvas />
                  </Provider>
                </CanvasContext.Provider>
              </ToolContext.Provider>
            }
          />
          <Route
            path='*'
            element={
              <>
                {" "}
                <ToolContext.Provider value={{ tool, setTool }}>
                  <CanvasContext.Provider
                    value={{
                      canvas,
                      setCanvas,
                      undoList,
                      setUndoList,
                      redoList,
                      setRedoList,
                    }}
                  >
                    <Provider store={store}>
                      <ToolBar />
                      <SettingsBar />
                      <Canvas />
                    </Provider>
                  </CanvasContext.Provider>
                </ToolContext.Provider>
                <Navigate to={`${Date.now().toString(16)}`} replace />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
