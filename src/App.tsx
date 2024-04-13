// defines the popup page
// contians the following components: timer
// will have exit (close the chrome extension), and expand (convert to sidebar) options

import "./App.css";
import Inventory from "./components/pet/inventory";
import TaskList from "./components/tasks/taskList";
import Timer from "./components/timer/timer";
import Title from "./components/title/title"

function App() {
  return (
    <div className="App">
      <Title />
      <Timer />
      <TaskList />
      <Inventory />
    </div>
  );
}

export default App;
