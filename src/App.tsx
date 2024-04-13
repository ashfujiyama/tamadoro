// defines the popup page
// contians the following components: timer
// will have exit (close the chrome extension), and expand (convert to sidebar) options

import "./App.css";
import TaskList from "./components/tasks/taskList";
import Title from "./components/title/title";
import Tamadoro from "./components/tamadoro/tamadoro";

function App() {
  return (
    <div className="App">
      <Title />
      <Tamadoro />
      <TaskList />
    </div>
  );
}

export default App;
