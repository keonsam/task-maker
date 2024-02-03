import "./App.css";
import Header from "./components/Header/Header";
import TaskList from "./components/TaskList/TaskList";
import { Box } from "@mui/material";

function App() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Header />
      <TaskList />
    </Box>
  );
}

export default App;
