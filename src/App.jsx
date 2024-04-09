import "./App.css";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import TaskBoard from "./components/taskBoard/TaskBoard";

function App() {
  return (
    <>
      <Navbar />
      <Banner />
      <TaskBoard />
      <Footer />
    </>
  );
}

export default App;
