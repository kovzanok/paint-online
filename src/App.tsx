import Canvas from "./components/Canvas";
import SettingsBar from "./components/SettingsBar";
import ToolBar from "./components/Toolbar";
import "./style/App.scss";

function App() {
  return (
    <>
      <ToolBar />
      <SettingsBar />
      <Canvas />
    </>
  );
}

export default App;
