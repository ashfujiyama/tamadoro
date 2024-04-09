// defines the popup page
// contians the following components: timer
// will have exit (close the chrome extension), and expand (convert to sidebar) options



import "./App.css"
import Timer from "./components/timer/timer";


function App() {
  return (
    <div className="App">
      <Timer />
    </div>
  );
}

export default App;
