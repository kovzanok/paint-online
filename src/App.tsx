import Canvas from "./components/Canvas";
import SettingsBar from "./components/SettingsBar";
import ToolBar from "./components/ToolBar";
import "./style/App.scss";
import { Provider } from "react-redux";
import CanvasContext from "./context";
import { store } from "./store/store";
import { useState } from "react";
function App() {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  
  return (
    <>
      <CanvasContext.Provider value={[canvas, setCanvas]}>
        <Provider store={store}>
          <ToolBar />
          <SettingsBar />
          <Canvas />
        </Provider>
      </CanvasContext.Provider>
    </>
  );
}

export default App;
