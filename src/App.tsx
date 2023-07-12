import Canvas from "./components/Canvas";
import SettingsBar from "./components/SettingsBar";
import ToolBar from "./components/ToolBar";
import "./style/App.scss";
import { Provider } from "react-redux";

import { store } from "./store/store";
function App() {
  return (
    <>
      <Provider store={store}>
        <ToolBar />
        <SettingsBar />
        <Canvas />
      </Provider>
    </>
  );
}

export default App;
