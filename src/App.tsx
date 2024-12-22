import Calender from "./components/Calender";
import NavBar from "./components/Header";
import { DayProvider } from "./context/DayProvider";

function App() {
  return (
    <DayProvider>
      <NavBar />
      <Calender />
    </DayProvider>
  );
}

export default App;
